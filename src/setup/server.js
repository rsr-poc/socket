"use strict";
exports.__esModule = true;
exports.io = exports.server = void 0;
var express = require('express');
var app = express();
var http = require('http');
exports.server = http.createServer(app);
var Server = require('socket.io').Server;
exports.io = new Server(exports.server);
app.get('/', function (_req, res) {
    res.sendFile(__dirname + '/index.html');
});
exports.io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () { return console.log('user disconnected'); });
});
