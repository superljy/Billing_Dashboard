const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const { read, write } = require('../utils/utils');

const app = express();
app.use(cors());

//点击到账单对应页面时请求获取该月份的账单数据
app.get('/billings', (req, res) => {
    let month = req.url.split('?')[1].split('=')[1];
    fs.readFile(`../static/data/billing/${month}.json`, (err, data) => {
        if (err) throw err;
        res.end(data);
    })
})

//添加数据接口
app.post('/add', (req, res) => {
    let str = '';
    req.on('data', (chunk) => {
        str += chunk;
        console.log(JSON.parse(str));
        let _str = JSON.parse(str).data;
        read(_str.month, (resData) => {
            let newData = [];
            for (item of JSON.parse(resData)) {
                newData.push(item);
            }
            newData.push(_str);
            write(_str.month, newData, res);
        })
    })
})

//删除数据接口
app.delete('/delete', (req, res) => {
    let str = "";
    req.on('data', (chunk) => {
        str += chunk;
        console.log(JSON.parse(str));
        let _str = JSON.parse(str);
        read(_str.month, (resData) => {
            let newData = [];
            for (item of JSON.parse(resData)) {
                newData.push(item);
            }
            newData.splice(_str.id, 1);
            write(_str.month, newData, res);
        })
    })
})

//修改数据
app.post('/edit', (req, res) => {
    let str = '';
    req.on('data', (chunk) => {
        str += chunk;
        console.log(JSON.parse(str).data);
        let _str = JSON.parse(str).data;
        read(_str.month, (resData) => {
            let newData = [];
            for (item of JSON.parse(resData)) {
                newData.push(item);
            }
            newData.splice(_str.index, 1, _str);
            write(_str.month, newData, res);
        })
    })
})

http.createServer(app).listen(3000);

