var express = require("express"), app = express(), http = require("http"), server = http.createServer(app),

    io = require("socket.io").listen(server);

app.use("/", express.static(__dirname + "/public"));//このディレクトリの奴を使用可的な
server.listen(8080);

//console.log(sv);
let logDir=__dirname+"\\log\\"; // ログファイルのディレクトリ
console.log(logDir);

let roomstr = new Array(16);
let orgroom = { x: 0, y: 0, w: 0, h: 0, exis: false };

let fRoom = JSON.stringify({ // player
    no: 0,
    p1: { x: 0, y: 0, w: 0, h: 0, exis: false },
    p2: { x: 0, y: 0, w: 0, h: 0, exis: false }
});

for (i = 0; i < roomstr.length; i++) {
    roomstr[i] = JSON.parse(fRoom);
    roomstr[i].no = (i + 1);
}

let pOne = false;
let pTwo = false;

let fileName01;
let fileName02;

const fs = require('fs');

//1Pの座標
let nowX1 = 0;
let nowY1 = 0;

let vecX1 = 0;
let vecY1 = 0;

// 1PがDRで予測した2Pの座標
let drX02 = 0;
let drY02 = 0;

let time1 = 0;

//2Pの座標
let nowX2 = 0;
let nowY2 = 0;

let vecX2 = 0;
let vecY2 = 0;

// 2PがDRで予測した1Pの座標
let drX01 = 0;
let drY01 = 0;

let time2 = 0;

let die1 = false;
let die2 = false;

// 以下タイムスタンプ関係
let getTimeChice = 0; // タイムスタンプ取得機能の選択用
// 0:ローカルで所得 1:ntpで所得(未実装)

let timeSt = 0; // タイムスタンプ

function getTimeFoundation() {
    if (getTimeChice == 1) {
        // 未実装。ntpで時間を所得する関数を呼ぶ
    } else {
        timeSt = getTimeLocal();
    }
}

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

// ログファイルの生成
function createCSV(N) {
    console.log("aaaaaaa")
    getTimeFoundation();
    fileName01 = "logFile01P_" + timeSt + ".csv";
    fileName02 = "logFile02P_" + timeSt + ".csv";
    let column = 'time,x,y,dX,dY,conON,delayTime';
    if (N == 1) {
        fs.writeFile(logDir + fileName01, column, function (err) {
            if (err) { console.log(err + "\nファイルが正常に作成されませんでした") }
            console.log(logDir+fileName01 + ' が作成されました');
        });
    } else {
        fs.writeFile(logDir + fileName02, column, function (err) {
            if (err) { console.log(err + "\nファイルが正常に作成されませんでした") }
            console.log(fileName02 + ' が作成されました');
        });
    }
}

function writeCSV(x, y, drX, drY, conOn, filename, myTime) {
    // CSVにしたいデータ(オブジェクト)
    getTimeFoundation();

    let writeDelay = timeSt - myTime;
    const data = [
        { time: timeSt, x: x, y: y, drX: drX, drY: drY, conOn: conOn, delayTime: writeDelay}
    ];

    // 準備
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: logDir + filename,       // 保存する先のパス
        header: ['time', 'x', 'y', 'drX', 'drY', 'conOn', 'delayTime'],  // 出力する項目(ここにない項目はスキップされる)
        append: true
    });

    // 書き込み
    csvWriter.writeRecords(data)
        .then(() => {
            //console.log('done');
        });
}

io.sockets.on("connection", function (socket) {
    console.log("conecting");
    socket.on("memSyncFromCli", function () {
        console.log("\"memSync\" is ignite from cliant. member:");
        io.sockets.emit("memSyncFromSvr", pOne, pTwo);
    });

    socket.on("loginFromCli", function (pNum) {
        console.log("\"login\" is ignite from cliant." + pNum);
        // プレイヤー番号の割り振り
        if (pNum == 1) {
            createCSV(1);
            pOne = true;
        } else if (pNum == 2) {
            createCSV(2);
            pTwo = true;
        } else {
            ;
        }

        io.sockets.emit("checkLoginFromSvr", pOne, pTwo);
    });

    socket.on("checkLoginFromCli", function () {
        // 全員ログイン出来ているかのチェック
        console.log("\"checkLogin\" is ignite from cliant.");
        io.sockets.emit("checkLoginFromSvr", pOne, pTwo);
    });

    socket.on("closeLoginFromCli", function () {
        // ログイン処理を終える

        console.log("\"closeLogin\" is ignite from cliant.");
        io.sockets.emit("closeLoginFromSvr");
    });

    socket.on("startStageFromCli", function (pNum) {
        // スタート時の初期化処理
        console.log("\"startStage\" is ignite from cliant." + pNum);
        console.log("Variables used on the stage have been initialized.");
        nowX1 = 40;
        nowX2 = 90;
        nowY1 = 200;
        nowY2 = 200;

        io.sockets.emit("startStageFromSvr", nowX1, nowY1, nowX2, nowY2);
    });

    socket.on("sendOneFromCli", function (sendx, sendy, sendVecX, sendVecY, sendt, sendFrX, sendFrY, sendConOn) {
        //console.log("\"Send\" is ignite from One.");
        nowX1 = sendx;
        nowY1 = sendy;
        vecX1 = sendVecX;
        vecY1 = sendVecY;
        time1 = sendt;

        drX02 = sendFrX;
        drY02 = sendFrY;
        
        io.sockets.emit("infoPosForOne", nowX2, nowY2, vecX2, vecY2, time2);
        writeCSV(nowX1, nowY1, drX02, drY02, sendConOn, fileName01, time1);
    });
    //
    socket.on("sendTwoFromCli", function (sendx, sendy, sendVecX, sendVecY, sendt, sendFrX, sendFrY, sendConOn) {
        //console.log("\"Send\" is ignite from Two.");
        nowX2 = sendx;
        nowY2 = sendy;
        vecX2 = sendVecX;
        vecY2 = sendVecY;
        time2 = sendt;

        drX01 = sendFrX;
        drY01 = sendFrY;
        
        io.sockets.emit("infoPosForTwo", nowX1, nowY1, vecX1, vecY1, time1);
        writeCSV(nowX2, nowY2, drX01, drY01, sendConOn, fileName02, time2);
    });

    socket.on("lisPosFromOne", function () {
        console.log("\"lisPos\" is ignite from One.-------------------------");
        io.sockets.emit("infoPosForOne", nowX2, nowY2, vecX2, vecY2, time2);
        console.log("Coor is...\n:X2:" + nowX2 + " Y2:" + nowY2);
        console.log("Vec is...\n:X2:" + vecX2 + " Y2:" + vecY2);
    });

    socket.on("lisPosFromTwo", function () {
        console.log("\"lisPos\" is ignite from Two.---------------------");
        io.sockets.emit("infoPosForTwo", nowX1, nowY1, vecX1, vecY1, time1);
        console.log("Coor is...\nX1:" + nowX1 + " Y1:" + nowY1);
        console.log("Vec is...\nX1:" + vecX1 + " Y1:" + vecY1);
    });

    socket.on("GameOverFromOne", function () {
        console.log("\"GameOver\" is ignite from P1.");
        die1 = true;
        if (die2 == true) {
            nowX1 = 40;
            nowX2 = 90;
            nowY1 = 300;
            nowY2 = 300;

            io.sockets.emit("restartFromSvr");
        } else {
            io.sockets.emit("waitRestartForOne")
        }
    });

    socket.on("GameOverFromTwo", function () {
        console.log("\"GameOver\" is ignite from P2.");
        die2 = true;
        if (die1 == true) {
            nowX1 = 40;
            nowX2 = 90;
            nowY1 = 300;
            nowY2 = 300;

            io.sockets.emit("restartFromSvr");
        } else {
            io.sockets.emit("waitRestartForTwo")
        }
    });

});