export interface IFilial {
  id: number | string;
  nameUz: string;
  nameRu: string;
  moljal: string;
  ishVaqt: string;
}

export interface IMahsulot {
  id: number;
  categoryId: number | string;
  name: string;
  narx: number;
  malumot: string;
}
