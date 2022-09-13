import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export interface SelectItem {
  name: string;
}

interface SelectProps<T> {
  list: T[];
  value: T;
  onChange: (value: T) => void;
}

function Select<T extends SelectItem>({
  list,
  value,
  onChange,
}: SelectProps<T>) {
  return (
    <div>
      <Listbox value={value ?? null} onChange={onChange}>
        <div className="relative font-semibold">
          <Listbox.Button className="min-w-[245px] cursor-pointer flex bg-white dark:bg-dark-blue rounded-lg py-4 px-6 shadow-md items-center justify-between text-sm focus:outline-none">
            <span className="block pointer-events-none">{value.name}</span>
            <ChevronDownIcon
              className="h-4 w-4 pointer-events-none"
              aria-hidden="true"
            />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 cursor-pointer min-w-[245px] py-2 overflow-auto rounded-md shadow-lg bg-white dark:bg-dark-blue text-sm">
            {list.map((v, idx) => (
              <Listbox.Option
                key={idx}
                value={v}
                className={({ active, selected }) =>
                  `cursor-pointer select-none py-2 px-6 ${
                    active && "text-gray-900 bg-gray-200"
                  } ${selected && "text-gray-900 bg-gray-200 font-bold"}`
                }
              >
                <span>{v.name}</span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

export default Select;
