/**
 * 
 * @param {*} success
 * @param {*} error
 */
module.exports = function (success, error) {
    const mongoose = require('mongoose');
    const { DBHOST, DBPORT, DBNAME } = require('./config.js');
    mongoose.set('strictQuery', true);

    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    mongoose.connection.once('open', () => {
        success();
    });

    mongoose.connection.on('error', () => {
        error();
    });

    mongoose.connection.on('close', () => {
        console.log('关闭成功');
    });
}