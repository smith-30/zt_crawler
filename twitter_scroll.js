var casper = require('casper').create({
    pageSettings: {
        loadImages:  true,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    // logLevel: "info",              // Only "info" level messages will be logged
    verbose: true                  // log messages will be printed out to the console
});

var fs = require('fs');
var u = require('utils');

var url = casper.cli.get(0);

//クッキー読み込み
var data = fs.read("config/t_cookie.txt");
phantom.cookies = JSON.parse(data);

casper.userAgent('DoCoMo/2.0 SH06A3(c500;TC;W30H18)');

/*
* タイムアウト
*/
casper.options.onWaitTimeout = function() {
    this.capture('./img/timeout.png');
};


casper.start('https://twitter.com/Suzu_Mg', function(){
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
      })
      .then(function(){
          this.wait(2000);
          getOlderPost();
      });
  }
  return;
}
