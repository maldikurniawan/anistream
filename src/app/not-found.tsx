import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white text-center">
            <div className="text-6xl font-bold">404</div>
            <div className="text-xl my-2 uppercase">Page Not Found</div>
            <Link href={"/"} className="uppercase cursor-pointer bg-white text-black p-1 rounded-md px-2 font-semibold">Go Back</Link>
        </div>
    )
}

export default NotFound