/**
 * Server will create a http server which provide a socket.io instance.
 * Use io instance, you can send msg to the http client.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const socketio = require('socket.io');

const staitcPath = path.join(__dirname, '../../assets');

const server = http.createServer(function (req, res) {
    let url = req.url;

    switch (url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            getStaticFileStream('/index.html', (err, stream) => {
                if (err) {
                    es.writeHead(404);
                    return res.end('Not Found!');
                }
                stream.pipe(res);
            });
            break;
        default:
            getStaticFileStream(url, (err, stream) => {
                if (err) {
                    res.writeHead(404);
                    return res.end('Not Found!');
                }
                stream.pipe(res);
            });
            break;
    }
});

function getStaticFileStream(url, cb) {
    let filePath = path.join(staitcPath, url);
    fs.stat(filePath, (err, stats) => {
        if (err) return cb(err);
        cb(null, fs.createReadStream(filePath));
    });
}

const io = socketio(server);

module.exports = function (port, cb) {
    server.listen(port, function () {
        console.log(`Memeye runing on: http://localhost:${port}`);
        cb(io, server);
    });

    return {
        io,
        server,
    };
}