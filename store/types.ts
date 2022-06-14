export enum Languages {
  "en",
  "it",
}

export interface PageChildren {
  id: string;
  uri: string;
  template: string;
  dateEventi: string;
}

export interface Page {
  id: string;
  title: string;
  subtitleIt: string;
  subtitleEn: string;
  content: string;
  template: string;
  parent: {
    title: string;
    children: PageChildren[];
  };
  accoglienza: {
    tipologia: string;
  };
  eventi: {
    categoria: string;
    data: string;
  };
}

export interface wpPage {
  id: string;
  uri: string;
  dettagliPagina: {
    template: string;
    dateEventi: string;
  };
  language: {
    slug: string;
  };
}

export interface wpGuest {
  title: string;
  slug: string;
  dettagliOspite: {
    ordinamento: string;
    jobTitleIt: string;
    jobTitleEn: string;
    nome: string;
    cognome: string;
    descrizioneIt: string;
    descrizioneEn: string;
  };
  featuredImage: { node: { guid: string } };
}

export interface GuestType {
  title: string;
  nome: string | null;
  cognome: string | null;
  slug: string | null;
  ordinamento: string;
  image: string | null;
  jobTitleIt: string | null;
  jobTitleEn: string | null;
  descrizioneIt?: string | null;
  descrizioneEn?: string | null;
  eventi: wpEvent[];
}

export interface wpEvent {
  id: string;
  title: string;
  dettaglioEvento: {
    titoloEventoEn: string;
    dataEvento: string;
    oraInizio: string;
    oraFine: string;
    descrizioneEventoIt: string;
    descrizioneEventoEn: string;
    infoEventoIt: string;
    infoEventoEn: string;
    finanziamentoIt: string;
    finanziamentoEn: string;
    eventoPrincipale: boolean;
    nascondiOraInizio: boolean;
    nascondiTitolo: boolean;
    etaRichiesta: string;
    noteEtaRichiesta: string;
    maxIscritti: string;
    prenotazioneOnline: boolean;
  };
  categorieEventi: {
    nodes: wpEventCategorie[];
  };
  tipologieEventi: {
    nodes: wpEventTipologie[];
  };
  luoghiEventi: {
    nodes: wpEventLuoghi[];
  };
}

export type wpEventCategorie = {
  slug: string;
  name: string;
};

export type wpEventTipologie = {
  slug: string;
  name: string;
  dettagliTipologieEvento: {
    nomeTipologiaEn: string;
  };
};

export type wpEventLuoghi = {
  slug: string;
  name: string;
  dettagliLuoghiEvento: {
    nomeLuogoEn: string;
  };
};

export interface EventType {
  id: string;
  title: string;
  titleEn: string;
  data: string;
  oraInizio: string;
  oraFine: string;
  descrizioneIt: string;
  descrizioneEn: string;
  infoIt: string;
  infoEn: string;
  finanziamentoIt: string;
  finanziamentoEn: string;
  dataOrd: number;
  dataOrdFine: number;
  dataOrdA: number;
  dataOrdB: number;
  categoria: string;
  tipologia: string;
  luogo: string;
  categoriaName: string;
  tipologiaName: string;
  tipologiaNameEn: string;
  luogoName: string;
  luogoNameEn: string;
  eventoPrincipale: boolean;
  nascondiOraInizio: boolean;
  nascondiTitolo: boolean;
  etaRichiesta: string;
  noteEtaRichiesta: string;
  maxIscritti: string;
  prenotazioneOnline: boolean;
}

export type EventTypeGroups = {
  luogo: string;
  tipologia: string;
  luogoName: string | null;
  luogoNameEn: string | null;
  tipologiaName: string | null;
  tipologiaNameEn: string | null;
};

export type EventTypeTimeGroups = {
  oraInizio: string;
  oraFine: string;
};

export type wpPlace = {
  id: string;
  title: string;
  dettagliAccoglienza: {
    indirizzo: string;
    email: string;
    telefono1: string;
    telefono2: string;
    sitoWeb: string;
  };
  cittaLuoghi: {
    nodes: wpPlaceCitta[];
  };
  tipologieLuoghi: {
    nodes: wpPlaceTipologia[];
  };
};

export type wpPlaceCitta = {
  name: string;
  slug: string;
  dettagliCitta: {
    distanzaGavoi: string;
  };
};

export type wpPlaceTipologia = {
  slug: string;
};

export type PlaceType = {
  id: string;
  title: string;
  address: string | null;
  email: string | null;
  phone1: string | null;
  phone2: string | null;
  web: string | null;
  city: wpPlaceCitta;
  tipologie: string[];
};

export type PlaceGroupType = {
  luogo: string;
  slug: string;
  distanza: string;
};

export interface PartnerType {
  title: string;
  image: string;
  link: string;
  type: string;
  order: string;
}

export type wpPartner = {
  title: string;
  menuOrder: number;
  tipologieSponsor: { nodes: wpPartnerTipologie[] };
  dettagliSponsor: wpPartnerDettagli;
  featuredImage: { node: wpPartnerImage };
};

export type wpPartnerTipologie = {
  slug: string;
};
export type wpPartnerDettagli = {
  sponsorLink: string;
};
export type wpPartnerImage = {
  guid: string;
};

export type wpNews = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  dettagliArticoli: {
    comunicatoStampa: {
      guid: string;
    };
  };
  featuredImage: {
    node: {
      guid: string;
      caption: string;
    };
  };
};

export interface TranslationType {
  id: string;
  title: string;
  slug: string | null;
  link: {
    url: string;
  };
  language: string | null;
}
export type wpTranslation = {
  id: string;
  title: string;
  dettagliTraduzioni: {
    slugTraduzione: string;
    linkTraduzione: string;
  };
  language: {
    slug: string;
  };
};
