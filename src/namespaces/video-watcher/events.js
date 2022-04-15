"use strict";
exports.__esModule = true;
exports.sync = exports.pause = exports.play = void 0;
var play = function (socket, data) { return console.log('play', data); };
exports.play = play;
var pause = function (socket, data) { return console.log('pause', data); };
exports.pause = pause;
var sync = function (socket, data) { return console.log('sync', data); };
exports.sync = sync;
