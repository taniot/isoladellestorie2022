import { createContext, Dispatch, SetStateAction } from 'react'
import { Languages, TranslationType } from './types'

interface MyContext {
  state?: {
    language: keyof typeof Languages
    isMainMenuOpen: boolean
    translations: TranslationType[]
  }
  setIsMainMenuOpen?: Dispatch<SetStateAction<boolean>>
  setCurrentLanguage?: Dispatch<SetStateAction<keyof typeof Languages>>
  setTranslations?: Dispatch<SetStateAction<TranslationType[]>>
}

const AppContext = createContext<MyContext>({})

export default AppContext
