import React from 'react'

function HomeSection() {
  return (
    <>
    <div
    className="flex flex-col items-center justify-center w-full h-screen my-3 text-white bg-gradient-to-bl from-black to-red-500">
    <h1 className="text-[3rem]"> <b>Viscody</b> </h1>
    <p>Stay tuned for something amazing!!!</p>

    <div className="grid grid-cols-1 gap-10 mt-10 sm:grid-cols-2 lg:grid-cols-4 lg:mt-20">

        <div className="text-center bg-transparent border">
            <p className="px-10 py-5 text-5xl">15</p>
            <hr/>
            <p className="px-10 py-5">days</p>
        </div>

        <div className="text-center bg-transparent border">
            <p className="px-10 py-5 text-5xl">00</p>
            <hr/>
            <p className="px-10 py-5">hours</p>
        </div>

        <div className="text-center bg-transparent border">
            <p className="px-10 py-5 text-5xl">00</p>
            <hr/>
            <p className="px-10 py-5">mins</p>
        </div>
        <div className="text-center bg-transparent border">
            <p className="px-10 py-5 text-5xl">00</p>
            <hr/>
            <p className="px-10 py-5">secs</p>
        </div>
    </div>
    
</div>
    </>
  )
}

export default HomeSection