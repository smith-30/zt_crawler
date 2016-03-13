var casper = require("casper").create();
// var mysql_escape = require('./config/escape');
casper.echo(casper.cli.get(0));
casper.echo(casper.cli.get(1));
casper.echo(casper.cli.get("foo"));
require("utils").dump(casper.cli.args);
require("utils").dump(casper.cli.options);
casper.exit();
