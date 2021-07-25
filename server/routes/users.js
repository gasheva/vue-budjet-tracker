const { generateAccessToken, verify } = require('../middleware/auth.js');
const { INFO } = require('../models/info.js');
const { User } = require('../models/user');
let refreshTokens = [];

module.exports = {
    // возвращает клиенту два токена и ид 
    registration: (req, res, next) => {
        console.log('registration');
        const user = new User({ username: req.body.username, password: req.body.password });
        user.save((err) => {
            if (err) return res.status(500).json({ msg: err });
            const accessToken = generateAccessToken('access', { username: user.id }, '1800s');
            const refreshToken = generateAccessToken('refresh', { username: user.id });
            refreshTokens.push(refreshToken);
            console.log({ accessToken, refreshToken, id: user.id });
            INFO.addBase(user.id, user.username, ()=>{});
            res.status(201).json({ accessToken, refreshToken, id: user.id });
            return next();
        });
    },
    // возвращает клиенту два токена и ид 
    login: (req, res, next) => {
        console.log('login');
        const { username, password } = req.body;
        User.authenticate(username, password, (err, id) => {
            if (err) return res.status(403).json({ msg: 'Username or password is incorrect' });
            const accessToken = generateAccessToken('access', { username: id }, '1800s');
            const refreshToken = generateAccessToken('refresh', { username: id });
            refreshTokens.push(refreshToken);
            console.log('login successfull');
            console.log({ accessToken, refreshToken, id });
            res.json({ accessToken, refreshToken, id });
            return next();
        });
    },
    // обновляет токен доступа по полученному рефреш токену
    refresh: (req, res, next) => {
        const { token } = req.body;
        if (!token)
            return res.sendStatus(401);
        if (!refreshTokens.includes(token))
            return res.sendStatus(403);

        console.log("token is Ok");
        verify('refresh', token, (err, user) => {
            if (err) return res.sendStatus(403);
            console.log(user);
            const accessToken = generateAccessToken('access', { username: req.body.username }, '1800s');

            res.json({
                accessToken
            });
        });
        return next();
    },
    // разлогинивает пользователя, удалив рефреш токен 
    logout: (req, res, next) => {
        const { token } = req.body;
        refreshTokens = refreshTokens.filter(t => t !== token);
        res.json({ msg: "Logout successful" });
        return next();
    },
    // обновляет инфу пользователя по ид, токену доступа и новой инфе
    updateUser: (req, res, next) => {
        User.update(req.user.username, req.body, (err)=>{
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
            return next();
        });
    }
}