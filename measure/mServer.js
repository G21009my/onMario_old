'use strict'   // 厳格モードとする

// モジュール
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// オブジェクト
const app = express();
const server = http.Server(app);
const io = socketIO.listen(server);

const fs = require('fs');

// 定数
const PORT = process.env.PORT || 8080;

class avatar2D {
    constructor(type, startCorX, startCorY, corX, corY, vecX, vecY)
}

// サーバーの起動
server.listen(
    PORT,
    () => {
        console.log("Server on port %d", PORT);
    }
);

function getTimeLocal() { // timeStをローカルで更新(ntpとかで聞いたりしない)
    const date1 = new Date();
    let gotNowMyTime = date1.getFullYear() +
        ("00" + (date1.getMonth() + 1)).slice(-2) +
        ("00" + (date1.getDate())).slice(-2) +
        ("00" + (date1.getHours())).slice(-2) +
        ("00" + (date1.getMinutes())).slice(-2) +
        ("00" + (date1.getSeconds())).slice(-2) +
        "." + ("000" + (date1.getMilliseconds())).slice(-3);
    return gotNowMyTime;
}

/** 
 * 
*/
let logFilename;

function createCSV(gameType) {
    logFilename = "logFile_" + gameType + "_" + getTimeLocal() + ".csv";

}

const chat = io.of('/onMario').on('connection', function (socket) {
    let roomName = '';
    socket.on("join_room_from_cli", function (data) {
        roomName = data.value;
        socket.join(roomName);
    });
});