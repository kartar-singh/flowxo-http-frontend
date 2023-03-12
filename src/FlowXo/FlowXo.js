import React, { useState, useEffect } from "react";

function FlowXo() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    getMessages();
    const intervalId = setInterval(() => {
      getMessages();
    }, 250);

    return () => clearInterval(intervalId);
  }, []);

  function getMessages() {
    fetch("/messages")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.messages);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    sendNewMessage(newMessage).then((message) => {
      setMessages([...messages, message]);
      setNewMessage("");
    });
  }

  function sendNewMessage(message) {
    const payload = makeMessage(message);
    const opts = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return fetch("/message", opts)
      .then(() => payload)
      .catch((error) => {
        console.error(error);
      });
  }

  function makeMessage(messageText) {
    return {
      channel: {
        id: "some@user.com",
      },
      from: {
        id: "123abc",
        name: "Some User",
      },
      message: { text: messageText },
      metadata: {
        origin: window.location.href,
      },
    };
  }

  function formatMessage(payload, from) {
    const message = JSON.stringify(payload.message.text || payload.message).replace(/(\\n)+/, "<br/>");
    let formatted = `<span class='${from}'>${from}: </span><span class='message'>${message}</span>`;
    if (payload.options && payload.options.choices_message) {
      formatted += `<br/><div class='choices'>${payload.options.choices_message}</div>`;
    }
    return formatted;
  }

  function appendNewMessage(data) {
    const message = data.message;
    if (!message.message || message.message_type === "action") {
      return;
    }
    return <p dangerouslySetInnerHTML={{ __html: formatMessage(message, data.from) }}></p>;
  }

  return (
    <div>
      <h2>Messages</h2>
      <div id="dreams">
        {messages.length === 0 && <p>Loading messages...</p>}
        {messages.map((message) => appendNewMessage(message))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="dream" placeholder="Type your message..." value={newMessage} onChange={(event) => setNewMessage(event.target.value)} />
      </form>
     <button type="submit">Send</button>
    </div>
  );
}

export default FlowXo;
