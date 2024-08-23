import {
	IBasket,
	IBuyurtma,
	IFilial,
	IHodim,
	IKategoriya,
	IMahsulot,
	IMijoz,
	IRole,
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
	image: string,
	malumot: string
): IMahsulot {
	return { id, categoryId, name, narx, malumot, image };
}

export const MahsulotData: IMahsulot[] = [
	createMahsulotData(
		1,
		1,
		"Cheeseburger",
		15000,
		"https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg",
		"Classic cheeseburger with pickles and onions"
	),
	createMahsulotData(
		2,
		1,
		"Chicken Nuggets",
		20000,
		"https://lilluna.com/wp-content/uploads/2023/07/chicken-nuggets3-resize-13-500x500.jpg",
		"Crispy chicken nuggets with dipping sauce"
	),
	createMahsulotData(
		3,
		1,
		"Fries",
		12000,
		"https://www.budgetbytes.com/wp-content/uploads/2023/12/air-fryer-french-fries-horizontal-hero-web-ready-1.jpg",
		"Golden, crispy fries"
	),
	createMahsulotData(
		4,
		1,
		"Hot Dog",
		18000,
		"https://img.freepik.com/free-photo/classic-hot-dog-with-ketchup-and-mustard-sauce-isolated-on-white-background_123827-29747.jpg?w=996&t=st=1724417795~exp=1724418395~hmac=2c3e2c53922275bf3319971010dce702ba9cfd4fe9433f0aa613f8dc8a314e6d",
		"Grilled hot dog with mustard and ketchup"
	),
	createMahsulotData(
		5,
		2,
		"Caesar Salad",
		25000,
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUzUL3OOhsIQfQKVnYTjcOjHEfPTRconrtGw&s",
		"Fresh romaine lettuce with Caesar dressing and croutons"
	),
	createMahsulotData(
		6,
		2,
		"Greek Salad",
		27000,
		"https://www.wellplated.com/wp-content/uploads/2022/05/Greek-Salad-Recipe-Easy.jpg",
		"Mixed greens with feta cheese, olives, and cucumbers"
	),
	createMahsulotData(
		7,
		1,
		"Double Cheeseburger",
		32000,
		"https://s7d1.scene7.com/is/image/mcdonalds/DC_202201_3426-005_DoubleQuarterPounderwithCheese_1564x1564-1:nutrition-calculator-tile?resmode=sharp2",
		"Two patties with double cheese and special sauce"
	),
	createMahsulotData(
		8,
		1,
		"Chicken Sandwich",
		22000,
		"https://static01.nyt.com/images/2021/07/06/dining/yk-muhammara-chicken-sandwiches/merlin_189026502_58171dd4-b0bc-47c3-aa6a-d910a3f1de4c-superJumbo.jpg",
		"Grilled chicken breast with lettuce and mayo"
	),
	createMahsulotData(
		9,
		1,
		"Onion Rings",
		16000,
		"https://houseofnasheats.com/wp-content/uploads/2023/03/Homemade-Onion-Rings-Square-1-500x500.jpg",
		"Crispy onion rings with dipping sauce"
	),
	createMahsulotData(
		10,
		3,
		"Milkshake",
		23000,
		"https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipes%2F2020-07-how-to-make-a-milkshake-at-home%2F2020-06-08_AT-K19388",
		"Creamy vanilla milkshake"
	),
	createMahsulotData(
		11,
		3,
		"Soda",
		10000,
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS20rkmzwogqaxwoSv9EvM9TM8HfmhrfWyQDw&s",
		"Refreshing cola or lemon-lime soda"
	),
	createMahsulotData(
		12,
		3,
		"Iced Tea",
		14000,
		"https://www.everydaycheapskate.com/wp-content/uploads/20240705-how-to-make-iced-tea-glass-with-ice-cubes-and-sliced-and-whole-lemons.png",
		"Chilled brewed tea with lemon"
	),
	createMahsulotData(
		13,
		1,
		"Fish Sandwich",
		26000,
		"https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgxMzQ3Nzk0Mjk3OTgx/crispy-oven-fried-fish-sandwich_ftr.jpg",
		"Breaded fish fillet with tartar sauce"
	),
	createMahsulotData(
		14,
		1,
		"BBQ Ribs",
		55000,
		"https://www.southernliving.com/thmb/sQ3jAjFAP-SPt_upe-Im4rxMKrQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/oven-baked-baby-back-ribs-beauty-332_preview-34579f7f15ed4548ae3bb5b2048aab60.jpg",
		"Tender ribs with BBQ sauce"
	),
	createMahsulotData(
		15,
		2,
		"Garden Salad",
		22000,
		"https://garlicsaltandlime.com/wp-content/uploads/2022/07/Garden-salad-thumbnail.jpg",
		"Mixed greens with a variety of vegetables"
	),
	createMahsulotData(
		16,
		1,
		"Bacon Cheeseburger",
		29000,
		"https://recipes.net/wp-content/uploads/2023/05/hardees-western-bacon-cheeseburger-recipe_275efaf08b16d7c99c6649c002e1a403.jpeg",
		"Cheeseburger with crispy bacon"
	),
	createMahsulotData(
		17,
		1,
		"Chicken Quesadilla",
		25000,
		"https://cookingformysoul.com/wp-content/uploads/2019/02/feat2-chicken-quesadillas-500x500.jpg",
		"Grilled tortilla with chicken and cheese"
	),
	createMahsulotData(
		18,
		3,
		"Coffee",
		12000,
		"https://shantikitchens.com/wp-content/uploads/2024/03/Coffee.jpg",
		"Hot brewed coffee"
	),
	createMahsulotData(
		19,
		1,
		"Beef Tacos",
		21000,
		"https://loveandgoodstuff.com/wp-content/uploads/2020/08/classic-ground-beef-tacos-1200x1200.jpg",
		"Tacos with seasoned beef and toppings"
	),
	createMahsulotData(
		20,
		2,
		"Caprese Salad",
		26000,
		"https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/07/Caprese-Salad-main-1.jpg",
		"Tomatoes, mozzarella, and basil with balsamic glaze"
	),
	createMahsulotData(
		21,
		1,
		"Pork Sandwich",
		28000,
		"https://keviniscooking.com/wp-content/uploads/2023/04/Southern-Pulled-Pork-Sandwich-square.jpg",
		"Pulled pork with BBQ sauce on a bun"
	),
	createMahsulotData(
		22,
		1,
		"Veggie Burger",
		22000,
		"https://www.noracooks.com/wp-content/uploads/2023/04/veggie-burgers-1-2.jpg",
		"Vegetarian burger with lettuce and tomato"
	),
	createMahsulotData(
		23,
		3,
		"Hot Chocolate",
		16000,
		"https://cdn.accentuate.io/559865036979/4504505778223/French-Hot-Chocolate-v1687403187259.jpg?1200x900",
		"Rich and creamy hot chocolate"
	),
	createMahsulotData(
		24,
		1,
		"Chicken Wings",
		32000,
		"https://www.allrecipes.com/thmb/AtViolcfVtInHgq_mRtv4tPZASQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-187822-baked-chicken-wings-4x3-5c7b4624c8554f3da5aabb7d3a91a209.jpg",
		"Spicy chicken wings with dipping sauce"
	),
	createMahsulotData(
		25,
		1,
		"Buffalo Burger",
		27000,
		"https://buffaloburger.com/_next/image?url=https%3A%2F%2Fbuffalonlineorderingprod.s3-accelerate.amazonaws.com%2Fmenu_items%2Fd845c9309b0d95d8c5d945b6b2552491.png&w=384&q=75",
		"Burger with spicy buffalo sauce"
	),
	createMahsulotData(
		26,
		2,
		"Spinach Salad",
		24000,
		"https://cdn.loveandlemons.com/wp-content/uploads/2023/11/spinach-salad.jpg",
		"Spinach leaves with nuts and cheese"
	),
	createMahsulotData(
		27,
		1,
		"Sloppy Joes",
		24000,
		"https://www.tasteofhome.com/wp-content/uploads/2018/01/Sloppy-Joes-Sandwiches_EXPS_DIYD19_31740_B05_14_2b.jpg",
		"Ground beef with a tangy sauce on a bun"
	),
	createMahsulotData(
		28,
		1,
		"Chicken Burrito",
		29000,
		"https://www.mynourishedhome.com/wp-content/uploads/2019/11/burritos-800x800.jpg",
		"Burrito filled with chicken and rice"
	),
	createMahsulotData(
		29,
		3,
		"Lemonade",
		14000,
		"https://lmld.org/wp-content/uploads/2022/04/Lemonade-4-500x375.jpg",
		"Freshly squeezed lemonade"
	),
	createMahsulotData(
		30,
		3,
		"Smoothie",
		25000,
		"https://www.budgetbytes.com/wp-content/uploads/2023/12/Mixed-Berry-Smoothie-Side.jpg",
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
	createMijozData(3, "Laziz Erkinjonov", "+998330086929", true),
	createMijozData(4, "Toshmat Odilov", "+998945789654", false),
	createMijozData(5, "Bahodir Husanov", "+998905472168", true),
];

function createBuyurtmaData(
  id: number | string,
  userId: number | string,
  filialId: number | string,
  manzil: string,
  date: string,
  status: "yangi" | "qabul" | "jonatilgan" | "yopilgan",
  saqlangan: boolean,
  dostavka: number,
  hodimId: number,
  mahsulotlar: {
    mahsulotId: number | string;
    count: number;
  }[]

): IBuyurtma {
	return {
		id,
		userId,
		filialId,
		manzil,
		status,
		saqlangan,
		dostavka,
		hodimId,
		mahsulotlar,
		date,
	};
}

export const BuyurtmalarData: IBuyurtma[] = [
  createBuyurtmaData(
    1,
    1,
    1,
    "Toshkent, Chilonzor",
    "2024/08/10 12:02",
    "jonatilgan",
    true,
    5000,
    1,
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
    "2024/08/10 11:02",
    "qabul",
    true,
    5000,
    1,
    [{ mahsulotId: 20, count: 2 }]
  ),
  createBuyurtmaData(
    3,
    3,
    3,
    "Toshkent, Sergeli",
    "2024/08/10 11:02",
    "jonatilgan",
    false,
    5000,
    3,
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
    "2024/08/10 17:32",
    "yopilgan",
    false,
    5000,
    2,
    [
      { mahsulotId: 1, count: 1 },
      { mahsulotId: 3, count: 3 },
    ]
  ),
  createBuyurtmaData(
    5,
    4,
    3,
    "Toshkent, Mirzo Ulug'bek",
    "2024/08/10 12:59",
    "yangi",
    true,
    5000,
    2,
    [{ mahsulotId: 5, count: 4 }]
  ),
  createBuyurtmaData(
    6,
    5,
    2,
    "Toshkent, Shayxontohur",
    "2024/08/10 07:09",
    "qabul",
    false,
    5000,
    3,
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
    "2024/08/10 05:02",
    "yangi",
    false,

    5000,
    3,
    [{ mahsulotId: 7, count: 1 }]
  ),
  createBuyurtmaData(
    8,
    3,
    1,
    "Toshkent, Uchtepa",
    "2024/08/10 15:44",
    "yangi",
    false,
    5000,
    1,
    [
      { mahsulotId: 6, count: 3 },
      { mahsulotId: 29, count: 1 },
    ]
  ),
  createBuyurtmaData(
    9,
    4,
    2,
    "Toshkent, Bektemir",
    "2024/08/10 13:45",
    "jonatilgan",
    true,
    5000,
    2,
    [{ mahsulotId: 30, count: 2 }]
  ),
  createBuyurtmaData(
    10,
    4,
    2,
    "Toshkent, Mirobod",
    "2024/08/10 13:07",
    "yopilgan",
    false,
    5000,
    1,
    [
      { mahsulotId: 17, count: 5 },
      { mahsulotId: 3, count: 3 },
    ]
  )
];

function createHodimData(
	id: number | string,
	firstName: string,
	lastName: string,
	phone: string,
	role: string
): IHodim {
	return {
		id,
		firstName,
		lastName,
		phone,
		role,
	};
}

export const HodimlarData: IHodim[] = [
	createHodimData(
		1,
		"Malika",
		"Komilova",
		"+998991457486",
		"Operator"
	),
	createHodimData(
		2,
		"Husnora",
		"Jalolova",
		"+998944865921",
		"Operator"
	),
	createHodimData(
		3,
		"Durdona",
		"Akmalova",
		"+998334589657",
		"Operator"
	),
];

function createRoleData(id: number | string, name: string): IRole {
	return {
		id,
		name,
	};
}

export const RoleData: IRole[] = [
	createRoleData(1, "Operator"),
	createRoleData(2, "Admin"),
];

export const BasketData: IBasket[] = [];
