import { createContext, Dispatch, SetStateAction } from "react";
import { EventType, Languages, Translation } from "./types";

interface MyContext {
  state?: {
    language: keyof typeof Languages;
    isMainMenuOpen: boolean;
    events: any[];
    translations: any[];
  };
  setIsMainMenuOpen?: Dispatch<SetStateAction<boolean>>;
  setCurrentLanguage?: Dispatch<SetStateAction<keyof typeof Languages>>;
  setEvents?: Dispatch<SetStateAction<EventType[]>>;
  setTranslations?: Dispatch<SetStateAction<Translation[]>>;
}

const AppContext = createContext<MyContext>({});

export default AppContext;
