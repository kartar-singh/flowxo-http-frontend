import React, { useState, useEffect } from "react";
// const axios = require('axios').default;
import axios from 'axios';


function SendMsg() {

  const [message, setMessage] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    const url = 'http://localhost:8000/api/message';
    const secret = 'db55d9faba79d0d17c4c65fa4fc0f82c4f11cf253987d5b9';

    const createMessage =  {
      "channel":{
         "id":"kartar@singh.com"
      },
      "from":{
         "id":"1234abcd",
         "name":"kartar singh"
      },
      "message":{
         "text":message
      },
      "metadata":{
         "origin":"https://1e5b-49-43-72-40.in.ngrok.io/bot"
      }
       }

    try {
      const response = await axios.post(url,createMessage);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  

  // const messages = []
  // const getMessages = async (event) => {

  //     try {
  //     const response = await axios.post(url,createMessage);
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
    
  //   await axios.post("/bot", function(request, response) {
  //     console.log("this request is from bot >>>>0",request.body);
  //     messages.push({from:'bot', message:request.body});
  //     return response.send({ message_id: "123" });

  //   });

    const handleBotPost = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/bot');
        console.log('this request is from bot >>>>0', response.data);
        // Assuming "messages" is a state variable that has been defined elsewhere in the component...
        // setMessages(messages => [...messages, {from: 'bot', message: response.data}]);
      } catch (error) {
        console.error("kartar>>>>>",error);
      }
    }
    
    // const url = 'http://localhost:8000/api/bot';
  
    // try {
    //   const response = await axios.post(url);
    //   console.log("res>>>>>>",response);
    // } catch (error) {
    //   console.error("inside the erorr",error);
    // }

  

  function makeMessage(messageText) {
    return {
      channel: {
        id: "kartar@user.com",
      },
      from: {
        id: "123abcd",
        name: "Some User",
      },
      message: { text: message },
      metadata: {
        origin: window.location.href,
      },
    };
  }

  return (
    <>
    <div>
      <h2>Messages</h2>
      <div id="dreams">
      </div>
      <form onSubmit={handleSubmit}>
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
    </div>
      <button onClick={handleBotPost}>get message</button>
    </>
  );
}

export default SendMsg;
