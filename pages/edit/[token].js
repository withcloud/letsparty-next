import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function EditParty () {
  const router = useRouter()
  const { data, error } = useSWR(`http://localhost:4000/api/get_party?token=${router.query.token}`, fetcher)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (data && data.name) {
      setValue(data.name)
    }
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:4000/api/edit_party?token=${data.token}`, {
      method: 'post',
      body: JSON.stringify({
        name: value
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        router.push(`/party/${data.id}`)
      })
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  // render data
  return (
    <div>
      <form onSubmit={handleSubmit}>
        派對名稱:
        <input type='text' value={value} onChange={handleChange} />
        <input type='submit' value='更新派對' />
      </form>
    </div>
  )
}
