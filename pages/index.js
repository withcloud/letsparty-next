import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home () {
  const { data, error } = useSWR('http://localhost:4000/api/get_parties', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // render data
  return (
    <div>
      <ul>
        {data.map(party => {
          return <li key={party.id}><Link href={`/party/${party.id}`}><a>{party.name}</a></Link></li>
        })}
      </ul>
      <Link href='/new'><a>新增派對</a></Link>
    </div>
  )
}
