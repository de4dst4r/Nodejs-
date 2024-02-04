//导入lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
//获取db对象
const db = low(adapter)
//初始化
// db.defaults({ posts: [], user: {} }).write();

db.get('posts').push({ id: 1, title: '今天还行' }).write();

// console.log(db.get('posts').value());
// db.get('posts').remove({ id: 1 }).write();

db.get('posts').find({ id: 1 }).assign({ title: '今天不错' }).write();