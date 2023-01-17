const fs = require('fs').promises;
const path = require('path');


const contactsPath = path.resolve("./db/contacts.json")

function listContacts() {
    fs.readFile(contactsPath)
    .then(data => console.table(JSON.parse(data)))
    .catch(err => console.log(err.message));
    
      };

  
function getContactById(contactId) {
    fs.readFile(contactsPath)
    .then(data => {
        const contacts = JSON.parse(data)

        const ourContact = contacts.find(contact => contact.id === JSON.stringify(contactId))
        if(!ourContact) {
          console.log("Введено не вірний id")
          return
        }
        console.log(`Контакт з id ${contactId} успішно знайдено`)
        return console.table([ourContact])
        
        })
 
    .catch(err => console.log(err.message));
  }
  
  function removeContact(contactId) {
    fs.readFile(contactsPath)
    .then(data => {
        const contacts = JSON.parse(data)

        const deleteContact = contacts.find(contact => contact.id === JSON.stringify(contactId))

        if(!deleteContact){
            console.log(`Такого id ${contactId} не знайдено, введіть правильне id`)
            return
        }
        const deleteIndex = contacts.indexOf(deleteContact)
        contacts.splice(deleteIndex, 1)
       // const newOurContacts = contacts.filter(contact => contact.id !== JSON.stringify(contactId))

      //  if(contacts.length === newOurContacts.length) {
      //      console.log(`Такого id ${contactId} не знайдено, введіть правильне id`)
      //      return
      //  }
        fs.writeFile(contactsPath, JSON.stringify(contacts))
        
        console.log(`Видалення контакту з id ${contactId} успішне`)
        console.table(contacts)
        })
 
    .catch(err => console.log(err.message));
  }
  
  function addContact(name, email, phone) {
    fs.readFile(contactsPath)
    .then(data => {
        const contacts = JSON.parse(data)
        const lastIndex = contacts.length-1
        const lastId = JSON.parse(contacts[lastIndex].id)

        contacts.push(
            {
                id: `${lastId+1}`,
                name: name,
                email: email,
                phone: phone
            }
        )

        fs.writeFile(contactsPath, JSON.stringify(contacts))

        console.log(`Успішно додано контакт ${name}`)
        console.table(contacts)

    })
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  };



