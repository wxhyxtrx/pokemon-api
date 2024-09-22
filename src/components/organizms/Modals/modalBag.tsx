import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { usePokemon } from '@/store/hooks/pokemon'
import { IBagPokemons } from '@/store/types/pokemonType'
import { Trash } from '@phosphor-icons/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

interface IModal {
    open: boolean,
    onClose: (state: boolean) => void
    buttonTrigger: ReactNode
}

export default function ModalBag({ buttonTrigger, open, onClose }: IModal) {
    const { managementPokemonState, deletePokemon } = usePokemon()
    const { toast } = useToast()
    const router = useRouter()
    const { myPokemons } = managementPokemonState

    const [dataBag, setDataBag] = useState<IBagPokemons[] | undefined>([])

    const handleDelete = async (pokemon: string) => {
        const result = await deletePokemon(pokemon)
        const { code, message, data } = result
        if (code === 200) {
            setDataBag(data)
            toast({
                title: message,
            })
        } else {
            toast({
                variant: "destructive",
                title: message,
            })
        }
    }

    useEffect(() => {
        if (open) setDataBag(myPokemons)
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogTrigger asChild>
                {buttonTrigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Bag: Your Pokémon List!</DialogTitle>
                    <DialogDescription>
                        Keep track of all the Pokémon you own in this bag. Each Pokémon is ready for your next adventure!
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className=' max-h-80 min-h-80 '>
                    {dataBag?.length == 0
                        ?
                        <div className='flex flex-col justify-center items-center gap-6 py-10'>
                            <Image alt='pokemon' src={"/images/icons/ball.png"} width={100} height={100} className='rounded-full opacity-90' />
                            <p className='text-center max-w-80 text-sm text-font-secondary'>Your Pokémon bag is currently empty. Time to set out on an adventure and catch some new friends! Let the journey begin!</p>
                        </div>
                        :
                        dataBag?.map((value: IBagPokemons, idx: number) => (
                            <div key={idx} className='bg-background px-5 py-3 rounded-lg border border-divider/60 flex items-center gap-3 my-3'>
                                <Image alt='pokemon' src={value.image} width={50} height={50} className='rounded-full scale-150' />
                                <div onClick={() => router.push(`/pokemon/${value.pokemon}`)} className='flex cursor-pointer flex-1 flex-col text-start gap-1 justify-start items-start'>
                                    <div onClick={() => router.push(`/pokemon/${value.pokemon}`)} className='w-full leading-none text-start font-bold text-font-tertiary'>{value.name}</div>
                                    <div onClick={() => router.push(`/pokemon/${value.pokemon}`)} className='w-full leading-none text-start text-font-secondary text-sm'>{value.pokemon}</div>
                                </div>
                                <Button onClick={() => handleDelete(value.pokemon)} className='text-xl text-red-600 hover:text-red-600' variant={"ghost"}><Trash /></Button>
                            </div>
                        ))
                    }
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
