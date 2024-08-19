export interface IFilial {
  id: number | string;
  nameUz: string;
  nameRu: string;
  moljal: string;
  ishVaqt: string;
}

export interface IMahsulot {
  id: number | string;
  categoryId: number | string;
  name: string;
  narx: number;
  image?: "string";
  malumot: string;
}
export interface IKategoriya {
  id: number | string;
  nameUz: string;
  nameRu: string;
}

export interface IMijoz {
  id: number | string;
  name: string;
  phone: string;
  active: boolean;
}
