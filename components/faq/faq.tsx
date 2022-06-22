import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import parse from "html-react-parser";
import { FaqType } from "../../store/types";
import styles from "./faq.module.scss";
const Faq = ({ count, faq }: { count: number; faq: FaqType }) => {
  return (
    <Disclosure
      as="div"
      className={styles.disclosure}
      defaultOpen={count === 0 ? true : false}
    >
      {({ open }: { open: boolean }) => (
        <>
          <Disclosure.Button className={styles.button}>
            <h3>{faq.title}</h3>
            <ChevronUpIcon
              className={classNames(
                `${open ? "rotate-180 transform" : ""}`,
                styles.icon
              )}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className={styles.panel}>
              {parse(faq?.content || "")}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Faq;
