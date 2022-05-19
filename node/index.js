#!/usr/bin/env node
const client = require('./client')
const server = require('./server')
require('yargs')
  .scriptName("addressbook")
  .usage('$0 <cmd> [args]')
  .command('client', 'get the address book from server', {}, function (argv) {
    client();
  }).command('server', 'starts the address book server', {}, async function (argv) {
    await server().catch(err => console.log(err));
  })
  .help()
  .argv