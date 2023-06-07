import React, { useEffect, useState } from 'react'

const WebSocketComponent = () => {
  const [messages, setMessages] = useState('')

  useEffect(() => {
    const conn = new WebSocket('ws://localhost:8080')

    conn.onopen = () => {
      console.log('Connection established!')
    }

    conn.onmessage = (e) => {
      setMessages(e.data)
    }

    return () => {
      conn.close()
    }
  }, [])

  return <div>{messages}</div>
}

export default WebSocketComponent
