import React, { useState, useEffect } from "react";
import api from "../hooks/api";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = React.createRef();

  const fetchGPT3Response = async (message) => {
    try {
      const response = await api.post("/engines/davinci/completions", {
        prompt: `The user says: "${message}"\nThe chatbot responds:`,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 1,
      });

      if (response.data.choices && response.data.choices.length > 0) {
        const botResponse = response.data.choices[0].text.trim();
        return botResponse;
      } else {
        return "I'm sorry, I don't have a response for that.";
      }
    } catch (error) {
      console.error("GPT-3 API error:", error.response?.data || error.message);
      return "I'm sorry, there was an error processing your request.";
    }
  };

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Run scrollToBottom whenever the messages state updates
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botResponse },
        ]);
      }, 1000);
    }
  };
  // Fetch GPT-3 response
  // fetchGPT3Response(input).then((response) => {
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { sender: "bot", text: response },
  //   ]);
  // });
  //   }
  // };
  const predefinedQuestions = [
    "How does AIKREATE work?",
    "What is the cost of AIKREATE service?",
    "Is there a free option?",
    // Add more questions as needed
  ];
  const handlePredefinedQuestionClick = (question) => {
    setInput(question);
    handleSendMessage();
  };
  const getBotResponse = (userMessage) => {
    // Define keywords and responses
    const keywords = {
      hello: "Hello! How can I help you?",
      hi: "Hi! How can I help you?",
      help: "I'm here to help. What do you need assistance with?",
      bye: "Goodbye! Have a great day!",
      benefits:
        "AIKREATE is a educational company exploring the benefits of using AI thecnologies to create a nowadays education programs for next century childs!",
      work: "AIKREATE offers a variety of AI applications for educational purposes",
      service: "AIKREATE has a variety of plans, to fit your specific needs.",
      option: "We are working to offer a free solution to try our services.",
      // noa: "Una persona increïble, i també la germana del pesat que em programa ;)",
      // berta: "Una cuinera execelent...fa unes truites que alucines!!",
      // sonia:
      //   "Una altra excelent persona, i millor mare...germana també del pesadet...",
      // nuria:
      //   "La Núria es la creadora de tots, la matriarca, la que ens ha ensenyat a tots a ser com som, un amor, la mare que tots volem.",
      // contact: "You can contact us on help@aikreate.com, or use our form below",
      // mar: "Una princesa, creativa, cantant com n'hi ha poques, que espavilin aquest d'Eufòria..",
    };

    // Transform userMessage to lowercase and remove special characters
    const cleanedMessage = userMessage
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, "");

    // Find the keyword in the cleanedMessage
    const foundKeyword = Object.keys(keywords).find((keyword) =>
      cleanedMessage.includes(keyword)
    );

    // Return the response or a default message
    return foundKeyword
      ? keywords[foundKeyword]
      : "I'm sorry, I don't understand your message.";
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.sender}`}>
            <span>{message.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="chatbot-predefined-questions">
        {predefinedQuestions.map((question, index) => (
          <button
            key={index}
            className="chatbot-predefined-question"
            onClick={() => handlePredefinedQuestionClick(question)}
          >
            {question}
          </button>
        ))}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
