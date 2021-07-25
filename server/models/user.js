const sql = require('sqlite3').verbose();
const db = new sql.Database('users');
const bcrypt = require('bcrypt');
const {v4} = require('uuid');

db.serialize(()=>{
    console.log('Creating DB');
    const del = 'DROP TABLE IF EXISTS users;'
    const com = `CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(50) primary key, username VARCHAR(50) UNIQUE, password BLOB, salt TEXT
    )`;
    // db.run(del);
    db.run(com);
})
class User{
    constructor(obj){
        this.id = obj.id;
        this.password = obj.password;
        this.username = obj.username;
        this.salt = obj.salt;
    }
    
    static get(id, cb){
        const com = 'SELECT * FROM users WHERE id = ?';
        db.get(com, id, cb);
    }
    static getByUsername(username, cb){
        const com = 'SELECT * FROM users WHERE username = ?';
        db.get(com, username, cb);
    }
    // username - UNIQUE
    static authenticate(username, pass, cb){
        User.getByUsername(username, (err, user)=>{
            if(err) cb(err);
            if(!user) return cb('User does not exist');   // юзер не существует
            bcrypt.hash(pass, user.salt, (err, hash)=>{
                if(err) return cb(err);
                if(hash===user.password) return cb(null, user.id);
                cb('Wrong password');
            });
        });
    };
    save(cb){
        console.log('[x] Insert new user');
        this.hashPassword((err)=>{
            if (err) return cb(err);
            const com = 'INSERT INTO users(id, username, password, salt) VALUES(?,?,?,?);';
            const id = v4().toString();
            this.id = id;
            db.run(com, id, this.username, this.password, this.salt, cb);
        });
    };
    static update(id, user, cb){
        console.log('[x] Update user')
        const com = `UPDATE users
        SET 
            ${Object.keys(user).map(k=>k+'=?').join(',')}
        WHERE
            id=? `;
    db.run(com, [...Object.values(user), id], cb);
    };
    hashPassword(cb){
        console.log('[x] Hash password');
        bcrypt.genSalt(12, (err, salt)=>{
            if(err) return cb(err);
            this.salt = salt;
            bcrypt.hash(this.password, salt, (err, hash)=>{
                if (err) cb(err);
                this.password = hash;
                cb();
            });
        });
    };
    toJSON(){
        return {
            id: this.id,
            username: this.username
        }
    };
}

exports.User = User;