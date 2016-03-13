//キャスパーオブジェクト作成
var casper = require('casper').create({
  pageSettings: {
      loadImages:  false,        // The WebPage instance used by Casper will
      //iphone6 plus
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13D15 Safari/601.1"
  },
  viewportSize : { width: 1280, height: 2000 },
  /*
  * リアルタイムでログをコンソール上に出力
  */
  logLevel: "debug",   // defaultはエラー。他は "info", "debug"
  verbose: true
});

var u = require('utils');
var config = require('./config/config');

console.log(config.user);


//クロールするページを指定
casper.start('http://www.ugtop.com/spill.shtml');

/*
* 対象ページに対して行いたい処理を書いていく
*/
casper.then(function(){
  this.capture('./img/02.png');
})
.then(function(){
  // this.echo(u.dump(this.getElementsInfo('meta[name="Description"]')));
  u.dump(this.getElementAttribute('meta[name="Description"]', 'content'));
})
;

/*
* 実際に処理を実行させるためのメソッド
* コールバックはすべての処理が
* 実行後に行われる
*/
casper.run();

/*
* ex.)
*/
// casper.run(function() {
//     this.echo('All Process Done
//     this.exit(); // <--- 忘れるとプロセスが残り続ける
// });
