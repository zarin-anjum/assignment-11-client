import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-10">
      <button className="btn btn-primary">
        DaisyUI Button 🌼
      </button>
    </div>
  )
}

export default App
