import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'log.json'), 'utf8'));

const log = class {
    constructor() {
        this.c = console.log; 
        this.msg = new Map();
        this.updateCurrentTime(); 
        this.logDir = path.join(__dirname, 'logFiles'); 

        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir);
        }
        this.currentLogFile = this.createLogFile(); 
    }

    updateCurrentTime() {
        const now = new Date();
        this.date = now.toLocaleDateString();
        this.hr = now.getHours();
        this.mm = now.getMinutes();
        this.ss = now.getSeconds();
        this.ms = now.getMilliseconds();
    }

    createLogFile() {
        const now = new Date();
        const fileName = `log_${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}.txt`;
        return path.join(this.logDir, fileName);
    }

    writeLogToFile(logEntry) {
        if (!config.save) return;

        const logMessage = `TYPE: ${logEntry.type}\nMSG: ${logEntry.message}\nDATE: ${logEntry.date}\nHR:MM:SS: ${logEntry.hr}:${logEntry.mm}:${logEntry.ss}\n${"*".repeat(40)}\n`;
        fs.appendFileSync(this.currentLogFile, logMessage);

        
        const stats = fs.statSync(this.currentLogFile);
        if (stats.size > config.fileSize) {
            this.currentLogFile = this.createLogFile();
        }
    }

  
    eco(j) {
        if (config[`eco-${j.type.toLowerCase()}`]) {
            console.log("*".repeat(40));
            console.log("TYPE : ", j.type);
            console.log("MSG : ", j.message);
            console.log("DATE : ", j.date);
            console.log("HR:MM:SS : ", j.hr, ":", j.mm, ":", j.ss);
            console.log("*".repeat(40));
            this.writeLogToFile(j);
        }
    }

    error(msg) {
        this.updateCurrentTime();
        const logEntry = { type: "ERROR", message: msg, date: this.date, hr: this.hr, mm: this.mm, ss: this.ss };
        this.eco(logEntry);
    }

    info(msg) {
        this.updateCurrentTime();
        const logEntry = { type: "INFO", message: msg, date: this.date, hr: this.hr, mm: this.mm, ss: this.ss };
        this.eco(logEntry);
    }

    warning(msg) {
        this.updateCurrentTime();
        const logEntry = { type: "WARNING", message: msg, date: this.date, hr: this.hr, mm: this.mm, ss: this.ss };
        this.eco(logEntry);
    }

    debug(msg) {
        this.updateCurrentTime();
        const logEntry = { type: "DEBUG", message: msg, date: this.date, hr: this.hr, mm: this.mm, ss: this.ss };
        this.eco(logEntry);
    }
}

export default log;

