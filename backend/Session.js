import session from 'express-session';

const Session = class {
    constructor(app) {
        app.use(session({
            secret: "qwertypoiuy123_flex",
            resave: false,
            saveUninitialized: false, 
            cookie: {
                maxAge: 30 * 60 * 1000, 
                sameSite: 'lax',       
                secure: false         
            }
        }));
          
          
        this.sessionObject = {
            userId: '',
            user: '',
            profile: '',
            password: '',
            sts: false 
        }
    }

    sessionExist(req) {
        if (req.session && req.session.user) {
            return true; 
        } else {
            return false; 
        }
    }

 
    async authenticate(req) {
        try {
           
            let r = await global.db.exe("security", "getUser", [req.body.user, req.body.password]);
            
            
            if (r.rows.length > 0) {
                this.sessionObject.userId = r.rows[0].user_id;
                this.sessionObject.user = r.rows[0].user_na;
                this.sessionObject.profile = r.rows[0].profile_id;
                this.sessionObject.password = r.rows[0].user_pw;
                this.sessionObject.sts = true; 
            }
            else {
                this.sessionObject.sts = false; 
            }
        } catch (err) {
            this.sessionObject.sts = false;
            console.log(err);
        }
    }

    createSession(req, res) {
        try {
            if (this.sessionObject.sts) {
                req.session.userId = this.sessionObject.userId;
                req.session.user = this.sessionObject.user;
                req.session.profile = this.sessionObject.profile;
                req.session.password = this.sessionObject.password;
                console.log("Session created:", req.session);
                return true; 
            } else {
                return false; 
            }
        } catch (err) {
            res.status(500).json({ sts: false, msg: "Error creating session", error: err.message });
            return false;
        }
    }

    closeSession(req, res) {
        try {
            if (req.session && req.session.user) {
                req.session.destroy((err) => {
                    if (err) {
                        res.status(500).json({ sts: false, msg: "Error closing session", error: err.message });
                        return false;
                    } else {
                        this.sessionObject.sts = false; 
                        res.clearCookie('connect.sid'); // Para express-session
                        res.clearCookie('sessionId');
                        res.clearCookie('token');
                        res.status(200).json({ sts: true, msg: "Session closed" });
                        global.log.info("Session closed");
                        return true;
                    }
                });
            } else {
                res.status(400).json({ sts: false, msg: "No active session to close" });
                return false;
            }
        } catch (err) {
            res.status(500).json({ sts: false, msg: "Error closing session", error: err.message });
            return false;
        }
    }

}

export default Session;