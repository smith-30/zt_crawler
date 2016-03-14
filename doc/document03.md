### ログインテスト
```javascript
var data = fs.read("./config/t_cookie.txt");
phantom.cookies = JSON.parse(data);

casper.start('https://twitter.com/login?lang=ja');

casper.then(function(){
  this.wait(3000);
  this.capture('./img/login_check.png');
});
```
fs.readでクッキーファイルを読み込み  
phantom.cookiesに代入することで  
ブラウザにクッキーを読みこませる。
***
### データを取得しファイルに出力してみる
configファイル読み込みの消去
```javascript
var casper = require('casper').create({
  pageSettings: {
      loadImages:  false,　　//画像読み込みをスキップ
      //ガラケーにセット
      userAgent: "DoCoMo/2.0 SH06A3(c500;TC;W30H18)"
  },
  viewportSize : { width: 1440, height: 900 },
  onWaitTimeout: function(timeout, selector) {
    this.echo('timeout Error');
    this.capture('./img/login_error.png');
    this.exit();
  },
});

//ヘルパーモジュール
var u = require('utils');
//ファイルシステム
var fs = require('fs');
//underscore
var _ = require('underscore');

var data = fs.read("./config/t_cookie.txt");
phantom.cookies = JSON.parse(data);

casper.start('https://mobile.twitter.com/711SEJ');

casper.then(function(){
  var tweets = this.getElementsInfo('div.tweet-text');
  _.each(tweets, function(tweet){
    var content = tweet.text.replace(/ |\t|\n/g, '')+',\n';
    fs.write('./output/twitter.csv', content, 'w+');
  });
});

//実行する
casper.run();
```
***
### ページングを行う
```javascript
casper.start('https://mobile.twitter.com/711SEJ', function(){
  /*
  * 初回処理
  */
  this.waitForSelector('.w-button-more', function() {
      this.echo(this.getCurrentUrl());
  })
  /*
  * 2ページ目以降
  */
  .then(function(){
      getOlderPost();
  });
});

casper.then(function(){
  this.echo(this.getCurrentUrl());
});

//実行する
casper.run();


function getOlderPost() {
  if (casper.exists('.w-button-more')) {
      casper.clickLabel('さらにツイートを読み込む', 'a');
      casper.waitForSelector('.w-button-more', function() {
          this.echo(this.getCurrentUrl());
          var tweets = this.getElementsInfo('div.tweet-text');
          _.each(tweets, function(tweet){
            var content = tweet.text.replace(/ |\t|\n/g, '')+',\n';
            fs.write('./output/twitter.csv', content, 'w+');
          });
      })
      .then(function(){
          this.wait(2000);
          getOlderPost();
      });
  }
  return;
}
```
