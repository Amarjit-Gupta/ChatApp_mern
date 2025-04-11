import { useEffect, useRef } from 'react';

const Message = ({ chats }) => {

  const endOfMessages = useRef();
  const user = localStorage.getItem("user12");

  useEffect(() => {
    endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  // console.log(chats);

  return (
    <div className='list'>
      {chats.map((chat, index) => {
        return (
          chat.username === user ? (
            <div className='send' key={index}>
              <div className="list-child">
                <div className="list1">
                  <div><img src={chat.image} alt='' /></div><div><strong>{chat.username}</strong></div>
                </div>
                <div className="list2">{chat.message}</div>
              </div>
            </div>
          ) : (
            <div className='receive' key={index}>
              <div className="list-child">
                <div className="list1">
                  <div><img src={chat.image} alt='' /></div><div><strong>{chat.username}</strong></div>
                </div>
                <div className="list2">{chat.message}</div>
              </div>
            </div>
          )
        )}
      )}
      <div ref={endOfMessages}></div>
    </div>
  );
};

export default Message;