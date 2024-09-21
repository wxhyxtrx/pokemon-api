import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePokemon } from "@/store/hooks/pokemon";
import Image from "next/image";
import { useEffect, useState } from "react";

const colours: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function Home() {
  const { listPokemon } = usePokemon();
  const [dataPokemon, setDataPokemon] = useState<any[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")
  const [counts, setCounts] = useState(0)
  const [limit, setLimit] = useState(12)
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)

  const GetListPokemon = async () => {
    try {
      setLoading(true);
      const resp = await listPokemon(offset.toString(), limit.toString(), search);
      const { data } = resp;
      setDataPokemon(data.pokemon)
      setCounts(data.count)
    } catch (error) {
      setDataPokemon(null)
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (page * limit < counts) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    setOffset((page - 1) * limit); // calculate offset based on current page
  }, [page, limit]);

  useEffect(() => {
    GetListPokemon();
  }, [search, limit, offset]);

  return (
    <div className="w-full py-10 flex flex-col gap-10">
      <div className="flex items-center gap-5">
        <div className="flex flex-1 items-center gap-3 bg-white shadow-lg  shadow-divider px-6 py-4 rounded-lg">
          <Image alt="logo" quality={100} width={50} height={50} src={"/images/logo.png"} />
          <Input placeholder="Search your pokémon" onChange={(e) => setSearch(e.target.value)} className="border-0 bg-transparent text-font-primary text-lg placeholder:text-font-disabled" />
          <button onClick={GetListPokemon} className="bg-[#ff5350] shadow-lg shadow-[#ff5350] drop-shadow-2xl p-3 rounded-lg">
            <Image alt="deks" src={"/images/icons/dek.png"} quality={100} width={24} height={24} />
          </button>
        </div>
        <div className="flex items-center gap-4 bg-white shadow-lg  shadow-divider px-4 py-2 rounded-lg">
          <button onClick={GetListPokemon} className="drop-shadow-2xl p-3 rounded-lg">
            <Image alt="deks" src={"/images/bag.png"} quality={100} width={40} height={40} />
          </button>
        </div>
        <div className="flex items-center gap-4 bg-white shadow-lg  shadow-divider px-4 py-2 rounded-lg">
          <button onClick={GetListPokemon} className="drop-shadow-2xl p-3 rounded-lg">
            <Avatar className="bg-font-primary">
              <AvatarImage src="/images/icons/user.png" alt="Pokemon" />
            </Avatar>
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {dataPokemon
          ? dataPokemon?.map((value: any, idx: number) => (
            <div key={idx} className=" bg-white px-4 py-6 rounded-lg shadow-md shadow-divider space-y-3">
              <div className="flex justify-center">
                <Image alt="pokemon" quality={100} src={value?.sprites?.front_default ?? "/images/notfound.png"} width={150} height={150} />
              </div>
              <div className="text-center space-y-3">
                <div className="font-bold text-font-disabled text-base">{value?.weight} kg</div>
                <label className="font-bold text-font-tertiary text-2xl capitalize">{value?.name}</label>
                <div className="flex items-center gap-2 justify-center ">
                  {value?.types?.map((item: any, idx: number) => (
                    <p key={idx} style={{ backgroundColor: colours[item.type.name] }} className={`leading-none text-sm capitalize px-4 py-2 rounded-lg text-white`}>{item.type.name}</p>
                  ))}
                </div>
              </div>
            </div>
          ))
          : <div className=" col-span-6 w-full bg-white px-4 py-20 rounded-lg shadow-lg shadow-divider">
            <div className="w-full flex flex-col items-center justify-center">
              <label className=" font-bold text-4xl text-font-secondary">Oops, I am Sorry</label>
              <Image quality={40} alt="empty" layout="responsive" width={0} height={0} className=" max-w-52" src={"/images/icons/empty.png"} />
              <p className="font-medium max-w-80 text-center text-font-disabled">I don't see your pokemon here, try to write its name correctly.</p>
            </div>
          </div>
        }
      </div>
      {dataPokemon &&
        <div className=" flex justify-end items-center gap-6">
          <div className=" flex items-center gap-6">
            <label className="font-medium text-font-tertiary">Rows per Page</label>
            <Select onValueChange={(value: string) => setLimit(Number(value))}>
              <SelectTrigger className="w-20 border-opacity-40 shadow-md shadow-divider py-6 font-medium placeholder:font-medium">
                <SelectValue placeholder={limit} className="font-medium placeholder:font-medium" />
              </SelectTrigger>
              <SelectContent className="border-opacity-40 shadow-md shadow-divider">
                <SelectGroup>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="48">48</SelectItem>
                  <SelectItem value="96">96</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className=" flex items-center gap-4">
            <label className="font-medium text-font-tertiary">{offset + 1}-{Math.min(offset + limit, counts)} of {counts ?? 0}</label>
            <Button className="shadow-md shadow-divider py-6" disabled={page === 1} onClick={handlePreviousPage}>Previous</Button>
            <Button className="shadow-md shadow-divider py-6" disabled={page * limit >= counts} onClick={handleNextPage}>Next</Button>
          </div>
        </div>
      }
    </div>
  );
}
