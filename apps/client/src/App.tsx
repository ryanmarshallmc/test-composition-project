import { useEffect, useState } from 'react'

const apiUrl = import.meta.env.VITE_API_URL ?? ''

export function App() {
  const [message, setMessage] = useState('loading...')

  useEffect(() => {
    fetch(`${apiUrl}/ping`)
      .then((res) => res.json())
      .then((data: { message: string }) => setMessage(data.message))
      .catch(() => setMessage('error'))
  }, [])

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <p>ping → {message}</p>
    </main>
  )
}
