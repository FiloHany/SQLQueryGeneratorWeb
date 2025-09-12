import { useState } from 'react'
import styles from './style.module.css'
import sqlLogo from './assets/sql-server.png'

function App() {
  const [queryDescription, setQueryDescription] = useState("")
  const onSubmit = (e) =>{
    e.preventDefault();
    console.log("form Submited : ", queryDescription)
  }
  return (
    <main className={styles.main}>
      <img src={sqlLogo} alt='' className={styles.icon}></img>
      <h3>Generate SQL with AI</h3>
      <form onSubmit={onSubmit}>
        <input
        type='text'
        name='query-description'
        placeholder='Describe your query'
        onChange={(e) => setQueryDescription(e.target.value)}
        />
        <input type="submit" value='Generate query' />
      </form>
    </main>
  )
}

export default App
