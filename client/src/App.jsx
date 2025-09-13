import { useState, useEffect } from 'react'
import styles from './style.module.css'
import sqlLogo from './assets/sql-server.png'

function App() {
  const [queryDescription, setQueryDescription] = useState("")
  const [messages, setMessages] = useState([])
  const [history, setHistory] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [sidebarVisible, setSidebarVisible] = useState(true)

  useEffect(() => {
    // Load chat history from localStorage on mount
    const savedHistory = localStorage.getItem('chatHistory')
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory)
      setHistory(parsed)
      if (parsed.length > 0) {
        setSelectedChat(parsed[0])
        setMessages(parsed[0].messages)
      }
    }
  }, [])

  useEffect(() => {
    // Save chat history to localStorage on change
    localStorage.setItem('chatHistory', JSON.stringify(history))
  }, [history])

  // Function to get chat title from first user message
  const getChatTitle = (messages) => {
    const firstUserMessage = messages.find(msg => msg.type === 'user')
    if (firstUserMessage) {
      return firstUserMessage.content.length > 30 
        ? firstUserMessage.content.substring(0, 30) + '...'
        : firstUserMessage.content
    }
    return 'New Chat'
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if (!queryDescription.trim()) return;
    
    const userMessage = { type: 'user', content: queryDescription };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setQueryDescription("");
    
    try {
      const generatedQuery = await generateQuery(queryDescription);
      const aiMessage = { type: 'ai', content: generatedQuery };
      const updatedMessages = [...newMessages, aiMessage];
      setMessages(updatedMessages);

      // Save to history
      if (selectedChat) {
        const updatedChat = { 
          ...selectedChat, 
          messages: updatedMessages,
          title: getChatTitle(updatedMessages),
          lastUpdated: Date.now()
        }
        const updatedHistory = history.map(chat => 
          chat.id === selectedChat.id ? updatedChat : chat
        )
        setHistory(updatedHistory)
        setSelectedChat(updatedChat)
      } else {
        const newChat = { 
          id: Date.now(), 
          messages: updatedMessages,
          title: getChatTitle(updatedMessages),
          lastUpdated: Date.now()
        }
        setHistory([newChat, ...history])
        setSelectedChat(newChat)
      }
    } catch (error) {
      console.error('Error generating query:', error)
      const errorMessage = { type: 'ai', content: 'Sorry, there was an error generating the query. Please try again.' }
      const updatedMessages = [...newMessages, errorMessage]
      setMessages(updatedMessages)
    }
  }

  const generateQuery = async (desc) => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: desc }),
    });
    const data = await response.json()
    return data.response.trim();
  };

  const startNewChat = () => {
    setMessages([])
    setSelectedChat(null)
  }

  const selectChat = (chat) => {
    setSelectedChat(chat)
    setMessages(chat.messages)
  }

  const deleteChat = (chatId, e) => {
    e.stopPropagation()
    const updatedHistory = history.filter(chat => chat.id !== chatId)
    setHistory(updatedHistory)
    
    if (selectedChat && selectedChat.id === chatId) {
      if (updatedHistory.length > 0) {
        setSelectedChat(updatedHistory[0])
        setMessages(updatedHistory[0].messages)
      } else {
        setSelectedChat(null)
        setMessages([])
      }
    }
  }

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <div className={styles.app}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${!sidebarVisible ? styles.sidebarHidden : ''}`}>
        <div className={styles.sidebarHeader}>
          <button onClick={startNewChat} className={styles.newChatBtn}>
            <span className={styles.plusIcon}>+</span>
            New chat
          </button>
        </div>
        
        <div className={styles.chatHistory}>
          {history.map(chat => (
            <div 
              key={chat.id} 
              className={`${styles.chatItem} ${chat.id === selectedChat?.id ? styles.selectedChat : ''}`}
              onClick={() => selectChat(chat)}
            >
              <div className={styles.chatTitle}>{chat.title}</div>
              <button 
                className={styles.deleteBtn}
                onClick={(e) => deleteChat(chat.id, e)}
                title="Delete chat"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${styles.main} ${!sidebarVisible ? styles.mainExpanded : ''}`}>
        <button 
          className={styles.sidebarToggle}
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <div className={styles.chatContainer}>
          {messages.length === 0 ? (
            <div className={styles.welcomeScreen}>
              <img src={sqlLogo} alt='' className={styles.icon}></img>
              <h1>Generate SQL with AI</h1>
              <p>Ask me to help you create SQL queries</p>
            </div>
          ) : (
            <div className={styles.messages}>
              {messages.map((msg, index) => (
                <div key={index} className={`${styles.message} ${styles[msg.type + 'Message']}`}>
                  <div className={styles.messageContent}>
                    <pre>{msg.content}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className={styles.inputContainer}>
            <form onSubmit={onSubmit} className={styles.inputForm}>
              <div className={styles.inputWrapper}>
                <input
                  type='text'
                  name='query-description'
                  placeholder='Describe your query...'
                  value={queryDescription}
                  onChange={(e) => setQueryDescription(e.target.value)}
                  className={styles.inputField}
                />
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={!queryDescription.trim()}
                >
                  <span className={styles.sendIcon}>↑</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App