'use strict'

const storage = require('./storage');

const findAuthor = (id) => {
  console.log('findAuthor');
  
  const author = storage.authors.find((author) => author.id === id);

  return author;
}

module.exports = {
  getMessage: (root, { id }) => {
    const message = Object.assign({}, storage.messages.find((message) => message.id === id));

    if(message && message.author){
      message.author = findAuthor(message.author);  // message.author is equal to author id
    }

    return message;
  },
  getAllMessages: (root, args) => {
    const allMessages = storage.messages.map((message) => {
      message = Object.assign({}, message);
      message.author = findAuthor(message.author);

      return message;
    });

    return allMessages;
  }
}