var express = require('express');
var router = express.Router();
const md5 = require('md5');
const UserModel = require('../../models/UserModel');
const jwt = require('jsonwebtoken');
const { secret } = require('../../db/config');
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
        if (err) {
            res.json({
                code: '2001',
                msg: '数据库读取失败',
                data: null
            })
            return;
        }
        if (!data) {
            return res.json({
                code: '2002',
                msg: '用户名或者密码错误',
                data: null
            })
        }
        let token = jwt.sign({
            username: data.username,
            _id: data._id
        },
            'secret',
            { expiresIn: 60 * 60 * 24 * 7 }
        )
        res.json({
            code: '0000',
            msg: '登录成功',
            data: token
        })
    })
})

router.get('/logout', (req, res) => {
    res.render('success', { msg: '退出登录', url: '/login' });
})
module.exports = router;

