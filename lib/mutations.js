'use strict'

const storage = require('./storage');


const findAuthor = (id) => {
  console.log('findAuthor');
  
  const author = storage.authors.find((author) => author.id === id);

  return author;
}

module.exports = {
  createMessage: (root, { input }) => {
    const storageLength = storage.messages.length - 1;
    const lastID = storage.messages[storageLength].id;

    const newMessage = {};

    if(!input.text || !input.author){
      throw new Error('Text and Author fields are required to create message');
    }

    newMessage.id = parseInt(lastID, 10) + 1;
    newMessage.text = input.text;
    newMessage.author = input.author;
    newMessage.comment = input.comment || '';

    storage.messages.push(newMessage);

    return newMessage;
  },
  updateMessage: (root, { id, input }) => {
    console.log(id);
    
    let message = null;

    for(let i = 0; i < storage.messages.length; i++){
      if(storage.messages[i].id === id){
        storage.messages[i].text = input.text || storage.messages[i].text;
        storage.messages[i].author = input.author || storage.messages[i].author;
        storage.messages[i].comment = input.comment || storage.messages[i].comment;

        message = storage.messages[i];
        break;
      }
    }

    if(!message){
      throw new Error(`No message exists with id: ${id}`);
    }

    return message;
  }
};