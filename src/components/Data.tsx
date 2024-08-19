import {
	IBuyurtma,
	IFilial,
	IKategoriya,
	IMahsulot,
	IMijoz,
} from "./Interface";
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
export const KategoriyaData: IKategoriya[] = [
	{ id: 1, nameUz: "Fast Food ", nameRu: "Fast Food" },
	{ id: 2, nameUz: "Salad ", nameRu: "Salad" },
	{ id: 3, nameUz: "Ichimlik", nameRu: "Ichimlik" },
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
];

function createMahsulotData(
	id: number,
	categoryId: number | string,
	name: string,
	narx: number,
	malumot: string
): IMahsulot {
	return { id, categoryId, name, narx, malumot };
}

export const MahsulotData: IMahsulot[] = [
	createMahsulotData(
		1,
		1,
		"Cheeseburger",
		15000,
		"Classic cheeseburger with pickles and onions"
	),
	createMahsulotData(
		2,
		1,
		"Chicken Nuggets",
		20000,
		"Crispy chicken nuggets with dipping sauce"
	),
	createMahsulotData(3, 1, "Fries", 12000, "Golden, crispy fries"),
	createMahsulotData(
		4,
		1,
		"Hot Dog",
		18000,
		"Grilled hot dog with mustard and ketchup"
	),
	createMahsulotData(
		5,
		2,
		"Caesar Salad",
		25000,
		"Fresh romaine lettuce with Caesar dressing and croutons"
	),
	createMahsulotData(
		6,
		2,
		"Greek Salad",
		27000,
		"Mixed greens with feta cheese, olives, and cucumbers"
	),
	createMahsulotData(
		7,
		1,
		"Double Cheeseburger",
		32000,
		"Two patties with double cheese and special sauce"
	),
	createMahsulotData(
		8,
		1,
		"Chicken Sandwich",
		22000,
		"Grilled chicken breast with lettuce and mayo"
	),
	createMahsulotData(
		9,
		1,
		"Onion Rings",
		16000,
		"Crispy onion rings with dipping sauce"
	),
	createMahsulotData(
		10,
		3,
		"Milkshake",
		23000,
		"Creamy vanilla milkshake"
	),
	createMahsulotData(
		11,
		3,
		"Soda",
		10000,
		"Refreshing cola or lemon-lime soda"
	),
	createMahsulotData(
		12,
		3,
		"Iced Tea",
		14000,
		"Chilled brewed tea with lemon"
	),
	createMahsulotData(
		13,
		1,
		"Fish Sandwich",
		26000,
		"Breaded fish fillet with tartar sauce"
	),
	createMahsulotData(
		14,
		1,
		"BBQ Ribs",
		55000,
		"Tender ribs with BBQ sauce"
	),
	createMahsulotData(
		15,
		2,
		"Garden Salad",
		22000,
		"Mixed greens with a variety of vegetables"
	),
	createMahsulotData(
		16,
		1,
		"Bacon Cheeseburger",
		29000,
		"Cheeseburger with crispy bacon"
	),
	createMahsulotData(
		17,
		1,
		"Chicken Quesadilla",
		25000,
		"Grilled tortilla with chicken and cheese"
	),
	createMahsulotData(18, 3, "Coffee", 12000, "Hot brewed coffee"),
	createMahsulotData(
		19,
		1,
		"Beef Tacos",
		21000,
		"Tacos with seasoned beef and toppings"
	),
	createMahsulotData(
		20,
		2,
		"Caprese Salad",
		26000,
		"Tomatoes, mozzarella, and basil with balsamic glaze"
	),
	createMahsulotData(
		21,
		1,
		"Pork Sandwich",
		28000,
		"Pulled pork with BBQ sauce on a bun"
	),
	createMahsulotData(
		22,
		1,
		"Veggie Burger",
		22000,
		"Vegetarian burger with lettuce and tomato"
	),
	createMahsulotData(
		23,
		3,
		"Hot Chocolate",
		16000,
		"Rich and creamy hot chocolate"
	),
	createMahsulotData(
		24,
		1,
		"Chicken Wings",
		32000,
		"Spicy chicken wings with dipping sauce"
	),
	createMahsulotData(
		25,
		1,
		"Buffalo Burger",
		27000,
		"Burger with spicy buffalo sauce"
	),
	createMahsulotData(
		26,
		2,
		"Spinach Salad",
		24000,
		"Spinach leaves with nuts and cheese"
	),
	createMahsulotData(
		27,
		1,
		"Sloppy Joes",
		24000,
		"Ground beef with a tangy sauce on a bun"
	),
	createMahsulotData(
		28,
		1,
		"Chicken Burrito",
		29000,
		"Burrito filled with chicken and rice"
	),
	createMahsulotData(
		29,
		3,
		"Lemonade",
		14000,
		"Freshly squeezed lemonade"
	),
	createMahsulotData(
		30,
		3,
		"Smoothie",
		25000,
		"Fruit smoothie with a blend of berries"
	),
];

function createMijozData(
	id: number | string,
	name: string,
	phone: string,
	active: boolean
): IMijoz {
	return { id, name, phone, active };
}

export const MijozlarData: IMijoz[] = [
	createMijozData(1, "Abdulaziz Hakimov", "+998998051435", true),
	createMijozData(2, "Botir Akramov", "+998335146987", false),
	createMijozData(3, "Laziz Erkinov", "+998330086929", true),
	createMijozData(4, "Toshmat Odilov", "+998945789654", false),
	createMijozData(5, "Bahodir Husanov", "+998905472168", true),
];

function createBuyurtmaData(
	id: number | string,
	userId: number | string,
	filialId: number | string,
	manzil: string,
	status: "yangi" | "qabul" | "jonatilgan" | "yopilgan",
	saqlangan: boolean,
	mahsulotlar: {
		mahsulotId: number | string;
		count: number;
	}[]
): IBuyurtma {
	return {
		id,
		userId,
		filialId,
		mahsulotlar,
		manzil,
		status,
		saqlangan,
	};
}

export const BuyurtmalarData: IBuyurtma[] = [
	createBuyurtmaData(
		1,
		1,
		1,
		"Toshkent, Chilonzor",
		"yangi",
		true,
		[
			{ mahsulotId: 10, count: 3 },
			{ mahsulotId: 15, count: 1 },
		]
	),
	createBuyurtmaData(
		2,
		2,
		2,
		"Toshkent, Yunusobod",
		"qabul",
		true,
		[{ mahsulotId: 20, count: 2 }]
	),
	createBuyurtmaData(
		3,
		1,
		3,
		"Toshkent, Sergeli",
		"jonatilgan",
		false,
		[
			{ mahsulotId: 23, count: 5 },
			{ mahsulotId: 25, count: 2 },
		]
	),
	createBuyurtmaData(
		4,
		5,
		1,
		"Toshkent, Olmazor",
		"yopilgan",
		false,
		[
			{ mahsulotId: 1, count: 1 },
			{ mahsulotId: 3, count: 3 },
		]
	),
	createBuyurtmaData(
		5,
		2,
		3,
		"Toshkent, Mirzo Ulug'bek",
		"yangi",
		true,
		[{ mahsulotId: 5, count: 4 }]
	),
	createBuyurtmaData(
		6,
		5,
		2,
		"Toshkent, Shayxontohur",
		"qabul",
		false,
		[
			{ mahsulotId: 26, count: 2 },
			{ mahsulotId: 12, count: 2 },
		]
	),
	createBuyurtmaData(
		7,
		2,
		3,
		"Toshkent, Yakkasaroy",
		"yangi",
		false,
		[{ mahsulotId: 7, count: 1 }]
	),
	createBuyurtmaData(8, 3, 1, "Toshkent, Uchtepa", "yangi", false, [
		{ mahsulotId: 6, count: 3 },
		{ mahsulotId: 29, count: 1 },
	]),
	createBuyurtmaData(
		9,
		4,
		2,
		"Toshkent, Bektemir",
		"jonatilgan",
		true,
		[{ mahsulotId: 30, count: 2 }]
	),
	createBuyurtmaData(
		10,
		4,
		2,
		"Toshkent, Mirobod",
		"yopilgan",
		false,
		[
			{ mahsulotId: 17, count: 5 },
			{ mahsulotId: 3, count: 3 },
		]
	),
];
