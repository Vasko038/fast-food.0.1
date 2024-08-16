import { IFilial, IMahsulot } from "./Types";

export const AdminData = [
	{
		email: "husan@gmail.com",
		password: "12345678",
	},
	{
		email: "1",
		password: "1",
	},
];

export const FiliallarData: IFilial[] = [
	{
		id: 1,
		nameUz: "Xadra",
		nameRu: "Xadra",
		moljal: "Metro oldida",
		ishVaqt: "09:00 - 20:00",
	},
	{
		id: 2,
		nameUz: "Yunusobod",
		nameRu: "Yunusobod",
		moljal: "Teleminora oldida",
		ishVaqt: "09:00 - 20:00",
	},
	{
		id: 3,
		nameUz: "Maksim Gorkiy",
		nameRu: "Maksim Gorkiy",
		moljal: "Media Park oldida",
		ishVaqt: "09:00 - 20:00",
	},
	{
		id: 1,
		nameUz: "Xadra",
		nameRu: "Xadra",
		moljal: "Metro oldida",
		ishVaqt: "09:00 - 20:00",
	},
	{
		id: 2,
		nameUz: "Yunusobod",
		nameRu: "Yunusobod",
		moljal: "Teleminora oldida",
		ishVaqt: "09:00 - 20:00",
	},
	{
		id: 3,
		nameUz: "Maksim Gorkiy",
		nameRu: "Maksim Gorkiy",
		moljal: "Media Park oldida",
		ishVaqt: "09:00 - 20:00",
	},
	{
		id: 1,
		nameUz: "Xadra",
		nameRu: "Xadra",
		moljal: "Metro oldida",
		ishVaqt: "09:00 - 20:00",
	},
	{
		id: 2,
		nameUz: "Yunusobod",
		nameRu: "Yunusobod",
		moljal: "Teleminora oldida",
		ishVaqt: "09:00 - 20:00",
	},
	{
		id: 3,
		nameUz: "Maksim Gorkiy",
		nameRu: "Maksim Gorkiy",
		moljal: "Media Park oldida",
		ishVaqt: "09:00 - 20:00",
	},
];

function createBuyurtmaData(
  id: number,
  categoryId: number | string,
  name: string,
  narx: number,
  malumot: string
): IMahsulot {
  return { id, categoryId, name, narx, malumot };
}
export const MahsulotData = [];
