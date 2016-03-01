var casper = require('casper').create({
    pageSettings: {
        loadImages:  true,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    // logLevel: "info",              // Only "info" level messages will be logged
    verbose: true                  // log messages will be printed out to the console
});

var fs = require('fs');
// var u = require('utill');

//クッキー読み込み
var data = fs.read("config/t_cookie.txt");
phantom.cookies = JSON.parse(data);

casper.userAgent('DoCoMo/2.0 SH06A3(c500;TC;W30H18)');


casper.start('https://twitter.com/Suzu_Mg', function(){

    this.echo("test");
    // this.capture('img/login.png');

    this.capture('img/suzu1.png');

    var t = this.getElementsInfo('table[class^="tweet"]');
    this.echo(t.length);

    this.click('div.w-button-more a');
    this.then(function(){
        this.capture('img/_suzu.png');
        var tw = this.getElementsInfo('table[class^="tweet"]');
        this.echo(tw.length);
    });
    // this.clickLabel('さらにツイートを読み込む', 'a');

    this.wait(3000);

    this.capture('img/suzu2.png');

    this.click('div.w-button-more a');

    this.wait(3000);

    this.capture('img/suzu3.png');

    // u.dump();





    /*
    *
    * 処理
    *
    */

});


//実行する
casper.run();
