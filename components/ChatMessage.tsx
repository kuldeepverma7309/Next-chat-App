import React from 'react'

interface ChatMessageProps {
    message: string
    sender: string
    isOwnMessage: boolean
    username: string
}

const ChatMessage = ({ sender, message, username }: ChatMessageProps) => {
    const isMyMessage = sender === username;
    return (
        <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-4`}>
            {/* Message bubble */}
            <div className={`flex flex-col max-w-[80%] sm:max-w-[60%] md:max-w-[50%]`}>
                <div
                    className={`px-4 py-3 rounded-2xl shadow-md 
                        ${isMyMessage ? 'bg-blue-500 text-white self-end' : 'bg-gray-800 text-gray-100 self-start'}
                    `}
                >
                    <span className="text-sm sm:text-base leading-relaxed break-words">{message}</span>
                </div>
                {/* Sender information */}
                <div
                    className={`text-xs mt-1 font-semibold
                        ${isMyMessage ? 'text-blue-400 text-right' : 'text-gray-400 text-left' }
                    `}
                >
                    <span>{isMyMessage ? 'You' : sender}</span>
                </div>
            </div>
        </div>
    );
};


export default ChatMessage