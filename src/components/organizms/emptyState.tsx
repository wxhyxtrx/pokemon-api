import Image from 'next/image'
import React from 'react'

export default function EmptyState() {
    return (
        <div className=" col-span-6 w-full bg-white px-4 py-20 rounded-lg shadow-lg shadow-divider">
            <div className="w-full flex flex-col items-center justify-center">
                <label className=" font-bold text-4xl text-font-secondary">Oops, I am Sorry</label>
                <Image quality={40} alt="empty" layout="responsive" width={0} height={0} className=" max-w-52 opacity-70" src={"/images/icons/empty.png"} />
                <p className="font-medium max-w-80 text-center text-font-disabled">I don't see your pokemon here, try to write its name correctly.</p>
            </div>
        </div>
    )
}
