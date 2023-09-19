import { useState } from 'preact/hooks'
import preactLogo from '/cosa.svg'
import './app.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo cosa" alt="Preact logo" />
        </a>
      </div>
      <h1>THE THING</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.jsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  )
}
