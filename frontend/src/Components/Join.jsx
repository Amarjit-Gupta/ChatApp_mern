import { useState } from 'react';
import _ from 'lodash';
import toast, { Toaster } from 'react-hot-toast';

const Join = ({ setUser, setJoin }) => {

  const [name, setName] = useState("");
  const [joining, setJoining] = useState("");

  const handleUser = (event) => {
    event.preventDefault();
    var uname = /^[A-Za-z\s]+$/;
    if (!name || !joining) {
      toast.error("Please enter name and joining id...");
      return false;
    }
    else if (!uname.test(name)) {
      toast.error("only letter and space is allowed in name...");
      return false;
    }
    else if (name.length < 3) {
      toast.error("Please enter greater than 2 character in name...");
      return false;
    }
    else if (joining.length != 5) {
      toast.error("Please enter 5 character/digit in joining id...");
      return false;
    }
    else if (name.trim() && joining.trim()) {
      localStorage.setItem("user12", name);
      localStorage.setItem("join34", joining);
      localStorage.setItem("image", `https://picsum.photos/id/${_.random(1, 1000)}/200/300`);
      setUser(name);
      setJoin(joining);
      // toast.success("joined success...");
    }
    else {
      toast.error("white space is not allowed...");
    }
  };

  return (
    <div className="user">
      <Toaster />
      <div className="user-child">
        <div>
          <div className="chat-child">
            <img src="./images/chat.png" alt="" />
            <p>Real Time Chat App</p>
          </div>
          <form onSubmit={handleUser}>
            <div className="input">
              <label>Enter Name:<sup>*</sup></label><br />
              <input type='text' placeholder="Enter a Unique Name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input">
              <label>Enter Joining Id:<sup>*</sup> </label><br />
              <input type='text' placeholder="eg: xyz12" onChange={(e) => setJoining(e.target.value)} />
            </div>
            <div className="input">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join;