'use client'
import ChatForm from '@/components/ChatForm'
import ChatMessage from '@/components/ChatMessage'
import React from 'react'
import { socket } from '@/lib/socketClient'

const Home = () => {
  const [messages, setMessages] = React.useState<{ sender: string, message: string }[]>([])
  const [room, setRoom] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [joined, setJoined] = React.useState(false)
  const [notification, setNotification] = React.useState("")

  const handleSendMessage = (message: string) => {
    // console.log(message)
    const data = { room, message, sender: username }
    setMessages((prev) => [...prev, { sender: username, message }])
    socket.emit('message', data)

  }


  React.useEffect(() => {
    socket.on('message', (data) => {
      console.log(data)
      setMessages((prev) => [...prev, data])
    })

    // socket.on('user-joined', (message) => {
    //   setMessages((prev) => [...prev, { sender: 'system', message }])
    // })

    socket.on('join-notification', (message) => {
      alert(message)
    })
    return () => {
      socket.off('user-joined')
      socket.off('message')
    }
  }, [])

  const handleJoidRoom = () => {
    if (username && room) {
      // console.log(`username: ${username}, room: ${room}`)
      socket.emit('join-room', { room, username })
      setJoined(true)
    }
  }


  return (
    <div className='flex mt-24 w-full justify-center'>
      {
        !joined ?

          (<div className='flex-col gap-3 flex'>
            <h1 className='mb-4 text-2xl font-bold'>Join Room</h1>
            <input type="text" placeholder="Username" className="px-4 border-2 py-2 rounded-lg focus:outline-none mb-4"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input type="text" placeholder="Room" className="px-4 border-2 py-2 rounded-lg focus:outline-none mb-4"
              onChange={(e) => setRoom(e.target.value)}
            />
            <button className='px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white font-semibold'
              onClick={handleJoidRoom}
            >
              Join
            </button>
          </div>)

          :

          (<div className='w-full max-w-3xl mx-auto'>
            <h1 className='mb-4 text-2xl font-bold'>Room: {room}</h1>
            <div className='h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg'>
              {
                messages.map((msg, i) => (
                  <ChatMessage key={i} sender={msg.sender} username = {username} message={msg.message} isOwnMessage={msg.sender === username} />
                ))
              }
            </div>
            <ChatForm onSendMessage={handleSendMessage} />
          </div>)
      }
    </div>
  )
}

export default Home