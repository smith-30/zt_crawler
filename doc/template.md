```javascript
//キャスパーオブジェクト作成
var casper = require('casper').create();

//クロールするページを指定
casper.start('http://www.ugtop.com/spill.shtml');

/*
* 対象ページに対して行いたい処理を書いていく
*/

//実際に処理を実行させるためのメソッド
casper.run();
```
