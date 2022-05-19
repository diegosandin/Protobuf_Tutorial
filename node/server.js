const root = require("./addressbook");
const axios = require('axios');
const express = require('express');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../address_book');

const AddressBook = root.tutorial.AddressBook;
const Person = root.tutorial.Person;
const app = express();

async function run() {

    app.get('/rest/addressbook', function(req, res) {
        const data = fs.readFileSync(filePath);
        var decodedAddressBook  = AddressBook.decode(Buffer.from(data));
        res.status(200).header('Content-Type', 'application/json').send(JSON.stringify(decodedAddressBook.toJSON()));
    });
  
    app.post('/rest/person', express.text({ type: '*/*' }), function(req, res) {
      const body = JSON.parse(req.body);
      const person = Person.fromObject(body);
      const data = fs.readFileSync(filePath);
      const decodedAddressBook  = AddressBook.decode(Buffer.from(data));
      decodedAddressBook.people.push(person);
      const encodedAddressBook = AddressBook.encode(decodedAddressBook).finish();
      fs.writeFileSync(filePath, encodedAddressBook);
      res.end();
    });

    app.get('/proto/addressbook', function(req, res) {
        const data = fs.readFileSync(filePath);
        res.send(data);
      });
  
    app.listen(3000);  
  }

  module.exports = run;