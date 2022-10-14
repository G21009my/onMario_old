/**┏━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃　　　　　目次　　　　　 ┃
 * ╋┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫
 * ・
 * ・judgeOnTheSquare
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/


/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * */

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * ここに関数の機能
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/




/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * 接触判定関係の関数
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┫
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * 四角形同士で変更前後のxy座標を受け取り
 * 指定のオブジェクトの上に接触していればそのオブジェクトの情報を
 * 存在していなければnullを返す関数*/
function judgeOnTheSquare(subX, subY, subXup, subYup, subW, subH, tarX, tarY, tarW, tarH) {
    // (接触側のx,y,次Fのx,y,接触側の高さ,横幅,被接触側のx,y,高さ,横幅)

    let subject = { x: subX, y: subY, nextX: subXup, nextY: subYup, w: subW, h: subH };
    //接触側オブジェクトの要素

    var target = { x: tarX, y: tarY, w: tarW, h: tarH };
    //被接触側オブジェクトの要素

    if (subject.y + subject.h <= target.y && subject.nextY + subject.h >= target.y) {
        /** 
         * 接触側の今のy座標の(我々から向かって)下の頂点が
         * 被接触側のy座標の(向かって)上の頂点に対して
         * (向かって)上の位置であるか。
         * &&
         * 次フレームの接触側のy座標の頂点が
         * 被接触側のy座標の頂点の位置を(向かって)下へ突き抜ける(或いは同じ位置)とき
         * 要は(向かって)上に接触しているとき。
         */

        if ((subject.x + subject.w <= target.x || subject.x >= target.x + target.w) &&
            (subject.nextX + subject.w <= target.x || subject.nextX >= target.x + target.w)) {
            /**
             * 被接触側のx座標の右頂点が接触側の現x座標の左頂点より右である
             * || 被接触側のx座標の左頂点が接触側の現x座標の右頂点より左である
             * (つまりx軸が合って「いない」状態であるか)
             * &&
             * 被接触側のx座標の右頂点が接触側の次フレームのx座標の左頂点より右となるか
             * || 被接触側のx座標の左頂点が接触側の次フレームのx座標の右頂点より左となるか
             * (つまりは次フレームでx軸が「合わない」状態であるか)
             */

            return null;// ブロックの上にいない場合には何もしない
        }

        return target;
    }
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * 四角形同士で変更前後のxy座標を受け取り
 * 指定のオブジェクトの下に接触していればそのオブジェクトの情報を
 * 存在していなければnullを返す関数*/
function judgeUnderTheSquare(subX, subY, subXup, subYup, subW, subH, tarX, tarY, tarW, tarH) {
    // (接触側のx,y,次Fのx,y,接触側の高さ,横幅,被接触側のx,y,高さ,横幅)

    let subject = { x: subX, y: subY, nextX: subXup, nextY: subYup, w: subW, h: subH };
    //接触側オブジェクトの要素

    let target = { x: tarX, y: tarY, w: tarW, h: tarH };
    //被接触側オブジェクトの要素

    if (subject.y >= target.y + subject.h && subject.nextY <= target.y + subject.h) {
        /** 
         * 接触側の今のy座標の(我々から向かって)上の頂点が
         * 被接触側のy座標の(向かって)下の頂点に対して
         * (向かって)下の位置であるか。
         * &&
         * 次フレームの接触側のy座標の頂点が
         * 被接触側のy座標の頂点の位置を(向かって)上へ突き抜ける(或いは同じ位置)とき
         * 要は(向かって)下に接触しているとき。
         */

        if ((subject.x + subject.w <= target.x || subject.x >= target.x + target.w) &&
            (subject.nextX + subject.w <= target.x || subject.nextX >= target.x + target.w)) {
            /**
             * 被接触側のx座標の右頂点が接触側の現x座標の左頂点より右である
             * || 被接触側のx座標の左頂点が接触側の現x座標の右頂点より左である
             * (つまりx軸が合って「いない」状態であるか)
             * &&
             * 被接触側のx座標の右頂点が接触側の次フレームのx座標の左頂点より右となるか
             * || 被接触側のx座標の左頂点が接触側の次フレームのx座標の右頂点より左となるか
             * (つまりは次フレームでx軸が「合わない」状態であるか)
             */

            return null;// ブロックの上にいない場合には何もしない
        }

        return target;
    }
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * 四角形同士で変更前後のxy座標を受け取り
 * 指定のオブジェクトの左に接触していればそのオブジェクトの情報を
 * 存在していなければnullを返す関数*/
function judgeTouchAtTheLeftSquare(subX, subY, subXup, subYup, subW, subH, tarX, tarY, tarW, tarH) {
    // (接触側のx,y,次Fのx,y,接触側の高さ,横幅,被接触側のx,y,高さ,横幅)

    let subject = { x: subX, y: subY, nextX: subXup, nextY: subYup, w: subW, h: subH };
    //接触側オブジェクトの要素

    let target = { x: tarX, y: tarY, w: tarW, h: tarH };
    //被接触側オブジェクトの要素

    if (subject.x + subject.w <= target.x && subject.nextX + subject.w >= target.x) {
        /** 
         * 接触側の今のx座標の(我々から向かって)右の頂点が
         * 被接触側のy座標の左の頂点に対して左の位置であるか。
         * &&
         * 次フレームの接触側のx座標の頂点が
         * 被接触側のx座標の頂点の位置を右へ突き抜ける(或いは同じ位置)とき
         * 要は右に接触しているとき。
         */

        if ((subject.y + subject.h <= target.y || subject.y >= target.y + target.h) &&
            (subject.nextY + subject.h <= target.y || subject.nextY >= target.y + target.h)) {
            /**
             * 接触側の現y座標の下頂点が被接触側のy座標の上頂点より上である
             * || 接触側の現x座標の上頂点が接触側のy座標の下頂点より下である
             * (つまりy軸が合って「いない」状態であるか)
             * &&
             * 接触側の次フレームのy座標の下頂点が被接触側のy座標の上頂点より上となるか
             * || 接触側の次フレームのy座標の上頂点が被接触側のy座標の下頂点より下となるか
             * (つまりは次フレームでx軸が「合わない」状態であるか)
             */

            return null;// ブロックの上にいない場合には何もしない
        }

        return target;
    }
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * 四角形同士で変更前後のxy座標を受け取り
 * 指定のオブジェクトの右に接触していればそのオブジェクトの情報を
 * 存在していなければnullを返す関数*/
function judgeTouchAtTheRightSquare(subX, subY, subXup, subYup, subW, subH, tarX, tarY, tarW, tarH) {
    // (接触側のx,y,次Fのx,y,接触側の高さ,横幅,被接触側のx,y,高さ,横幅)

    let subject = { x: subX, y: subY, nextX: subXup, nextY: subYup, w: subW, h: subH };
    //接触側オブジェクトの要素

    let target = { x: tarX, y: tarY, w: tarW, h: tarH };
    //被接触側オブジェクトの要素

    if (subject.x >= target.x + subject.w && subject.nextX <= target.x + subject.w) {
        /** 
         * 接触側の今のx座標の(我々から向かって)左の頂点が
         * 被接触側のy座標の右の頂点に対して右の位置であるか。
         * &&
         * 次フレームの接触側のx座標の頂点が
         * 被接触側のx座標の頂点の位置を右へ突き抜ける(或いは同じ位置)とき
         * 要は右に接触しているとき。
         */

        if ((subject.y + subject.h <= target.y || subject.y >= target.y + target.h) &&
            (subject.nextY + subject.h <= target.y || subject.nextY >= target.y + target.h)) {
            /**
             * 接触側の現y座標の下頂点が被接触側のy座標の上頂点より上である
             * || 接触側の現x座標の上頂点が接触側のy座標の下頂点より下である
             * (つまりy軸が合って「いない」状態であるか)
             * &&
             * 接触側の次フレームのy座標の下頂点が被接触側のy座標の上頂点より上となるか
             * || 接触側の次フレームのy座標の上頂点が被接触側のy座標の下頂点より下となるか
             * (つまりは次フレームでx軸が「合わない」状態であるか)
             */
            return null;// ブロックの上にいない場合には何もしない
        }
        return target;
    }
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛ 
 * 上記4種類の矩形当たり判定を一括で行い
 * それぞれの接触を配列で返す*/
function checkHitRectangle(blockArray, subX, subY, subXup, subYup, subW, subH) {
    // (ブロックの要素配列,接触側のx,y,次Fのx,y,接触側の高さ,横幅)
    // blockArrayはx,y,w,hの順で構成された連想配列であることが前提になっています。
    let hitVector = { above: false, under: false, right: false, left: false };
    let ab = judgeOnTheSquare(subX, subY, subXup, subYup, subW, subH, blockArray.x, blockArray.y, blockArray.w, blockArray.h);
    let un = judgeUnderTheSquare(subX, subY, subXup, subYup, subW, subH, blockArray.x, blockArray.y, blockArray.w, blockArray.h);
    let ri = judgeTouchAtTheRightSquare(subX, subY, subXup, subYup, subW, subH, blockArray.x, blockArray.y, blockArray.w, blockArray.h);
    let le = judgeTouchAtTheLeftSquare(subX, subY, subXup, subYup, subW, subH, blockArray.x, blockArray.y, blockArray.w, blockArray.h);
    if (ab != null) hitVector.above = true;
    if (un != null) hitVector.under = true;
    if (ri != null) hitVector.right = true;
    if (le != null) hitVector.left = true;
    if (ab == null && un == null && ri == null && le == null) return null;
    return hitVector;
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * 球体の当たり判定*/
function sphereHit() {
    ;
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛ 
 * 2Dでの重力処理
 * 下への重力のみ*/
function gravity2D(nowY, acclG) {
    return nowY + acclG;
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛ 
 * 2Dでの4方向重力処理
 * vctr(0:右方向,1:左方向,2:上方向,3:下方向(通常))
 * acclG:重力加速度(大体0.5くらいが自然カナ)
 * (或いは画面幅の1/100が)
 * 
 * 下に落ちる機能のみ実装済み*/
function qGravity2D(nowX, nowY, vctr, speedX, speedY, acclG) {
    let nc = { x: nowX, y: nowY };
    if (vctr == 0) { // 右に落ちる
        ;
    } else if (vctr == 1) { // 左に落ちる
        ;
    } else if (vctr == 2) { // 上に落ちる
        speedY = speedY - acclG;
    } else { // 下に落ちる
        speedY = speedY + acclG;
        if (speedX < 0) {
            speedX + acclG;
            if (speedX > 0) speedX = 0;
        } else if (speedX > 0) {
            speedX - acclG;
            if (speedX < 0) speedX = 0;
        }
    }
    nc.x = nowX + speedX;
    nc.y = nowY + speedY;
    return nc;
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * 2Dでの重力処理
 * 三角関数を使い任意の方向に重力を発生させる
 * 後で作ります*/
function fGravity2D() {
    ;
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛ 
 * xへの等速移動*/
function moveX() {

}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛ 
 * x方向への加速ありの移動速度を計算する
 * 
 * ・power：加速力
 * ・nowThrust：現在推力
 * ・maxThrust：最大推力
 * 
 * -以下なくても可-
 * ・resistPower：抵抗の強さ。デフォルトでは 0 で初期化される。マイナスには絶対するな */
function xThrustUp(
    power,
    nowThrust,
    maxThrust,

    resistPower = 0
) {
    // 抵抗力がマイナスになられるとマズいのでマイナスなら0に矯正する
    if (resistPower < 0) resistPower = 0;

    // 抵抗力の分だけ推力を0に近づける
    // |nowThrust| - resistPower … nowThrustが0を跨がないかを判定
    if ((Math.abs(nowThrust) - resistPower) < 0) {
        nowThrust = 0;
    } else {
        /**抵抗力に現在推力の符号を掛けた値を減算する
         * （Math.signすると符号だけが残るのでそれを掛けている）
         * 正の値の推力なら抵抗力の分だけ現在推力を減算
         * 負の値なら加算となる
         * とりあえず0に近づくと考えれば良い */
        nowThrust -= resistPower * (Math.sign(nowThrust) ^ 0);
    }

    // 現在推力が最大推力を上回る場合に最大推力に矯正する
    if (Math.abs(nowThrust + power) > maxThrust) {
        nowThrust = maxThrust * (Math.sign(nowThrust + power) ^ 0);
    } else {
        // 現在推力に加速力を加算
        nowThrust += power;
    }

    return nowThrust;
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ━━━━━━━━━━━━━━━━━━━━━━━━━┛ 
 * x方向への加速ありの移動速度を計算する
 * 
 * ・nowThrust：現在推力
 * ・nowSpeed：現在速度
 * ・maxSpeed：最大速度
 * 
 * -以下なくても可-
 * ・resistPower：抵抗の強さ。デフォルトでは 0 で初期化される。マイナスには絶対するな */
function xSpeedUp(
    nowThrust,
    nowSpeed,
    maxSpeed,

    resistPower = 0
) {
    // 抵抗力の分だけ速度を0に近づける
    if ((Math.abs(nowSpeed) - resistPower) < 0) {
        nowSpeed = 0;
    } else {
        /**抵抗力に現在推力の符号を掛けた値を減算する
         * 内容は上でやってる推力の計算と同じなので詳しくはそちらを参照 */
        nowSpeed -= resistPower * (Math.sign(nowSpeed) ^ 0);
    }

    // 現在速度が最大速度を上回る場合に最大速度に矯正する
    if (Math.abs(nowSpeed + nowThrust) > maxSpeed) {
        nowSpeed = maxSpeed * (Math.sign((nowSpeed + nowThrust)) ^ 0);
    } else {
        // 現在速度に現在推力を加算
        nowSpeed += nowThrust;
    }

    return nowSpeed;
}

function xAccel(
    xVector,

    power,
    nowThrust,
    nowSpeed,
    maxThrust,
    maxSpeed,

    resistFlag = FALSE,
    resistPower = 0
) {

}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫
 * stDRecon(standard Dead Reckoning)
 * 相方から貰った前フレームの座標を用いて
 * 当てずっぽうで座標を予測する処理
 * 
 * 以下仮引数
 * nowArray:更新後の座標を入れた配列
 * xCoordinateOtherVertex:最後に送信された他端末のアバタx座標
 * yCoordinateOtherVertex:同上。yバージョン
 * xVectorOtherVertex:最後に送信された相方のx軸の移動速度。
 * yVectorOtherVertex:同上。
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
function stDRecon(
    nowArrayMyVertex,
    xCoordinateOtherVertex,
    yCoordinateOtherVertex,
    xVectorOtherVertex,
    yVectorOtherVertex,
    delayLoopOtherVertex
) {
    nowArrayMyVertex.x = xCoordinateOtherVertex + xVectorOtherVertex * delayLoopOtherVertex
    nowArrayMyVertex.y = yCoordinateOtherVertex + yVectorOtherVertex * delayLoopOtherVertex;
    console.log(nowArrayMyVertex.x);
    return nowArrayMyVertex;
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * calCircle
 * 三点の座標から円を算出する
 * 中心点の座標と、中心点からの半径を出力する
 * 
 * 
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
function calCircle(
    x0, y0, x1, y1, x2, y2
) {
    // 2点を結ぶ線分の垂直2等分線を求める処理
    sect = function (x1, y1, x2, y2) {
        // 直線の係数を求める
        var a = (y2 - y1) / (x2 - x1);
        var b = y1 - (a * x1);
        // 直線の中点を求める
        var mx = x1 + ((x2 - x1) / 2);
        var my = y1 + ((y2 - y1) / 2);
        // 直線の垂直二等分線の係数を求める
        var aa = -1 / a;
        var bb = my - (aa * mx);
        return [mx, my, aa, bb];
    }
    ret = sect(x0, y0, x1, y1);
    m1 = [ret[0], ret[1]];              // 中点座標
    ab = [ret[2], ret[3]];
    ret = sect(x1, y1, x2, y2);
    m2 = [ret[0], ret[1]];
    cd = [ret[2], ret[3]];

    // 二つの垂直二等分線の交点、つまりは中心点を求める
    // 解法）x = (-1/(-a+c) * -b) + (1/(-a+c) * -d)
    //       y = (-c/(-a+c) * -b) + (a/(-a+c) * -d)
    var z = 1 / (-ab[0] + cd[0]);                   // z = 1/(-a+c)
    cx = z * (-1 * -ab[1] + 1 * -cd[1]);    // x = z * (-1 * -b + 1 * -d)
    cy = z * (-cd[0] * -ab[1] + ab[0] * -cd[1]);    // y = z * (-c * -b + a * -d)

    // 円の半径
    var r = Math.sqrt(Math.pow(cx - x0, 2) + Math.pow(cy - y0, 2));

    return { cx, cy, r };
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * calAngAccel(calculate angular acceleration)
 * 三点の座標と各点が持つ時刻(フレーム)の差分から角速度と角加速度を算出する
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
function calAngAccel(
    x_last,
    y_last,
    f_last,
    x_pre,
    y_pre,
    f_pre,
    x_pre2,
    y_pre2,
    f_pre2
) {
    // まず3点から円の中心点と半径をcalcCircleを用いて求める
    circle = calCircle(x_last, y_last, x_pre, y_pre, x_pre2, y_pre2,);
    cx = circle.cx;
    cy = circle.cy;
    r = circle.r;

    // 各2点間の角度を求める
    rad = function (x0, y0, x1, y1) { return Math.atan2(y1 - y0, x1 - x0) }
    rad_ltoP = rad(x_last, y_last, x_pre, y_pre);
    rad_ptoP2 = rad(x_pre, y_pre, x_pre2, y_pre2);

    // 3点の角度の変化が少ない場合は円ではないとして計算を飛ばす
    if (Math.abs(rad_ltoP) > 0.0001 && Math.abs(rad_ptoP2) > 0.0001) {
        // 各2点間の角速度を求める
        vel_ptoP2 = rad_ptoP2 / (f_pre - f_pre2);
        vel_ltoP = rad_ltoP / (f_last - f_pre);

        acl_ltoP = vel_ltoP / (f_last - f_pre);

        return { vel_ltoP, acl_ltoP };
    } else {
        return "I_am_straight_line.";
    }
}


/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * cirPred(Circular Prediction)
 * 
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
function cirPred(
    lastX,
    lastY,
    cirX,
    cirY,
    rudius,
    angVel,
    angAccel,

    maxAngVel=30,
    debug = 0
) {
    rad = Math.atan2(lastY + (-1 * cirY), lastX + (-1 * cirX));

    console.log(angVel+"+"+angAccel);
    angVel += angAccel;
    if(angVel>maxAngVel){angVel=maxAngVel;}
    rad += angVel*Math.PI/180

    calX = rudius * Math.cos(rad) + cirX;
    calY = rudius * Math.sin(rad) + cirY;

    return {calX, calY, angVel,rudius};
}



/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫
 * dRecon
 * 
 * nowArrayMyVertex：更新後の座標を入れた配列
 * lacateArrayOtherVertex：最終nフレーム分の
 * 位置情報の入った配列。
 * [{xCor:数値, yCor:数値}, {xC...値},...}]
 * の形の配列になっている前提とする。
 * delayArrayOtherVertex：最終nフレーム分の通信遅延(ms)の配列
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
function dRecon(
    nowArrayMyVertex,
    locateArrayOtherVertex,
    delayArrayOtherVertex
) {
    // cubic spline を実装する
    // 全然わからーーーーーん
}