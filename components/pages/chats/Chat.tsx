import React from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import ChatInput from './ChatInput'

function Chat() {
  return (
    <div className='flex flex-col w-full h-full'>
      <ChatHeader/>
      <ChatBody/>
      <ChatInput/>
    </div>
  )
}

export default Chat
