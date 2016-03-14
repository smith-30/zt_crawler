//キャスパーオブジェクト作成
var casper = require('casper').create({
  pageSettings: {
      loadImages:  false,        // The WebPage instance used by Casper will
      //iphone6 plus
      userAgent: "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:45.0) Gecko/20100101 Firefox/45.0"
  },
  viewportSize : { width: 1280, height: 2000 },
  /*
  * リアルタイムでログをコンソール上に出力
  */
  logLevel: "info",   // defaultはエラー。他は "info", "debug"
  verbose: true,
  // onStepComplete: function(self, m) {　　//ステップ毎に呼ばれる
  //   self.echo("onStepComplete", 'INFO');
  // }
});

casper.on('error', function(msg,backtrace) {
  this.capture('./img/demo2_error.png');
  this.echo("error", 'ERROR');
});

casper.on('http.status.404', function(resource) {
    this.echo('wait, this url is 404: ' + resource.url, 'ERROR');
});

var u = require('utils');
var fs = require('fs');

var urls = [
  "http://b.hatena.ne.jp/hotentry/it/20160228",
  "http://b.hatena.ne.jp/hotentry/it/20160227",
  "http://b.hatena.ne.jp/hotentry/it/20160226",
  "http://b.hatena.ne.jp/hotentry/it/20160225",
  "http://b.hatena.ne.jp/hotentry/it/20160224",
];

casper.start().eachThen(urls, function(response) {
    this.thenOpen(response.data, function(response) {
        this.echo(this.getTitle());
        this.thenOpen(this.getElementAttribute('ul.entry-horizontal-l li div h3 a', 'href'), function(response){
          this.echo(this.getTitle());
        });
    });
});

casper.run();

// casper.start().eachThen(urls, function(response) {
//   u.dump(response);
  // this.thenOpen(response.data, function(response) {
  //   u.dump(response.id);
  //   this.capture('./img/'+response.id+'.png');   //ES6...'./img/${response.id}.png'
  //   this.echo(this.getHTML('ul.entry-horizontal-l'));
  //   this.echo(this.fetchText('ul.entry-horizontal-l'));
  //   this.echo(this.getElementAttribute('ul.entry-horizontal-l li div h3 a', 'href'));
  //   this.thenOpen(this.getElementAttribute('ul.entry-horizontal-l li div h3 a', 'href'), function(response){
  //     this.echo(this.getTitle());
  //     this.capture('./img/'+response.id+'.png');
  //   });
  // });
// });
