import { createContext, Dispatch, SetStateAction } from "react";

import languageObject from "../languagesObject";
import { EventDay } from "../store/types";

type valueof<T> = T[keyof T];

interface MyContext {
  state?: {
    contents: valueof<typeof languageObject>;
    language: keyof typeof languageObject;
    isMainMenuOpen: boolean;

    guests: any[];
    events: any[];
  };
  setIsMainMenuOpen?: Dispatch<SetStateAction<boolean>>;
  setCurrentLanguage?: Dispatch<SetStateAction<keyof typeof languageObject>>;
}

const AppContext = createContext<MyContext>({});

export default AppContext;
