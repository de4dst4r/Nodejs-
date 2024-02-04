const moment = require('moment');
const shortid = require('shortid');
var express = require('express');
var router = express.Router();
const AccountModel = require('../../models/AccountModel');
const jwt = require('jsonwebtoken');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');
/* GET home page. */

//记账本列表
router.get('/account', checkTokenMiddleware, function (req, res, next) {
    // let accounts = db.get('accounts').value();
    console.log(req.user);
    AccountModel.find().sort({ time: -1 }).exec((err, data) => {
        if (err) {
            res.json({
                code: '1001',
                msg: '读取失败',
                data: null
            });
            return;
        }
        //响应成功的提示
        res.json({
            //响应编号
            code: '0000',
            //响应信息
            msg: '读取成功',
            //响应数据
            data: data
        });
        // res.render('list', { accounts: data, url: '/account/create', moment: moment });
    })
});

//添加记录
router.get('/account/create', checkTokenMiddleware, function (req, res, next) {
    res.render('create');
});

//新增记录
router.post('/account', checkTokenMiddleware, (req, res) => {
    //表单验证

    /*   //生成id
      let id = shortid.generate();
      db.get('accounts').unshift({ id: id, ...req.body }).write(); */
    AccountModel.create({
        ...req.body,
        time: moment(req.body.time).toDate()
    }, (err, data) => {
        if (err) {
            res.json({
                code: '1002',
                msg: '插入失败',
                data: null
            });
            return;
        }
        res.json({
            code: '0000',
            msg: '创建成功',
            url: '/account',
            data: data
        })
    })

});

//删除记录
router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
    //获取params 的 id参数
    let id = req.params.id;
    // db.get('accounts').remove({ id: id }).write();
    AccountModel.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.json({
                code: '1003',
                msg: '删除失败',
            });
            return;
        }
        res.json({
            code: '0000',
            msg: '删除成功',
            data: {}
        });
    })
});

//获取单个账单
router.get('/account/:id', checkTokenMiddleware, (req, res) => {
    //获取id参数
    let { id } = req.params;
    AccountModel.findById(id, (err, data) => {
        if (err) {
            return res.json({
                code: '1004',
                msg: '获取失败',
                data: null
            })
        }
        res.json({
            code: '0000',
            msg: '获取成功',
            data: data
        })
    })
});

//更新账单
router.patch('/account/:id', checkTokenMiddleware, (req, res) => {
    let { id } = req.params;

    AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
        if (err) {
            return res.json({
                code: '1005',
                msg: '更新失败',
                data: null
            })
        }
        //查询数据库
        AccountModel.findById(id, (err, data) => {
            if (err) {
                return res.json({
                    code: '1004',
                    msg: '获取失败',
                    data: null
                })
            }
            res.json({
                code: '0000',
                msg: '更新成功',
                data: data
            })
        })
    });
});
module.exports = router;
