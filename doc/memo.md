```javascript
casper.on('http.status.404', function(resource) {
    this.echo('wait, this url is 404: ' + resource.url);
});
```
***
全体処理終了時のコールバック
```javascript
//すべての処理が終わった後のコールバック
casper.run(function() {
    this.echo('すべての処理が終了しました。');
    this.exit(); // ここでプロセスを終了させないとプロセスが残り続ける
});
```
***
cliオプション  
casperjs demo_cli.js hoge fuga --foo=hoge
***
exitOnError: false  エラーが出ても処理を止めない
