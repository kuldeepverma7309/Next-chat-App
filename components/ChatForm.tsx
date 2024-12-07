'use client'
import React from 'react'

const ChatForm = ({onSendMessage}:{onSendMessage:(message:string)=>void}) => {
    const [message, setMessage] = React.useState('')
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(message.trim() !== ''){
            onSendMessage(message)
            setMessage('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-3 mt-4'>
            <input type="text" placeholder="Type a message..." className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none" 
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            />
            <button type='submit' className='px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white font-semibold'>Send</button>
        </form>
    )
}

export default ChatForm