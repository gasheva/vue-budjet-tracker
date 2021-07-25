const sql = require('sqlite3').verbose();
const db = new sql.Database('users');

db.serialize(()=>{
    console.log('Creating DB');
    const del = 'DROP TABLE IF EXISTS info;'
    const com = `CREATE TABLE IF NOT EXISTS info(
        userId VARCHAR(50) primary key, bill int, locale VARCHAR(10), name
    )`;
    // db.run(del);
    db.run(com);
})
function BaseInfo(userId, name) {
    return {
        userId,
        bill: 1000,
        locale: 'en-Us',
        name
    }
};

class INFO{
    static addBase(id, userName, cb){
        INFO.add(BaseInfo(id, userName),cb);
    };
    static get(id, cb){
        const com = 'SELECT * FROM info WHERE userId = ?';
        db.get(com, id, cb);
    };
    static add(info, cb){
        const com = 'INSERT INTO info(userId, bill, locale, name) VALUES(?,?,?,?);';
        db.run(com, info.userId, info.bill, info.locale, info.name, cb);
    };
    static update(id, info, cb){
        console.log('[x] Update info');
        console.log(info);
        const com = `UPDATE info
        SET 
            ${Object.keys(info).map(k=>k+'=?').join(',')}
        WHERE
            userId=? `;
    db.run(com, [...Object.values(info), id], cb);
    };
};

module.exports.INFO = INFO;
