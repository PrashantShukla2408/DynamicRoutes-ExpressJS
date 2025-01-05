const path = require("path");

const fs = require("fs");

const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "contacts.json");

const getContactsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Contact {
  constructor(name, email, phone, date, time, id) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.date = date;
    this.time = time;
  }
  // save() {
  //   getContactsFromFile((contacts) => {
  //     contacts.push(this);
  //     fs.writeFile(p, JSON.stringify(contacts), (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  save() {
    getContactsFromFile((contacts) => {
      if (this.id) {
        const existingContactIndex = contacts.findIndex(
          (c) => c.id === this.id
        );
        const updatedContacts = [...contacts];
        updatedContacts[existingContactIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedContacts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        contacts.push(this);
        fs.writeFile(p, JSON.stringify(contacts), (err) => {
          console.log(err);
        });
      }
    });
  }

  static findById(id, cb) {
    getContactsFromFile((contacts) => {
      const contact = contacts.find((c) => c.id === id);
      cb(contact);
    });
  }

  static deleteById(id, cb) {
    getContactsFromFile((contacts) => {
      const updatedContacts = contacts.filter((c) => c.id !== id);

      fs.writeFile(p, JSON.stringify(updatedContacts), (err) => {
        if (!err) {
          cb();
        }
      });
    });
  }

  static fetchAll(cb) {
    getContactsFromFile(cb);
  }
};
