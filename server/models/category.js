const sql = require('sqlite3').verbose();
const db = new sql.Database('users');
const {v4} = require('uuid');

db.serialize(()=>{
    console.log('Creating DB');
    const del = 'DROP TABLE IF EXISTS category;'
    const com = `CREATE TABLE IF NOT EXISTS category(
        id VARCHAR(50) primary key, userId VARCHAR(50), title VARCHAR(50), _limit integer
    )`;
    // db.run(del);
    db.run(com);
})

class Category{
    constructor(obj){
        this.id = obj.id;
        this.userId = obj.userId;
        this.title = obj.title;
        this.limit = obj.limit;
    }
    static all(userId, cb){
        const com = 'SELECT * FROM category WHERE userId = ?';
        db.all(com, userId, cb);
    };
    static get(id, cb){
        const com = 'SELECT * FROM category WHERE id = ?';
        db.get(com, id, cb);
    };
    save(cb){
        this.id = v4();
        const com = 'INSERT INTO category(id, userId, title, _limit) VALUES(?,?,?,?);';
        db.run(com, this.id, this.userId, this.title, this.limit, cb);
    };
    static update(id, category, cb){
        const com = `UPDATE category
            SET 
                ${Object.keys(category).map(k=>k==="limit"?"_limit=?":k+'=?').join(',')}
            WHERE
                id=? `;
        db.run(com, [...Object.values(category), id], cb);
    };
};

module.exports.Category = Category;