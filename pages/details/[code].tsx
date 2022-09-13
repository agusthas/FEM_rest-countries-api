import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { CountryWithBorders, getCountries, getCountry } from "../../lib/api";

export const getStaticPaths = async () => {
  const countries = await getCountries({ region: "All", search: "" });

  const paths = countries.map((country) => ({
    params: { code: country.alpha3Code },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { code: string };
}) => {
  const code = params.code;
  const country = await getCountry(code);

  return {
    props: {
      country,
    },
  };
};

const Details = ({ country }: { country: CountryWithBorders }) => {
  return (
    <Layout>
      <Head>
        <title>Details | {country.name}</title>
      </Head>
      <Link href="/">
        <a className="inline-flex bg-white dark:bg-dark-blue shadow-lg border dark:border-dark-blue px-6 py-2 gap-2 rounded-sm">
          <ArrowLongLeftIcon className="h-6 w-6" />
          <span>Back</span>
        </a>
      </Link>
      <div className="mt-20 flex flex-col gap-12 lg:gap-32 lg:flex-row w-full justify-between items-center">
        <img
          src={country.flags.svg}
          alt={country.name}
          className="aspect-[4/3] lg:max-w-lg"
        />

        <div className="w-full">
          <h2 className="text-3xl font-black mb-6">{country.name}</h2>
          <div className="flex flex-col gap-12 lg:flex-row justify-between">
            <div className="space-y-4">
              <p className="font-bold">
                Native Name:{" "}
                <span className="font-normal">{country.nativeName}</span>
              </p>
              <p className="font-bold">
                Population:{" "}
                <span className="font-normal">{country.population}</span>
              </p>
              <p className="font-bold">
                Region: <span className="font-normal">{country.region}</span>
              </p>
              <p className="font-bold">
                Sub Region:{" "}
                <span className="font-normal">{country.subregion}</span>
              </p>
              <p className="font-bold">
                Capital: <span className="font-normal">{country.capital}</span>
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-bold">
                Top Level Domain:{" "}
                <span className="font-normal">{country.topLevelDomain}</span>
              </p>
              <p className="font-bold">
                Currencies:{" "}
                <span className="font-normal">
                  {country.currencies.map(({ code }) => code).join(", ")}
                </span>
              </p>
              <p className="font-bold">
                Languages:{" "}
                <span className="font-normal">
                  {country.languages.map(({ name }) => name).join(", ")}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-2">
            <h3 className="font-bold text-lg">Border Countries:</h3>
            <div className="flex flex-wrap gap-2">
              {country.bordersArray.map((border) => (
                <Link
                  href={`/details/${border.alpha3Code}`}
                  key={border.alpha3Code}
                >
                  <a className="bg-white dark:bg-dark-blue shadow-lg border dark:border-dark-blue px-6 py-1 rounded-sm lg:text-sm">
                    {border.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Details;
