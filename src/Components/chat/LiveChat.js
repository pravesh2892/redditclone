import React, { useEffect, useRef, useState } from 'react';
import './LiveChat.css';

const LiveChat = () => {
    const [liveChatArray, setLiveChatArray] = useState([]);
    const [chatArray, setChatArray] = useState([]);
    const chatDivRef = useRef(null);
    const arrayLengthRef = useRef(0);
    const [inputMessage, setInputMessage] = useState('');

    async function getQuote() {
        const res = await fetch('https://type.fit/api/quotes');
        const data = await res.json();
        setChatArray(data);
    }

    useEffect(() => {
        getQuote();
    }, []);

    useEffect(() => {
        const key = setInterval(() => {
            if (arrayLengthRef.current === 13) {
                arrayLengthRef.current = 0;
            }
            setLiveChatArray((prevLiveChatArray) => [
                chatArray[arrayLengthRef.current],
                ...prevLiveChatArray,
            ]);
            arrayLengthRef.current = arrayLengthRef.current + 1;
        }, 2000);

        return () => clearInterval(key);
    }, [chatArray]);

    useEffect(() => {
        if (chatDivRef.current) {
            chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
        }
    }, [liveChatArray]);

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            setLiveChatArray((prevLiveChatArray) => [
                { text: inputMessage, author: 'You', id: Date.now() },
                ...prevLiveChatArray,
            ]);
            setInputMessage('');
        }
    };

    return (
        <div ref={chatDivRef} className='main-container'>
            <div className="flex-left">
                <img src="https://imgs.search.brave.com/7x28w_MGWTptv57qdmfzBcqIi3izroMFWMzrhz_nCnQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tcnZp/YW4uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIzLzAyL2xv/Z28tb3Blbi1haS5w/bmc" alt="chatLogo" />
                <div className="flex flex-col text-xs">
                    <div className="flex justify-between items-center w-full">
                        <div className="mr-10 text-xs">General</div>
                        <div className="text-gray-400 text-[10px]">1.00PM</div>
                    </div>
                    <span className="text-sm">r/OpenAi</span>
                </div>
            </div>
            <div className='flex modal-container flex-col-reverse w-full overflow-y-auto h-[20rem]'>
            <div className='top-section'>
                {liveChatArray.length > 0 &&
                    liveChatArray.map((item, idx) => (
                        <div key={item?.id || idx}>
                            <div className='flex gap-2 items-center'>
                                <img
                                    className='h-10 w-10 rounded-full'
                                    src="https://imgs.search.brave.com/gpjzVANMwjTB939eCXVwr8A8havI2Qd_tFtL9nm22_s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NDQ3MDM2ODY5ODEt/YTNhYmJjNGQ0ZmUz/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4T0h4OGNH/bGpkSFZ5Wlh4bGJu/d3dmSHd3Zkh4OE1B/PT0"
                                    alt=''
                                />
                                <div className='flex items-center gap-4 text-sm text-gray-400'>
                                    {item?.author.split(' ').slice(0, 2).join(' ')}{' '}
                                    {new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                            <div className='pl-12'>{item?.text}</div>
                        </div>
                    ))}
                    </div>
                    <div className='bottom-section'>
                   <div className="chat-typing-field">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="border p-2 w-4/5"
                />
                <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Send
                </button>
            </div>
            </div>
            </div>
        </div>
    );
};

export default LiveChat;


