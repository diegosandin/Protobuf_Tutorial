const root = require("./addressbook");
const axios = require('axios');

const AddressBook = root.tutorial.AddressBook;

async function run() {
    let data = await axios.get('http://localhost:3000/proto/addressbook').then(res => res.data);
    const decodedAddressBook  = AddressBook.decode(Buffer.from(data));
    console.log('AddressBook:\n', decodedAddressBook);
}

module.exports = run;