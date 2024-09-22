import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter()
    return (
        <div className=" absolute -top-10 bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-2 h-screen">
            <h1 className="text-9xl font-bold text-yellow-500">404</h1>
            <Image
                src="/images/404.png" // Replace with your Pokémon image path
                alt="Sad Pokémon"
                width={300}
                height={300}
                className='scale-150'
            />
                <p className=" -mt-10 text-3xl text-center text-font-disabled max-w-screen-sm leading-normal">
                    It seems the Pokémon you're looking for is missing. Try again!
                </p>
            <div onClick={() => router.push("/")} className='mt-6 '>
                <a className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition">
                    Go Back to Home
                </a>
            </div>
        </div>
    );
}
