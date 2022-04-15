"use strict";
exports.__esModule = true;
exports.init = void 0;
var server_1 = require("../../setup/server");
var VideoEvents = require("./events");
function init() {
    server_1.io.of('/video-watcher').on('connection', function (socket) {
        socket.on('play', VideoEvents.play);
        socket.on('pause', VideoEvents.pause);
        socket.on('sync', VideoEvents.sync);
    });
}
exports.init = init;
