export type Projekt = {
  id: string;
  name: string;
  projektleiter: string;
  beschreibung: string;
  modifiedAt: string;
  modifiedBy: string;
};

export type Kategorie = {
  id: string;
  name: string;
};

export type Geldeinlage = {
  id: string;
  projekt: string;
  bezeichnung: string;
  kategorie: string;
  datum: string;
  geldgeber: string;
  betrag: string;
  notizen: string;
};

export type MockedResponse = {
  status: number;
};
