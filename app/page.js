'use client'

import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [history, setHistory] = useState([ 
    
  ])
  const firstMessage = "Hi there! I am a chatbot designed to help people prepare for the JLPT Exams. What can I do for you?"
  
  const [message, setMessage] = useState("")

  const sendMessage = async () => {
    setHistory((history) => [ ...history, {role: "user", parts: [{text: message}]} ])
    setMessage('')

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify([ ...history, {role: "user", parts: [{text: message}]} ])
    })

    const data = await response.json()

    setHistory((history) => [ ...history, {role: "model", parts: [{text: data}] }])
  }

  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      display={'flex'}
      flexDirection={"column"}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Stack 
        direction="column"
        width="600px"
        height="700px"
        border="2px solid black"
        p={2}
        spacing={3}
        justifyContent={'flex-end'}
        borderRadius={5}
      >
        <Stack 
        direction="column"
        spacing={2}
        overflow="auto"
        maxHeight="100%"
        flexGrow={1}
        >
          <Box
            display={'flex'}
            bgcolor={'secondary.main'}
            borderRadius={5}
            p={2}
          >
            <Typography
              bgcolor={'secondary.main'}
              color={'white'}
            >
              {firstMessage}
            </Typography>
          </Box>
          {history.map((textObject, index) => (
            <Box
              key={index}
              display={'flex'}
              justifyContent=
              {textObject.role === 'user' ? 'flex-end' : 'flex-start'

              }
            >
              <Box
                bgcolor={
                  textObject.role === 'user' 
                  ? 'primary.main' 
                  : 'secondary.main'
                }
                color={'white'}
                borderRadius={5}
                p={2}
              >
                {textObject.parts[0].text}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField 
          label='Message' 
          value={message} 
          onChange={(e => setMessage(e.target.value))} 
          fullWidth />
          <Button 
            variant='contained' 
            onClick={sendMessage}>
              Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}


/*
export default function Home() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Hi! I'm the Headstarter AI Support Agent, how can I assist you today?`
  }]);

  const [message, setMessage] = useState('')


  const sendMessage = async() => {
    if (!message.trim()) return; //handle empty message
   

    setMessage('')
    setMessages((messages) => [
      ...messages,
      {role: "user", content: message},
      {role: "assistant", content: ''}
    ])

    try {
    const response = fetch('/api/chat', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, {role: 'user', content: message}]),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    
    
    const reader = res.body.getReader()
    const decode = new TextDecoder()

    while (true) {
      const {done, value} = await reader.read()
        if (done) break
        const text = decoder.decode(value || new Int8Array(), {stream:true})
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text
            },
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        {role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later."},
      ])
    }
  }

  

  return ( 
    <Box 
    width="100vw" 
    height="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center">
      <Stack
      direction="column"
      width="600px"
      height="700px"
      border="1px solid black"
      p={2}
      spacing={3}
      >
        <Stack
        direction="column"
        spacing={2}
        flexGrow={1}
        overflow="auto"
        maxHeight="100%"
        >
          {
            messages.map((message, index) => (
              <Box key = {index} display = 'flex' justifyContent = {
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
              >
                <Box
                bgcolor = {
                  message.role === 'assistant'
                  ? 'primary.main'
                  : 'secondary.main'
                }
                color = "white"
                borderRadius = {16}
                p = {3}
                >
                  {message.content}
                </Box>
              </Box>
            ))
          }
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
          label = "Message"
          fullWidth
          value = {message}
          onChange = {(e) => setMessage(e.target.value)}
          />
         <Button 
         variant="contained"
         onClick={sendMessage}>
          Send
          </Button>       
        </Stack>
      </Stack>
    </Box>
  )
    

}


*/

