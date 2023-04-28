import React from 'react'

function ComingSoon() {
  return (
    <>
    <div
    className="w-full h-screen bg-gradient-to-bl from-orange-500 to-yellow-300 flex flex-col justify-center items-center text-white">
    <h1 className="text-[3rem]"> <b>Viscody</b> </h1>
    <p>Stay tuned for something amazing!!!</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 lg:mt-20">

        <div className="bg-transparent border text-center">
            <p className="text-5xl px-10 py-5">15</p>
            <hr/>
            <p className="px-10 py-5">days</p>
        </div>

        <div className="bg-transparent border text-center">
            <p className="text-5xl px-10 py-5">00</p>
            <hr/>
            <p className="px-10 py-5">hours</p>
        </div>

        <div className="bg-transparent border text-center">
            <p className="text-5xl px-10 py-5">00</p>
            <hr/>
            <p className="px-10 py-5">mins</p>
        </div>
        <div className="bg-transparent border text-center">
            <p className="text-5xl px-10 py-5">00</p>
            <hr/>
            <p className="px-10 py-5">secs</p>
        </div>
    </div>
    
</div>
    </>
  )
}

export default ComingSoon