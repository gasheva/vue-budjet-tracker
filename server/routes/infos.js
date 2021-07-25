const {INFO} = require('../models/info');

module.exports = {
    getInfo:(req, res, next)=>{
        console.log('getInfo');
        console.log(req.params.id);
        INFO.get(req.params.id, (err, info)=>{
            if(err) return next(err);  
            res.json(info);
            return next();
        });
    },
    putInfo:(req, res, next)=>{
        console.log('putInfo');
        INFO.update(req.params.id, req.body, (err)=>{
            if(err) return next(err);
            res.status(200).json({msg:'Updated successfully'});
            return next();
        })
    },
}