import pkg from 'pg';
import fs from 'fs';

const { Pool } = pkg;

class DB {
    constructor() {
        this.pool = null; 
        this.loadConnection(); 
        this.loadSentence();   
        console.log("DB initialized successfully.");
    }

    async exe(schema, sentenciaId, params) {
        let client
        try {
            client = await this.pool.connect(); 
            let sentence = this.getSentence(schema, sentenciaId); 
            let res = await client.query(sentence, params); 
            client.release(); 
            return res; 
        } catch (e) {
            console.error("Error executing query:", e);
        } 
        
    }
    

    loadSentence() {
        try {
            const data = fs.readFileSync("./config/sentences.json", 'utf8');
            this.sentences = JSON.parse(data); // Store sentences in memory
        } catch (err) {
            console.error("Error reading sentences file: ", err);
        }
    }

    loadConnection() {
        try {
            const data = fs.readFileSync("./config/connection.json", 'utf8');
            this.connection = JSON.parse(data); 
            this.setConnection(0); 
        } catch (err) {
            console.error("Error reading connection file: ", err);
        }
    }

    setConnection(connectionNumber) {
        const config = this.connection.dataBase[connectionNumber];
        this.pool = new Pool(config);
        return this;
    }



    getSentence(schema, sentenceId) {
        if (this.sentences && this.sentences[schema]) {
            return this.sentences[schema][sentenceId];
        }
        console.error("Sentence not found in the specified schema");
        return null;
    }
}

export default DB;