import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";
import { useState } from "react";

import styles from "./selectDay.module.scss";

const days = [
  {
    id: 1,
    day: "2022-06-22",
    textIT: "Mercoledì 22 Giugno",
    unavailable: false,
  },
  {
    id: 2,
    day: "2022-07-01",
    textIT: "Venerdì 1 Luglio",
    unavailable: false,
  },
  {
    id: 3,
    day: "2022-07-02",
    textIT: "Sabato 2 Luglio",
    unavailable: false,
  },
  {
    id: 4,
    day: "2022-07-03",
    textIT: "Domenica 3 Luglio",
    unavailable: false,
  },
];

const SelectDay = () => {
  const [selectedDay, setSelectedDay] = useState(days[0]);
  return (
    <div>
      <Listbox value={selectedDay} onChange={setSelectedDay}>
        <div>
          <Listbox.Button className={styles.button}>
            <span className={styles.selected}>{selectedDay.textIT}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-white-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {days.map((day) => (
                <Listbox.Option
                  key={day.id}
                  value={day}
                  disabled={day.unavailable}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                >
                  {day.textIT}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectDay;
