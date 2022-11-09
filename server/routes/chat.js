const { addMessage, getUsersMsg, getSentMsg } = require('../db/dbHelperFuncs.js');

const { Router } = require('express');
const Chat = Router();



Chat.get('/to', (req, res)=>{
  const id = req.user._id;
  getUsersMsg(id, (msgs)=> {
    if (msgs) {
      res.status.send(msgs);
    } else {
      res.sendStatus(404);
    }
  });
});

Chat.get('/from', (req, res)=>{
  const id = req.user._id;
  getSentMsg(id, (msgs)=> {
    if (msgs) {
      res.status.send(msgs);
    } else {
      res.sendStatus(404);
    }
  });
});

Chat.post('/', (req, res)=>{
  const msg = req.body;
  //construct Msg Obj
  const msgObj = {
    receiver: req.user._id,
    sender: msg.to,
    message: msg.text,
    date: new Date()
  };
  // add msg to Schema
  addMessage(msgObj, (insertedObj)=>{
    if (!!insertedObj) {
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  });
});


module.exports = {Chat};
