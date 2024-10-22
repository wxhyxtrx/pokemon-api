import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'
import { CaretLeft } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { usePokemon } from '@/store/hooks/pokemon'
import { RootState } from '@/store/types'
import { useSelector } from 'react-redux'
import ModalBag from './Modals/modalBag'
import { useState } from 'react'

interface IHeaders {
    onSearch: (search: string) => void,
    onRefresh?: () => void,
    title?: string
}

export default function Header({ onSearch, onRefresh, title }: IHeaders) {
    const { managementPokemonState } = usePokemon()
    const pathname = usePathname()
    const router = useRouter()
    const otherPage = pathname?.includes('/pokemon/')
    const myPokemons = managementPokemonState.myPokemons;

    const [openBag, setOpenBag] = useState(false)
    return (
        <div className="flex max-sm:flex-col-reverse items-center gap-5">
            {otherPage && pathname !== "/"
                ? (
                    <div className="flex w-full flex-1 items-center gap-3 bg-white shadow-lg  shadow-divider px-6 py-4 rounded-lg">
                        <button onClick={() => router.push("/")} className="bg-[#ff5350] shadow-lg shadow-[#ff5350] drop-shadow-2xl p-3 rounded-lg">
                            <CaretLeft weight='bold' size={25} color='#ffff' />
                        </button>
                        <label className=' w-full text-center capitalize font-bold text-font-tertiary text-lg sm:text-xl md:text-2xl'>{title}</label>
                    </div>
                )
                : (
                    <div className="flex w-full flex-1 items-center gap-3 bg-white shadow-lg  shadow-divider px-6 py-4 rounded-lg">
                        <Image alt="logo" quality={100} width={50} height={50} src={"/images/logo.png"} />
                        <Input placeholder="Search your pokémon" onChange={(e) => onSearch(e.target.value)} className="border-0 bg-transparent text-font-primary text-lg placeholder:text-font-disabled" />
                        <button onClick={onRefresh} className="bg-[#ff5350] shadow-lg shadow-[#ff5350] drop-shadow-2xl p-3 rounded-lg">
                            <Image alt="deks" src={"/images/icons/dek.png"} quality={100} width={24} height={24} />
                        </button>
                    </div>
                )}
            <div className='flex items-center max-sm:justify-between max-sm:w-full gap-4'>
                <ModalBag
                    open={openBag}
                    onClose={setOpenBag}
                    buttonTrigger={
                        <div className="relative flex items-center gap-4 bg-white shadow-lg  shadow-divider px-4 py-2 rounded-lg">
                            <button className="drop-shadow-2xl p-3 rounded-lg">
                                <Image alt="deks" src={"/images/bag.png"} quality={100} width={40} height={40} className='scale-125' />
                            </button>
                            {myPokemons?.length !== 0 &&
                                <div className='absolute -top-0 right-0 p-1.5 text-xs flex items-center justify-center h-7 w-8 rounded-full bg-red-600 text-white'>
                                    {myPokemons?.length}
                                </div>
                            }
                        </div>
                    }
                />
                <div className="flex items-center gap-4 bg-white shadow-lg  shadow-divider px-4 py-2 rounded-lg">
                    <button className="drop-shadow-2xl p-3 rounded-lg">
                        <Avatar className="bg-font-tertiary p-1">
                            <AvatarImage src="/images/icons/user.png" alt="Pokemon" className=' scale-125' />
                        </Avatar>
                    </button>
                </div>
            </div>
        </div>
    )
}
