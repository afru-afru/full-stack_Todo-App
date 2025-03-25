import React from 'react'

const page = ({params}) => {
  return (
    <div>
        <h1>How are you?{params.name}</h1>
    </div>
  )
}

export default page