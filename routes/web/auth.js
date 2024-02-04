var express = require('express');
var router = express.Router();
const md5 = require('md5');
const UserModel = require('../../models/UserModel');

router.get('/reg', (req, res) => {
    res.render('auth/reg');
});

router.post('/reg', (req, res) => {
    UserModel.create({ ...req.body, password: md5(req.body.password) }, (err, data) => {
        if (err) {
            res.status(500).send('注册失败');
            return;
        }
        res.render('success', { msg: '注册成功', url: '/login' });
    })
})

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
        if (err) {
            res.status(500).send('登录失败');
            return;
        }
        if (!data) {
            res.status(500).send('账号或者密码错误，登录失败');
            return;
        }
        req.session.username = data.username;
        req.session._id = data._id;
        res.render('success', { msg: '登录成功', url: '/account' });
    })
})

router.get('/logout', (req, res) => {
    res.render('success', { msg: '退出登录', url: '/login' });
})
module.exports = router;

