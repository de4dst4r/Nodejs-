const moment = require('moment');
const shortid = require('shortid');
var express = require('express');
var router = express.Router();
const AccountModel = require('../../models/AccountModel');
/* GET home page. */


//声明中间件检测登录
let checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')
//记账本列表
router.get('/account', checkLoginMiddleware, function (req, res, next) {
  // let accounts = db.get('accounts').value();

  AccountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) {
      res.status(500).send('读取失败');
      return;
    }
    res.render('list', { accounts: data, url: '/account/create', moment: moment });

  })
});

//添加记录
router.get('/account/create', checkLoginMiddleware, function (req, res, next) {
  res.render('create');
});

//新增记录
router.post('/account', checkLoginMiddleware, (req, res) => {
  /*   //生成id
    let id = shortid.generate();
    db.get('accounts').unshift({ id: id, ...req.body }).write(); */
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if (err) {
      res.status(500).send("插入失败");
      return;
    }
    res.render('success', { msg: '插入成功', url: '/account' });
  })

});

//删除记录
router.get('/account/:id', checkLoginMiddleware, (req, res) => {
  //获取params 的 id参数
  let id = req.params.id;
  // db.get('accounts').remove({ id: id }).write();
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send("删除失败");
      return;
    }
    res.render('success', { msg: '删除成功', url: '/account' });
  })
})

module.exports = router;
