var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    userAgent: "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:45.0) Gecko/20100101 Firefox/45.0"
});

var fs = require('fs');
var u = require('utils');

//クッキー読み込み
var data = fs.read("config/t_cookie.txt");
phantom.cookies = JSON.parse(data);

/*
* タイムアウト
*/
casper.options.onWaitTimeout = function() {
    this.capture('./img/timeout.png');
};


casper.start('https://twitter.com/711SEJ');

casper.then(function(){
  this.scrollToBottom()
      .wait(3000);
});

casper.then(function(){
  this.scrollToBottom()
      .wait(3000);
  this.capture('./img/scroll.png');
});

//実行する
casper.run();


function getOlderPost() {
  if (casper.exists('.w-button-more')) {
      casper.clickLabel('さらにツイートを読み込む', 'a');
      casper.waitForSelector('.w-button-more', function() {
          this.echo(this.getCurrentUrl());
      })
      .then(function(){
          this.wait(2000);
          getOlderPost();
      });
  }
  return;
}
