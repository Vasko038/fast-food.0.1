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

export const MahsulotData: IMahsulot[] = [
  createBuyurtmaData(
    1,
    1,
    "Cheeseburger",
    15000,
    "Classic cheeseburger with pickles and onions"
  ),
  createBuyurtmaData(
    2,
    1,
    "Chicken Nuggets",
    20000,
    "Crispy chicken nuggets with dipping sauce"
  ),
  createBuyurtmaData(3, 1, "Fries", 12000, "Golden, crispy fries"),
  createBuyurtmaData(
    4,
    1,
    "Hot Dog",
    18000,
    "Grilled hot dog with mustard and ketchup"
  ),
  createBuyurtmaData(
    5,
    2,
    "Caesar Salad",
    25000,
    "Fresh romaine lettuce with Caesar dressing and croutons"
  ),
  createBuyurtmaData(
    6,
    2,
    "Greek Salad",
    27000,
    "Mixed greens with feta cheese, olives, and cucumbers"
  ),
  createBuyurtmaData(
    7,
    1,
    "Double Cheeseburger",
    32000,
    "Two patties with double cheese and special sauce"
  ),
  createBuyurtmaData(
    8,
    1,
    "Chicken Sandwich",
    22000,
    "Grilled chicken breast with lettuce and mayo"
  ),
  createBuyurtmaData(
    9,
    1,
    "Onion Rings",
    16000,
    "Crispy onion rings with dipping sauce"
  ),
  createBuyurtmaData(10, 3, "Milkshake", 23000, "Creamy vanilla milkshake"),
  createBuyurtmaData(
    11,
    3,
    "Soda",
    10000,
    "Refreshing cola or lemon-lime soda"
  ),
  createBuyurtmaData(12, 3, "Iced Tea", 14000, "Chilled brewed tea with lemon"),
  createBuyurtmaData(
    13,
    1,
    "Fish Sandwich",
    26000,
    "Breaded fish fillet with tartar sauce"
  ),
  createBuyurtmaData(14, 1, "BBQ Ribs", 55000, "Tender ribs with BBQ sauce"),
  createBuyurtmaData(
    15,
    2,
    "Garden Salad",
    22000,
    "Mixed greens with a variety of vegetables"
  ),
  createBuyurtmaData(
    16,
    1,
    "Bacon Cheeseburger",
    29000,
    "Cheeseburger with crispy bacon"
  ),
  createBuyurtmaData(
    17,
    1,
    "Chicken Quesadilla",
    25000,
    "Grilled tortilla with chicken and cheese"
  ),
  createBuyurtmaData(18, 3, "Coffee", 12000, "Hot brewed coffee"),
  createBuyurtmaData(
    19,
    1,
    "Beef Tacos",
    21000,
    "Tacos with seasoned beef and toppings"
  ),
  createBuyurtmaData(
    20,
    2,
    "Caprese Salad",
    26000,
    "Tomatoes, mozzarella, and basil with balsamic glaze"
  ),
  createBuyurtmaData(
    21,
    1,
    "Pork Sandwich",
    28000,
    "Pulled pork with BBQ sauce on a bun"
  ),
  createBuyurtmaData(
    22,
    1,
    "Veggie Burger",
    22000,
    "Vegetarian burger with lettuce and tomato"
  ),
  createBuyurtmaData(
    23,
    3,
    "Hot Chocolate",
    16000,
    "Rich and creamy hot chocolate"
  ),
  createBuyurtmaData(
    24,
    1,
    "Chicken Wings",
    32000,
    "Spicy chicken wings with dipping sauce"
  ),
  createBuyurtmaData(
    25,
    1,
    "Buffalo Burger",
    27000,
    "Burger with spicy buffalo sauce"
  ),
  createBuyurtmaData(
    26,
    2,
    "Spinach Salad",
    24000,
    "Spinach leaves with nuts and cheese"
  ),
  createBuyurtmaData(
    27,
    1,
    "Sloppy Joes",
    24000,
    "Ground beef with a tangy sauce on a bun"
  ),
  createBuyurtmaData(
    28,
    1,
    "Chicken Burrito",
    29000,
    "Burrito filled with chicken and rice"
  ),
  createBuyurtmaData(29, 3, "Lemonade", 14000, "Freshly squeezed lemonade"),
  createBuyurtmaData(
    30,
    3,
    "Smoothie",
    25000,
    "Fruit smoothie with a blend of berries"
  ),
];
