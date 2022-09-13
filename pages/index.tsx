import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CountryCard from "../components/CountryCard";
import Layout from "../components/Layout";
import Select, { SelectItem } from "../components/Select";
import { getCountries } from "../lib/api";
import { useDebouncedState } from "@mantine/hooks";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

const regions: SelectItem[] = [
  { name: "All" },
  { name: "Africa" },
  { name: "Americas" },
  { name: "Asia" },
  { name: "Europe" },
  { name: "Oceania" },
];

export const getStaticProps = async () => {
  const countries = await getCountries({ region: "All", search: "" });

  return { props: { countries } };
};

const Home = ({
  countries,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [search, setSearch] = useDebouncedState("", 500);
  const [selectedRegion, setSelectedRegion] = useState<SelectItem>(regions[0]);
  const { data } = useQuery(
    [
      "countries",
      {
        region: selectedRegion.name,
        search,
      },
    ],
    () =>
      getCountries({
        region: selectedRegion.name,
        search,
      }),
    {
      initialData: countries,
    }
  );

  return (
    <Layout>
      <Head>
        <title>Where in the world?</title>
      </Head>
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-0 lg:items-center lg:justify-between text-dark-gray dark:text-very-light-gray">
        <div className="flex-1 relative shadow-md max-w-md">
          <div className="flex absolute inset-y-0 left-0 items-center pl-8 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 font-bold" />
          </div>
          <input
            type="search"
            id="search"
            placeholder="Search for a country..."
            className="block w-full rounded-md text-sm border-none p-4 pl-16 placeholder-dark-gray/50 placeholder:font-semibold focus:ring-very-dark-blue-dark dark:bg-dark-blue dark:placeholder-very-light-gray/50"
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </div>

        <Select
          list={regions}
          value={selectedRegion}
          onChange={(value) => setSelectedRegion(value)}
        />
      </div>
      <div className="px-5 py-10 flex flex-wrap gap-10 flex-col lg:flex-row lg:gap-16 lg:px-0">
        {!data ? (
          <div>Loading...</div>
        ) : (
          <>
            {data.map((country) => (
              <CountryCard key={country.name} country={country} />
            ))}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
