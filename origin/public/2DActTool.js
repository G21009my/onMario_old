/**┏━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃　　　　　目次　　　　　 ┃
 * ╋┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫
 * ・
 * ・judgeOnTheSquare
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * ここに関数の機能
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * 下記のjudgeOnTheSquareの前処理
 * 送られてきた
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * 四角形同士で変更前後のxy座標を受け取り
 * 指定のオブジェクトの上に接触していればそのオブジェクトの情報を
 * 存在していなければnullを返す関数
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
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
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫
 * 四角形同士で変更前後のxy座標を受け取り
 * 指定のオブジェクトの下に接触していればそのオブジェクトの情報を
 * 存在していなければnullを返す関数
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
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
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫
 * 四角形同士で変更前後のxy座標を受け取り
 * 指定のオブジェクトの左に接触していればそのオブジェクトの情報を
 * 存在していなければnullを返す関数
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
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
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫
 * 四角形同士で変更前後のxy座標を受け取り
 * 指定のオブジェクトの右に接触していればそのオブジェクトの情報を
 * 存在していなければnullを返す関数
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
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
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * 上記4種類の矩形当たり判定を一括で行い
 * それぞれの接触を配列で返す
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
function checkHitRectangle(blockArray,subX, subY, subXup, subYup, subW, subH){
    // (ブロックの要素配列,接触側のx,y,次Fのx,y,接触側の高さ,横幅)
    // blockArrayはx,y,w,hの順で構成された連想配列であることが前提になっています。
    let hitVector={above:false,under:false,right:false,left:false};
    let ab=judgeOnTheSquare(subX, subY, subXup, subYup, subW, subH, blockArray.x,blockArray.y,blockArray.w,blockArray.h);
    let un=judgeUnderTheSquare(subX, subY, subXup, subYup, subW, subH, blockArray.x,blockArray.y,blockArray.w,blockArray.h);
    let ri=judgeTouchAtTheRightSquare(subX, subY, subXup, subYup, subW, subH, blockArray.x,blockArray.y,blockArray.w,blockArray.h);
    let le=judgeTouchAtTheLeftSquare(subX, subY, subXup, subYup, subW, subH, blockArray.x,blockArray.y,blockArray.w,blockArray.h);
    if(ab!=null)hitVector.above=true;
    if(un!=null)hitVector.under=true;
    if(ri!=null)hitVector.right=true;
    if(le!=null)hitVector.left=true;
    if(ab==null&&un==null&&ri==null&&le==null)return null;
    return hitVector;
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * 球体の当たり判定
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
function sphereHit() {
    ;
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * 2Dでの重力処理
 * 下への重力のみ
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
function gravity2D(nowY,acclG){
    return nowY+acclG;
}

/**━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * 2Dでの4方向重力処理
 * vctr(0:右方向,1:左方向,2:上方向,3:下方向(通常))
 * acclG:重力加速度(大体0.5くらいが自然カナ)
 * (或いは画面幅の1/100が)
 * 
 * 下に落ちる機能のみ実装済み
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
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
 * ┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┯┫ 
 * 2Dでの重力処理
 * 三角関数を使い任意の方向に重力を発生させる
 * 後で作ります
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
function fGravity2D(){
    ;
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
 * dRecon
 * 
 * nowArrayMyVertex：更新後の座標を入れた配列
 * lacateArrayOtherVertex：最終nフレーム分の
 *  位置情報の入った配列。
 *  [{xCor:数値, yCor:数値}, {xC...値},...}]
 *  の形の配列になっている前提とする。
 * delayArrayOtherVertex：最終nフレーム分の通信遅延(ms)の配列
 * ┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┷┛*/
function dRecon(
    nowArrayMyVertex,
    locateArrayOtherVertex,
    delayArrayOtherVertex
){
    // cubic spline を実装する
    // 全然わからーーーーーん
}