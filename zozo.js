var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    // logLevel: "info",              // Only "info" level messages will be logged
    verbose: true                  // log messages will be printed out to the console
});




casper.start('http://zozo.jp/', function(){
    
    this.echo("test");

    /*
    *
    * 処理
    *
    */

});

//実行する
casper.run();

// casper.run(function() {

//     this.exit();   //終了

// });