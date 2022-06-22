import React, { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

const socket = io.connect("https://Server.thanadon-tkp.repl.co");

function App() {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
      socket.on("chat message", function (msg) {
        const item = document.createElement("li");
        item.className = "text-message-received";
        const span = document.createElement("span");
        span.textContent = msg.name;
        const p = document.createElement("p");
        p.className = "text-content-received";
        p.textContent = msg.message;
        item.appendChild(span);
        item.appendChild(p);
        messages.appendChild(item);
        messages.scrollTo(0, messages.scrollHeight);
      });
  }, [socket]);

  function HandleSubmit(event) {
    event.preventDefault();
    if (name) {
      if (input) {
        socket.emit("chat message", { name: name, message: input });
        const item = document.createElement("li");
        item.className = "text-message";
        const p = document.createElement("p");
        p.className = "text-content ";
        p.textContent = input;

        item.appendChild(p);
        messages.appendChild(item);
        setInput("");
        messages.scrollTo(0, messages.scrollHeight);
      }
    } else {
      let value = prompt("Your Name:");
      setName(value.length > 10 ? value.slice(0, 10) + "..." : value);
    }
  }

  return (
    <div className="chat-bg">
      <ul id="messages" className="chat-messages">
        {/* messages */}
      </ul>
      <form id="form" className="chat-form" action="">
        <input
          onChange={(event) => setInput(event.target.value)}
          value={input}
          className="chat-input"
          autoComplete="off"
        />
        <button className="chat-btn" onClick={(event) => HandleSubmit(event)}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
