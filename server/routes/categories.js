const {Category} = require('../models/category');

function renameLimitProp(category){
  // limit - зарезервированное для бд слово
    if (category.hasOwnProperty('_limit')){
        category['limit'] = category['_limit'];
        delete category['_limit'];
    }
};
module.exports = {
    getCategories: (req, res, next)=>{
        console.log('getCategories');
        Category.all(req.user.username, (err, entries)=>{
            if(err) return next(err);
            entries.forEach(element => {
                renameLimitProp(element);
            });
            res.status(200).json(entries);
            return next();
        });
    },
    deleteCategory: (req, res, next)=>{
        Category.remove(req.params.id, (err)=>{
            if(err) return next(err);
            res.json({msg: 'Category was removed'});
            return next();
        });
    },
    getCategoryById: (req, res, next)=>{
        console.log('getCategoryById');
        Category.get(req.params.id, (err, category)=>{
            if(err) return next(err);
            renameLimitProp(category);
            res.json(category);
            return next();
        });
    },
    postCategory: (req, res, next)=>{
        console.log('Post');
        const category = new Category({...req.body, userId:req.user.username});
        category.save((err)=>{
            if(err) return next(err);
            res.status(201).json(category.id);
            return next();
        });
    },
    putCategory: (req, res, next)=>{
        console.log('Put');
        const category = req.body;
        console.log(category);
        Category.update(req.params.id, category, (err)=>{
            if(err) return next(err);
            renameLimitProp(category);
            res.json(category);
            return next();
        });
    }

}