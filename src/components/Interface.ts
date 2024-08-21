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

export type IStatus = "yangi" | "qabul" | "jonatilgan" | "yopilgan";

export interface IBuyurtma {
	id: number | string;
	userId: number | string;
	filialId: number | string;
	manzil: string;
	status: IStatus;
	saqlangan: boolean;
	dostavka: number;
	mahsulotlar: {
		mahsulotId: number | string;
		count: number;
	}[];
}

export interface IHodim {
	id: number | string;
	firstName: string;
	lastName: string;
	phone: string;
	role: string;
}

export interface IRole {
	id: number | string;
	name: string;
}
