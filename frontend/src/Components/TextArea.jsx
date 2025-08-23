import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import toast, { Toaster } from 'react-hot-toast';
const TextArea = ({ addMessage }) => {

  const [message, setMessage] = useState()
  const sendMessage = () => {
    if(!message){
      toast.error("Please enter message...");
      return false;
    }
    else if(message.trim()){
      addMessage(message);
      setMessage("");
    }
    else{
      toast.error("white space is not allowed...");
    }
  }

  return (
    <div className="message-box">
       <Toaster />
      <textarea
        name="message"
        id="message"
        rows="7"
        placeholder="Enter message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></textarea>
      <button onClick={sendMessage} className="send-btn"><BsFillSendFill /></button>
    </div>
  );
};

export default TextArea;
