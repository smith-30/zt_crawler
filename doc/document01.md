### アクセスしてみる
```javascript
var casper = require('casper').create();

casper.start('http://www.ugtop.com/spill.shtml', function() {
    this.echo(this.getTitle());
    this.echo(this.getCurrentUrl());
});

casper.run();
```
***
### キャプチャを撮ってみる
```javascript
var casper = require('casper').create();

casper.start('http://www.ugtop.com/spill.shtml', function() {
    this.capture('./img/capture01.png');
});

casper.run();
```
***
captureのオプション  
デフォルトでは全画面がキャプチャされる。
```javascript
this.capture('google.png', {
        top: 100,
        left: 100,
        width: 500,
        height: 400
});

this.capture('foo', undefined, {
        format: 'jpg',
        quality: 75
});

```
***
### ユーザエージェントを設定してみる
```javascript
var casper = require('casper').create({
  pageSettings: {
      //iphone6 plus
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13D15 Safari/601.1"
  },
});

casper.start('http://www.ugtop.com/spill.shtml', function() {
    this.capture('./img/capture02.png');
});

casper.run();
```
***
### ついでにプロキシを設定してみる
```bash
$ casperjs --proxy=185.87.160.135:4444 getting_start.js
```
```javascript
var casper = require('casper').create({
  pageSettings: {
      //iphone6 plus
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13D15 Safari/601.1"
  },
});

casper.start('http://www.ugtop.com/spill.shtml', function() {
    this.capture('./img/capture03.png');
});

casper.run();
```
### ブラウザの設定を行う
①画像ロードをスキップ
```javascript
var casper = require('casper').create({
  pageSettings: {
      loadImages:  false,　　//画像読み込みをスキップ
      //Firefox
      userAgent: "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:45.0) Gecko/20100101 Firefox/45.0"
  },
});

casper.start('http://www.for-it.co.jp/', function() {
    this.capture('./img/capture04.png');
    //セレクタ指定でキャプチャを撮ることができる
    this.captureSelector('./img/capture04_02.png', '.sliderWidthC');
});

casper.run();
```
②ビューポートを設定しておく  
casperJSのビューポートの大きさはphantomに依存している。    
phantomのデフォルトビューポートは400X300。  
上記の範囲外でマウスオーバーのイベントは発生しない。  
画面から見えないので。。。
```javascript
var casper = require('casper').create({
  pageSettings: {
      loadImages:  false,　　//画像読み込みをスキップ
      //Firefox
      userAgent: "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:45.0) Gecko/20100101 Firefox/45.0"
  },
  viewportSize : { width: 1440, height: 900 }
});

casper.start('http://www.for-it.co.jp/', function() {
    this.echo(this.getGlobal('innerWidth'));
    this.echo(this.getGlobal('innerHeight'));
});

casper.run();
```
***
getGlobal
windowオブジェクトにアクセスするためのAPI
***
