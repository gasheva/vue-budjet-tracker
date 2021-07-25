const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

function getSecret(type) {
    return (type === 'refresh' ? process.env.REFRESH_SECRET : process.env.TOKEN_SECRET);
}

exports.generateAccessToken = (type, username, expiresIn) => {
    const secret = getSecret(type);
    if (type === 'refresh')
        return jwt.sign(username, secret);
    else
        return jwt.sign(username, secret, { expiresIn: expiresIn });
};
exports.verify = (type, token, cb) => {
    jwt.verify(token, getSecret(type), cb);
};

exports.authenticateJWT = (req, res, next) => {
    console.log('authenticateJWT');
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];     // Bearer [JWT_TOKEN]
        this.verify('access', token, (err, user) => {
            if (err) {
                console.log(err.name);
                if (err.name ==='TokenExpiredError'){
                    return res.status(401).json({msg:"Token expired"});
                }
                else if(err.name==='UnauthorizedError'){
                    return res.status(401).json({msg:"Unauthorizedd"});
                }else{
                    return res.sendStatus(401);
                }
            }
            req.user = user;
            console.log(user);
            next();
        });
    } else {
        console.log('no authorized header');
        res.sendStatus(401);
    }
}