"use client"

import EmptyState from '@/components/organizms/emptyState'
import Header from '@/components/organizms/headers'
import { Button } from '@/components/ui/button'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { colours } from '@/lib/utils'
import { usePokemon } from '@/store/hooks/pokemon'
import { Lock } from '@phosphor-icons/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DNA } from 'react-loader-spinner'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

export default function index() {
    const { query, push } = useRouter()
    const { detailPokemon } = usePokemon()

    const pokemonName = query.name
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true);

    const chartData = data?.stats?.map((values: any) => {
        return {
            stats: values.stat.name,
            power: values.base_stat
        };
    })

    const chartConfig = {
        power: {
            label: "Power",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig

    const getDetails = async () => {
        try {
            const result = await detailPokemon(pokemonName)
            setData(result.data)
            console.log(result.data)
        } catch (error) {
            setData(null)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }

    useEffect(() => {
        pokemonName && getDetails()
    }, [pokemonName])

    return (
        <div className="w-full py-10 flex flex-col gap-10">
            {!!pokemonName &&
                <Header onSearch={(string) => string} title={"Detail Pokemon"} />
            }
            {loading
                ? <div className="flex flex-col justify-center items-center min-h-80 w-full">
                    <DNA
                        visible
                        height="120"
                        width="200"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                    <label>Please wait....</label>
                </div>
                : data && !loading
                    ?
                    <>
                        <div className='w-full bg-white shadow-lg grid sm:grid-cols-2 md:grid-cols-4 shadow-divider rounded-lg divide-y-4 divide-x-4 divide-background py-4'>
                            <div className='w-full flex justify-center'>
                                <Image alt="pokemon" quality={100} src={data?.sprites?.front_default ?? "/images/notfound.png"} width={250} height={250} />
                            </div>
                            <div className=' flex flex-col justify-start gap-2 p-10'>
                                <label className='text-2xl font-bold capitalize text-font-tertiary'>{data?.name}</label>
                                <div className="flex items-center gap-2 justify-start ">
                                    {data?.types?.map((item: any, idx: number) => (
                                        <p key={idx} style={{ backgroundColor: colours[item.type.name] }} className={`leading-none text-sm capitalize px-4 py-2 rounded-lg text-white`}>{item.type.name}</p>
                                    ))}
                                </div>
                                <ul className=' space-y-2'>
                                    <li className='flex items-center justify-between gap-1.5'>
                                        <span className='uppercase font-bold text-font-tertiary'>Weight :</span>
                                        <div className=' bg-slate-200 px-3 py-1 w-32 text-center rounded-lg'>
                                            {data?.weight}Kg
                                        </div>
                                    </li>
                                    <li className='flex items-center justify-between gap-1.5'>
                                        <span className='uppercase font-bold text-font-tertiary'>Height :</span>
                                        <div className=' bg-slate-200 px-3 py-1 w-32 text-center rounded-lg'>
                                            {data?.height}m
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div >
                                <ChartContainer
                                    config={chartConfig}
                                    className="mx-auto aspect-square px-10"
                                >
                                    <RadarChart data={chartData}>
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="line" />}
                                        />
                                        <PolarAngleAxis dataKey="stats" className=' capitalize' />
                                        <PolarGrid />
                                        <Radar
                                            dataKey={"power"}
                                            fill={colours[data?.types[0]?.type.name]}
                                            fillOpacity={0.6}
                                        />
                                    </RadarChart>
                                </ChartContainer>
                            </div>
                            <div className='flex flex-col justify-start gap-2 p-10'>
                                <label className='text-2xl font-bold capitalize text-font-tertiary'>abilities</label>
                                <p className=' uppercase font-semibold text-font-tertiary'>Base xp : {data?.base_experience}</p>
                                <div className='flex flex-col gap-2'>
                                    {data?.abilities?.map((value: any, idx: number) => (
                                        <div key={idx} className={` ${value.is_hidden ? " border-red-400 bg-red-50" : "border-slate-500 bg-slate-100"} border px-3 py-1 w-fit rounded-lg capitalize flex items-center gap-2`}>
                                            {value.is_hidden && <Lock weight="duotone" className=' text-red-400' />} {value.ability.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='col-span-4 sm:px-10 flex justify-center max-sm:fixed max-sm:bottom-0 left-0 w-full'>
                            <Button className='flex items-center justify-between gap-5 w-full sm:max-w-screen-sm py-6 font-bold text-xl bg-red-600 hover:bg-red-600/80 text-white max-sm:rounded-none'>
                                <span className='w-full text-end'>Getting</span>
                                <Image alt='btnBall' src={"/images/icons/ball.png"} quality={100} width={80} height={80} />
                                <span className='w-full text-start'>Pokemon</span>
                            </Button>
                        </div>
                    </>
                    : <EmptyState />
            }
        </div>

    )
}
