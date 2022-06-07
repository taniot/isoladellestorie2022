export type EventDay = {
  id: number;
  day: string;
  textIT: string;
  unavailable: boolean;
};

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
  content: string;
  template: string;
  parent: {
    title: string;
    children: PageChildren;
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

export interface Guest {
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
  eventi: any[];
}

export interface Event {}

export interface Partner {}

export interface News {}

export interface Translation {}
