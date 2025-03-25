import React from 'react'
import sampleimage from '../assets/todoimage.jpg'
import Image from 'next/image'

const page = () => {
  return (
    <div>

<Image src={sampleimage} alt='sampleimage' width={500}/>

    </div>
  )
}

export default page