import EmptyState from "@/components/organizms/emptyState";
import Header from "@/components/organizms/headers";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { colours } from "@/lib/utils";
import { usePokemon } from "@/store/hooks/pokemon";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";

export default function Home() {
  const { listPokemon } = usePokemon();
  const [dataPokemon, setDataPokemon] = useState<any[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")
  const [counts, setCounts] = useState(0)
  const [limit, setLimit] = useState(12)
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)

  const router = useRouter()

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
    setOffset((page - 1) * limit);
  }, [page, limit]);

  useEffect(() => {
    GetListPokemon();
  }, [search, limit, offset]);

  return (
    <div className="w-full py-10 flex flex-col gap-10">
      <Header onSearch={setSearch} onRefresh={GetListPokemon} />
      {loading
        ?
        <div className="flex flex-col justify-center items-center min-h-80 w-full">
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

        :
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 containers">
          {dataPokemon
            ? dataPokemon?.map((value: any, idx: number) => (
              <div key={idx} onClick={() => router.push(`/pokemon/${value?.name}`)} className="square w-full hover:cursor-pointer hover:scale-105 bg-white px-4 transition-all py-6 rounded-lg shadow-md shadow-divider space-y-3">
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
            : <EmptyState />
          }
        </div>
      }
      {dataPokemon && !loading &&
        <div className=" flex max-sm:items-start justify-between sm:justify-end items-center gap-6">
          <div className=" flex items-center max-sm:flex-col gap-4">
            <label className="font-medium text-font-tertiary max-sm:text-sm">Rows per Page</label>
            <Select onValueChange={(value: string) => setLimit(Number(value))}>
              <SelectTrigger className="w-20 border-opacity-40 shadow-md shadow-divider max-sm:py-3 py-6 font-medium placeholder:font-medium">
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
          <div className=" flex items-center max-sm:flex-col gap-4">
            <label className="font-medium text-font-tertiary max-sm:text-sm">{offset + 1}-{Math.min(offset + limit, counts)} of {counts ?? 0}</label>
            <div className="flex items-center gap-2">
              <Button className="shadow-md shadow-divider max-sm:py-3 py-6" disabled={page === 1} onClick={handlePreviousPage}>Previous</Button>
              <Button className="shadow-md shadow-divider max-sm:py-3 py-6" disabled={page * limit >= counts} onClick={handleNextPage}>Next</Button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
