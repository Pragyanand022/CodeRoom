import React from 'react'
import RoomEntryCard from '../components/RoomEntryCard'

function Home() {
  
  
  return (
    <div className='flex flex-col justify-center items-center min-h-[100vh] lg:gap-[50px] lg:flex-row '>
        <div className="flex-1 homeImage flex items-center justify-center">
            <img src="./images/homeImage.png" alt="homeImage" className='h-[300px] w-[300px] lg:h-[400px] lg:w-[400px]' />
        </div>
        <div className="flex-1 roomEntry flex flex-col gap-3 items-center justify-center lg:mr-10 -top-20 lg:-top-5 relative lg:gap-5 w-full">
            <div className="home_title flex flex-row gap-4">
                <img src="./images/title_logo.png" alt="title_logo" className='w-15 h-15'/>
                <h2 className='font-extrabold text-5xl text-shadow-[2px_2px_3px_skyBlue] mt-3'><span className='hidden lg:inline-block mr-4 relative -top-1.5'> | </span>Coderoom</h2>
            </div>
            <RoomEntryCard/>
        </div>
    </div>
  )
}

export default Home