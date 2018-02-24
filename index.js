const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.listen(3000, () => {
    console.log('项目运行在3000端口');
})


app.get('/', (req, res) => {
    res.redirect('/chat.html');
})


// app.get('/chat.html', (req, res) => {
//     fs.readFile(path.join(__dirname, './public/chat.html'), function (err, data) {
//         if (err) {
//             console.log('发生错误！');
//             console.log(err);
//             res.send('404');
//         } else {
//             res.end(data);
//         }
//     })
// })

app.use('/', express.static(path.join(__dirname, './public')));