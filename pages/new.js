import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NewParty () {
  const router = useRouter()
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('你的派對已經新增了: ' + value)

    fetch('http://localhost:4000/api/create_party', {
      method: 'post',
      body: JSON.stringify({
        name: value
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        router.push(`/party/${result.id}`)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        派對名稱:
        <input type='text' value={value} onChange={handleChange} />
        <input type='submit' value='新增派對' />
        <Link href='/'><a>返回</a></Link>
      </form>
    </div>
  )
}
