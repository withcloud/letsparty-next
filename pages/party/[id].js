import useSWR from 'swr'
import { useRouter } from 'next/router'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Party () {
  const router = useRouter()
  const { data, error } = useSWR(`http://localhost:4000/api/get_party?id=${router.query.id}`, fetcher, {
    refreshInterval: 1000
  })

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const handleJoyClick = () => {
    // alert('喜')
    fetch(`http://localhost:4000/api/edit_party?token=${data.token}`, {
      method: 'post',
      body: JSON.stringify({
        joy: data.joy + 1
      }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const handleAngryClick = () => {
    // alert('怒')
    fetch(`http://localhost:4000/api/edit_party?token=${data.token}`, {
      method: 'post',
      body: JSON.stringify({
        angry: data.angry + 1
      }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const handleSadClick = () => {
    // alert('哀')
    fetch(`http://localhost:4000/api/edit_party?token=${data.token}`, {
      method: 'post',
      body: JSON.stringify({
        sad: data.sad + 1
      }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const handleHappyClick = () => {
    // alert('樂')
    fetch(`http://localhost:4000/api/edit_party?token=${data.token}`, {
      method: 'post',
      body: JSON.stringify({
        happy: data.happy + 1
      }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // render data
  return (
    <div>
      <h1>{data.name}</h1>
      <div>派對觀看連結</div>
      <div>http://localhost:3000/party/{data.id}</div>

      <div>派對編輯連結</div>
      <div>http://localhost:3000/edit/{data.token}</div>

      <div><button onClick={handleJoyClick}>喜 ({data.joy})</button></div>
      <div><button onClick={handleAngryClick}>怒 ({data.angry})</button></div>
      <div><button onClick={handleSadClick}>哀 ({data.sad})</button></div>
      <div><button onClick={handleHappyClick}>樂 ({data.happy})</button></div>
    </div>
  )
}
