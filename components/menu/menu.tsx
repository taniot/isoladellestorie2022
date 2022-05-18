import { Menu } from "@headlessui/react";

const MenuBar = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="px-4 py-2 rounded bg-blue-600 text-white ...">
        Options
      </Menu.Button>
      <Menu.Items className="absolute mt-1 right-0">
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && "bg-blue-500 text-white"} ...`}
              href="/account-settings"
            >
              Account settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && "bg-blue-500 text-white"} ...`}
              href="/documentation"
            >
              Documentation
            </a>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className="opacity-75 ...">Invite a friend (coming soon!)</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default MenuBar;
