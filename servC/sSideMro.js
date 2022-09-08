var express = require("express"), app = express(), http = require("http"), server = http.createServer(app),

    io = require("socket.io").listen(server);

app.use("/", express.static(__dirname + "/public"));//このディレクトリの奴を使用可的な
server.listen(8080);

/**
 * 部屋番号を送信
 */