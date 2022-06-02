import { Menu } from "@headlessui/react";
import Link from "next/link";

const SelectDay = ({
  days,
  selectedDay,
  setSelectedDay,
}: {
  days: any;
  selectedDay: any;
  setSelectedDay: any;
}) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="px-4 py-2 rounded bg-blue-600 text-white ...">
        Options
      </Menu.Button>
      <Menu.Items className="absolute mt-1 right-0">
        <Menu.Item>
          <Link href="/programma/mercoledi-22-giugno-2022/">
            <a>Mercoledì</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/programma/venerdi-1-luglio-2022/">
            <a>Venerdì</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/programma/sabato-2-luglio-2022/">
            <a>Sabato</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/programma/domenica-3-luglio-2022/">
            <a>Domenica</a>
          </Link>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default SelectDay;
