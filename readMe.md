動作にはnode環境が必要です。versionは14.17.6での動作を確認しています

node [ディレクトリまでのパス]\onMario\origin\serverMro.js で起動します
起動した状態で http://localhost:8080/ にアクセスし、プレイヤが2人マッチングすると操作可能になります
左右キーで移動、上キーでジャンプ（押しっぱなしで浮遊）
こちらのバージョンではルーム機能を搭載していない（最新のバージョンはtypescriptで打ち直し中）のでマッチをやり直したい場合はserverMro.jsを再起動するようお願いします

このシステムは、研究用に開発したものです

以下研究概要

　本研究では，リアルタイムWebゲーム開発においてゲーム空間内の物理法則や次元数などの要件に対する通信頻度や許容可能な通信遅延，予測アルゴリズムなどのパターン（チューニングパターンと呼ぶ）の導出を目的とする．オンラインゲームの実現には，整合性-応答性のトレードオフ問題をはじめとする高度な専門知識・技術の修得が必要であり，学習コストの高さが初学者の参入障壁となる．そこで学修コストの軽減を目指し，ゲーム空間内で働く重力や慣性力などの物理法則や通信頻度，適用する予測アルゴリズムの組み合わせを定量的に評価し，オンラインゲーム開発の指標を作成することを目指す．特に，本研究では2Dアクションゲームを扱う