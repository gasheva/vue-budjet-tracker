const {Record} = require('../models/record');

module.exports = {
    getRecords:(req, res, next)=>{
        Record.all(req.user.username, (err, categories)=>{
            if(err) next(err);
            res.json(categories);
            return next();
        });
    },
    postRecord:(req, res, next)=>{
        console.log('postRecord');
        const record = new Record({...req.body, userId:req.user.username});
        console.log(record);
        record.save((err)=>{
            if(err) next(err);
            res.status(201).json({...req.body, id:record.id});
            return next();
        });
    },
    getRecordById:(req, res, next)=>{
        Record.get(req.params.id, (err, record)=>{
            if(err) next(err);
            res.json(record);
            return next();
        }); 
    }

}
