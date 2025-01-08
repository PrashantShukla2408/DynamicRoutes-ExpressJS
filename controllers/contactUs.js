const path = require("path");
const rootDir = require("../util/path");

const Contact = require("../models/contactModel");

exports.getContactUs = (req, res) => {
  res.sendFile(path.join(rootDir, "views", "contact-us.html"));
};

// exports.postContactUs = (req, res) => {
//   const contact = new Contact(
//     req.body.name,
//     req.body.email,
//     req.body.phone,
//     req.body.date,
//     req.body.time
//   );
//   contact.save();
//   res.redirect("/success");
// };

exports.postContactUs = (req, res) => {
  const contact = new Contact(
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.date,
    req.body.time
  );
  contact
    .save()
    .then(() => {
      res.redirect("/success");
    })
    .catch((err) => console.log(err));
};

// exports.getContacts = (req, res) => {
//   Contact.fetchAll((contacts) => {
//     res.render("contacts", {
//       contacts: contacts,
//     });
//   });
// };

exports.getContacts = (req, res) => {
  Contact.fetchAll()
    .then((contacts) => {
      console.log(contacts);
      res.render("contacts", {
        contacts: contacts[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getContact = (req, res) => {
//   const contactId = req.params.contactId;
//   Contact.fetchAll((contacts) => {
//     const contact = contacts.find((c) => c.id === contactId);
//     if (contact) {
//       res.render("contact-details", {
//         contact: contact,
//       });
//     } else {
//       res.status(404).send("Contact not found");
//     }
//   });
// };

exports.getContact = (req, res) => {
  const contactId = req.params.contactId;
  Contact.findById(contactId)
    .then(([contact]) => {
      res.render("contact-details", {
        contact: contact[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditContact = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/contacts");
  }
  const contactId = req.params.contactId;
  Contact.findById(contactId, (contact) => {
    if (contact) {
      res.render("edit-contact", {
        contact: contact,
        editing: editMode,
      });
    }
  });
};

exports.postEditContact = (req, res) => {
  const contactId = req.body.contactId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedPhone = req.body.phone;
  const updatedDate = req.body.date;
  const updatedTime = req.body.time;
  const updatedContact = new Contact(
    updatedName,
    updatedEmail,
    updatedPhone,
    updatedDate,
    updatedTime,
    contactId
  );
  updatedContact.save();
  res.redirect("/contacts");
};

exports.postDeleteContact = (req, res) => {
  const contactId = req.body.contactId;
  Contact.deleteById(contactId, () => {
    res.redirect("/contacts");
  });
};

exports.getSuccess = (req, res) => {
  res.sendFile(path.join(rootDir, "views", "success.html"));
};
