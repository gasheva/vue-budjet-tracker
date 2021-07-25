const sql = require('sqlite3').verbose();
const db = new sql.Database('users');
const {v4} = require('uuid');

db.serialize(()=>{
    console.log('Creating DB');
    const del = 'DROP TABLE IF EXISTS record;'
    const com = `CREATE TABLE IF NOT EXISTS record(
        id VARCHAR(50) primary key, amount int,
        catId VARCHAR(50), userId VARCHAR(50), date TEXT, description VARCHAR(50), type VARCHAR(10)
    )`;
    // date - TEXT as ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS").
    db.run(com);
});

class Record {
    constructor(obj){
        this.userId = obj.userId;
        this.id = obj.id;
        this.amount = obj.amount;
        this.catId = obj.catId;
        this.date = obj.date;
        this.description = obj.description;
        this.type = obj.type;
    }
    static all(userId, cb){
        const com = `SELECT id, amount, catId, 
            date, description, type FROM record WHERE userId = ?`;
        db.all(com, userId, cb);
    };
    save(cb){
        console.log('save record');
        this.id = v4();
        const com = `INSERT INTO record(id, amount, catId, userId, 
            date, description, type) VALUES(?,?,?,?,?,?,?)`;
        db.run(com, this.id, this.amount, this.catId, this.userId, 
            new Date(this.date).toISOString(), this.description, this.type, cb);
    };
    static get(id, cb){
        const com = `SELECT id, amount, catId, 
            date, description, type FROM record WHERE id = ?`;
        db.get(com, id, cb);
    }
};

module.exports.Record = Record;