import Link from "next/link";
import { CompactCountry } from "../lib/api";

interface CountryCardProps {
  country: CompactCountry;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Link href={`/details/${country.alpha3Code}`}>
      <a className="rounded-md shadow-lg max-w-[265px] overflow-hidden">
        <div>
          <img
            src={country.flags.svg}
            alt={country.name}
            className="aspect-[4/3] max-w-full object-cover"
          />
        </div>
        <div className="p-6 space-y-1 dark:bg-dark-blue">
          <h3 className="font-extrabold text-lg mb-4">{country.name}</h3>
          <p>
            <span className="font-bold text-sm">Population:</span>{" "}
            {country.population}
          </p>
          <p>
            <span className="font-bold text-sm">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-bold text-sm">Capital:</span>{" "}
            {country.capital}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default CountryCard;
