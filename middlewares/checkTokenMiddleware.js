module.exports = (req, res, next) => {
    const jwt = require('jsonwebtoken');
    const { secret } = require('../db/config');
    let token = req.get('token');
    if (!token) {
        res.json({
            code: '2003',
            msg: 'token缺失',
            data: null
        })
        return;
    };
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            return res.json({
                code: '2004',
                msg: '校验失败',
                data: null
            })
        };
        req.user = data;
        next();
    });
};