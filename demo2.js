//キャスパーオブジェクト作成
var casper = require('casper').create({
  pageSettings: {
      loadImages:  false,        // The WebPage instance used by Casper will
      //iphone6 plus
      // userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13D15 Safari/601.1"
  },
  viewportSize : { width: 1280, height: 2000 },
  /*
  * リアルタイムでログをコンソール上に出力
  */
  logLevel: "info",   // defaultはエラー。他は "info", "debug"
  verbose: true,
  // onError: function(self, m) {   // Any "error" level message will be written      //onErrorは起動しないっぽい。
  //       self.echo("onError", 'ERROR'); // on the console output and PhantomJS will
  //       self.exit();               // terminate
  // },
  onStepComplete: function(self, m) {　　//ステップ毎に呼ばれる
    self.echo("onStepComplete", 'INFO');
  },
  onLoadError: function(self, m) {      //404エラーなど
    self.echo("onLoadError", 'ERROR');
    // self.exit();
  },
  // exitOnError: false  エラーが出ても処理を止めない
});

casper.on('error', function(msg,backtrace) {
  this.echo("error", 'INFO');
});

// casper.onStepComplete(function(self, backtrace) {
//   self.echo("complete", 'INFO');
// });

// casepr.onStepComplete()

var u = require('utils');
var fs = require('fs');

var urls = [
  "http://b.hatena.ne.jp/hotentry/it/20160229",
  "http://b.hatena.ne.jp/hotentry/it/20160228",
  "http://b.hatena.ne.jp/hotentry/it/20160227",
  "http://b.hatena.ne.jp/hotentry/it/20160226",
  // "http://b.hatena.ne.jp/hotentry/it/20160225",
  // "http://b.hatena.ne.jp/hotentry/it/20160224",
  // "http://b.hatena.ne.jp/hotentry/it/20160223"
];

// casper.start().eachThen(urls, function(response) {
//   this.thenOpen(response.data, function(response) {
    // u.dump(response.id);
    // this.capture('./img/'+response.id+'.png');   //ES6...'./img/${response.id}.png'
    // this.echo(this.getHTML('ul.entry-horizontal-l'));
    // this.echo(this.fetchText('ul.entry-horizontal-l'));
    // this.echo(this.getElementAttribute('ul.entry-horizontal-l li div h3 a', 'href'));
    // this.thenOpen(this.getElementAttribute('ul.entry-horizontal-l li div h3 a', 'href'), function(response){
    //   this.echo(this.getTitle());
      // this.capture('./img/'+response.id+'.png');
//     });
//   });
// });

casper.start().eachThen(urls, function(response) {
    this.click('h3.r a');
    this.thenOpen(response.data, function(response) {
        //this.echo('Errorメッセージ', 'ERROR'); //第二引数にオプション渡すことでコンソール上で色がつく
        // this.echo(this.getTitle());
        this.thenOpen(this.getElementAttribute('ul.entry-horizontal-l li div h3 a', 'href'), function(response){
          this.echo(this.getTitle());
        });
    });

// 　　casper.newPage();
});


// casper.start().each(urls, function(self, link) {
//     this.thenOpen(link, function() {
//       this.thenOpen(this.getElementAttribute('ul.entry-horizontal-l li div h3 a', 'href'), function(response){
//         this.echo(this.getTitle());
//       });
//     });
// });

casper.run();
