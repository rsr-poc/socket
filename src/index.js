"use strict";
exports.__esModule = true;
var VideoWatcherNamespace = require("./namespaces/video-watcher");
var server_1 = require("./setup/server");
VideoWatcherNamespace.init();
server_1.server.listen(3000, function () { return console.log("\uD83D\uDD25 Socket listening on port 3000!"); });
