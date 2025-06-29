import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import SS from './Session.js';
import SC from './Security.js';
import DB from './db.js';
import LOG from './log.js';
import path from 'path';
import VD from './Validate.js'

const __filename = fileURLToPath(import.meta.url);



const __dirname = dirname(__filename);

const app = express();
const port = 3000;

const corsOptions = {
  origin: ['http://localhost:5173', 
    'http://127.0.0.1:5500',
    'http://localhost:3000',
  'http://localhost:4200'],
  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login2.html')); 
});

const session = new SS(app);
global.db = new DB();
global.sc = new SC();
global.log = new LOG();
global.vd = new VD();
await global.sc.loadPermissions(); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/api/register', async (req, res) => {
  try {
    const { user, password, email } = req.body;

    console.log('Register endpoint hit');
    
    if (!global.vd.validEmpty(user) || !global.vd.validEmpty(password) || !global.vd.validEmpty(email)) {
   
    
      return res.status(400).json({ 
        sts: false, 
        msg: 'user, password and email are required' 
      });
    }

    if (!global.vd.validEmail(email)) {
      console.log(email);
      
      return res.status(400).json({ 
        sts: false, 
        msg: 'Invalid email format' 
      });
    }

    if (!global.vd.validLength(user, 20) || user.length < 4) {
      return res.status(400).json({ 
        sts: false, 
        msg: 'user must be between 4 and 20 characters' 
      });
    }

    if (!global.vd.validLength(password, 100) || password.length < 8) {
      return res.status(400).json({ 
        sts: false, 
        msg: 'Password must be at least 8 characters long' 
      });
    }

    if (!global.vd.validSpecialChar(user, [' ', '@', '#', '$', '%', '^', '&', '*', '(', ')'])) {
      return res.status(400).json({ 
        sts: false, 
        msg: 'user contains invalid characters' 
      });
    }

    const userExists = await global.db.exe(
      'security', 
      'userExists', 
      [user, email]  
    )

    if (userExists.rows.length > 0) {
      return res.status(409).json({ 
        sts: false, 
        msg: 'user or email already exists' 
      });
    }
    
       const newUser = await global.db.exe(
      'security', 
      'createUser', 
      [user, password, email]
    )

    console.log("New user data:", newUser);
    

    if(!newUser || !newUser.rows || newUser.rows.length === 0){
      throw new Error('Failed to create user');
    }

      const userId = newUser.rows[0].user_id;
      console.log("User created with ID:", userId);
      

    const profile = await global.db.exe(
      'security', 
      'getProfile', 
      ['user']  
    )

    if (profile.rows.length > 0) {
      const profileId = profile.rows[0].profile_id;
      console.log("Profile found with ID:", profileId, userId);
      
      
      await global.db.exe(
        'security', 
        'assignUserProfile', 
        [userId, profileId]
      )
    }

    res.status(201).json({ 
      sts: true, 
      msg: 'User registered successfully',
      user: { 
        user_id: userId, 
        user_na: user, 
        user_email: email 
      }
    });

    global.log.info(`New user registered: ${user}`);

  } catch (error) {
    global.log.error('Registration error:', error);
    console.log('error', error);
    
    res.status(500).json({ 
      sts: false, 
      msg: 'Error during registration',
      error: error.message 
    });
  }
});



app.post('/api/login', async (req, res) => {
  try {
    await session.authenticate(req); 
    console.log(req.body);
    console.log(req.body.user);
    console.log(req.body.password);
    
    

    if (!session.createSession(req)) {
      res.status(401).json({ sts: false, msg: 'Invalid credentials' });
    } else {
      
      if (req.session && req.session.user && req.session.user !== req.body.user) {
        res.status(400).json({ sts: false, msg: "There is an active session already!" });
      } else {
        global.sc.getPermissionOption(req); 
        
        res.status(200).json({
          sts: true,
          msg: "Login successful",
          user: {
            userId: req.session.userId,
            user: req.session.user,
            profile: req.session.profile
          }
        });

        global.log.info("Login successful");
      }
    }
  } catch (err) {
    global.log.error("Error during login:", err);
    res.status(500).json({ sts: false, msg: "Error during login" });
  }
});

app.get('/api/session', (req, res) => {
  if (req.session && req.session.user) {

    res.status(200).json({
      sts: true,
      user: {
        userId: req.session.userId,
        user: req.session.user,
        profile: req.session.profile
      }
    });
  } else {
    res.status(401).json({ sts: false, msg: "No active session" });
  }
});

app.post('/api/logout', (req, res) => {
  session.closeSession(req, res);
});




app.listen(port, () => {
  global.log.info(`Server active at port: ${port}`);
});