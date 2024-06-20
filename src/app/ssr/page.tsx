import React from 'react'

async function getDateTime() {
  const res = await fetch(`https://worldtimeapi.org/api/ip`, { cache: 'no-store' })
  return res.json()
}

export default async function SSR() {
  const result = await getDateTime()
  const dateTime = result.datetime
  return (
    <div>
      <h1>{dateTime}</h1>
    </div>
  )
}