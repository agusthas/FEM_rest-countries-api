import axios from "axios";

export interface Country {
  name: string;
  nativeName: string;
  alpha3Code: string;
  flags: {
    svg: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string[];
  currencies: {
    name: string;
    code: string;
  }[];
  languages: {
    name: string;
  }[];
  borders: string[];
}

export type CompactCountry = Pick<
  Country,
  "name" | "flags" | "population" | "region" | "capital" | "alpha3Code"
>;

export type CountryWithBorders = Country & {
  bordersArray: { name: string; alpha3Code: string }[];
};

const fetcher = axios.create({
  baseURL: "https://restcountries.com/v2",
});

export const getCountries = async ({
  region,
  search,
}: {
  region: string;
  search: string;
}): Promise<CompactCountry[]> => {
  if (search) {
    const { data } = await fetcher.get<CompactCountry[]>(
      `/name/${encodeURI(
        search
      )}?fields=name,flags,population,region,capital,alpha3Code`
    );
    return region && region !== "All"
      ? data.filter((country) => country.region === region)
      : data;
  }

  if (region && region !== "All") {
    const { data } = await fetcher.get<CompactCountry[]>(
      `/region/${region}?fields=name,flags,population,region,capital,alpha3Code`
    );
    return data;
  }

  const { data } = await fetcher.get<CompactCountry[]>(
    "/all?fields=name,flags,population,region,capital,alpha3Code"
  );

  return data;
};

export const getCountry = async (code: string): Promise<CountryWithBorders> => {
  const { data: country } = await fetcher.get<Country>(
    `/alpha/${code}?fields=name,nativeName,alpha3Code,flags,population,region,subregion,capital,topLevelDomain,currencies,languages,borders`
  );

  let borders: { name: string; alpha3Code: string }[] = [];
  if (country.borders.length > 0) {
    const { data } = await fetcher.get<{ name: string; alpha3Code: string }[]>(
      `/alpha?codes=${country.borders.join(",")}&fields=name,alpha3Code`
    );
    borders = data;
  }

  return {
    ...country,
    bordersArray: borders,
  };
};
