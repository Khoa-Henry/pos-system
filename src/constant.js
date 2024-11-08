import { Category } from "./Models/Category";
import { CategoryItem } from "./Models/Item";

// export const inventoryList = [
//   {
//     categoryName: "Electronics",
//     categoryId: 1,
//     items: [
//       {
//         itemId: "101",
//         itemName: "Laptop",
//         quantity: 0,
//         pricePerUnit: 899.99,
//         supplier: "TechSupply Co.",
//         lastRestockDate: "2024-08-25",
//         location: "Aisle 3, Shelf B",
//       },
//       {
//         itemId: "103",
//         itemName: "Wireless Mouse",
//         quantity: 30,
//         pricePerUnit: 24.99,
//         supplier: "GadgetsPlus",
//         lastRestockDate: "2024-08-30",
//         location: "Aisle 2, Shelf F",
//       },
//       {
//         itemId: "106",
//         itemName: "Smartphone",
//         quantity: 20,
//         pricePerUnit: 699.99,
//         supplier: "MobileTech Inc.",
//         lastRestockDate: "2024-09-05",
//         location: "Aisle 3, Shelf A",
//       },
//       {
//         itemId: "107",
//         itemName: "Tablet",
//         quantity: 10,
//         pricePerUnit: 499.99,
//         supplier: "TechSupply Co.",
//         lastRestockDate: "2024-09-02",
//         location: "Aisle 3, Shelf C",
//       },
//     ],
//   },
//   {
//     categoryName: "Furniture",
//     categoryId: 2,
//     items: [
//       {
//         itemId: "102",
//         itemName: "Office Chair",
//         quantity: 8,
//         pricePerUnit: 199.99,
//         supplier: "OfficeWorld",
//         lastRestockDate: "2024-09-01",
//         location: "Aisle 7, Shelf D",
//       },
//       {
//         itemId: "108",
//         itemName: "Standing Desk",
//         quantity: 5,
//         pricePerUnit: 399.99,
//         supplier: "FurnitureHub",
//         lastRestockDate: "2024-09-04",
//         location: "Aisle 7, Shelf A",
//       },
//       {
//         itemId: "109",
//         itemName: "Bookshelf",
//         quantity: 7,
//         pricePerUnit: 149.99,
//         supplier: "HomeEssentials",
//         lastRestockDate: "2024-08-29",
//         location: "Aisle 7, Shelf B",
//       },
//       {
//         itemId: "110",
//         itemName: "Conference Table",
//         quantity: 2,
//         pricePerUnit: 799.99,
//         supplier: "OfficeWorld",
//         lastRestockDate: "2024-08-31",
//         location: "Aisle 8, Shelf C",
//       },
//     ],
//   },
//   {
//     categoryName: "Lighting",
//     categoryId: 3,
//     items: [
//       {
//         itemId: "104",
//         itemName: "Desk Lamp",
//         quantity: 12,
//         pricePerUnit: 49.99,
//         supplier: "HomeEssentials",
//         lastRestockDate: "2024-08-28",
//         location: "Aisle 5, Shelf A",
//       },
//       {
//         itemId: "111",
//         itemName: "Floor Lamp",
//         quantity: 10,
//         pricePerUnit: 89.99,
//         supplier: "BrightLights",
//         lastRestockDate: "2024-08-30",
//         location: "Aisle 5, Shelf B",
//       },
//       {
//         itemId: "112",
//         itemName: "Pendant Light",
//         quantity: 6,
//         pricePerUnit: 119.99,
//         supplier: "LightingPlus",
//         lastRestockDate: "2024-08-27",
//         location: "Aisle 5, Shelf C",
//       },
//       {
//         itemId: "113",
//         itemName: "Ceiling Fan with Light",
//         quantity: 4,
//         pricePerUnit: 149.99,
//         supplier: "FanWorks",
//         lastRestockDate: "2024-08-26",
//         location: "Aisle 5, Shelf D",
//       },
//     ],
//   },
//   {
//     categoryName: "Stationery",
//     categoryId: 4,
//     items: [
//       {
//         itemId: "105",
//         itemName: "Notebook",
//         quantity: 50,
//         pricePerUnit: 3.49,
//         supplier: "PaperGoods Inc.",
//         lastRestockDate: "2024-09-03",
//         location: "Aisle 1, Shelf C",
//       },
//       {
//         itemId: "114",
//         itemName: "Pen Pack (12 pcs)",
//         quantity: 100,
//         pricePerUnit: 5.99,
//         supplier: "StationeryWorld",
//         lastRestockDate: "2024-09-04",
//         location: "Aisle 1, Shelf B",
//       },
//       {
//         itemId: "115",
//         itemName: "Stapler",
//         quantity: 40,
//         pricePerUnit: 7.99,
//         supplier: "OfficeSupplies Co.",
//         lastRestockDate: "2024-09-01",
//         location: "Aisle 1, Shelf D",
//       },
//       {
//         itemId: "116",
//         itemName: "Highlighter Set",
//         quantity: 60,
//         pricePerUnit: 4.99,
//         supplier: "ColorMark",
//         lastRestockDate: "2024-09-02",
//         location: "Aisle 1, Shelf A",
//       },
//     ],
//   },
// ];

export const inventoryList = [
  new Category("Electronics", 1, [
    new CategoryItem("Laptop", "101", 0, 899.99),
    new CategoryItem("Wireless Mouse", "103", 30, 24.99),
    new CategoryItem("Smartphone", "106", 20, 699.99),
    new CategoryItem("Tablet", "107", 10, 499.99),
  ]),
  new Category("Furniture", 2, [
    new CategoryItem("Office Chair", "102", 8, 199.99),
    new CategoryItem("Standing Desk", "108", 5, 399.99),
    new CategoryItem("Bookshelf", "109", 7, 149.99),
    new CategoryItem("Conference Table", "110", 2, 799.99),
  ]),
  new Category("Lighting", 3, [
    new CategoryItem("Desk Lamp", "104", 12, 49.99),
    new CategoryItem("Floor Lamp", "111", 10, 89.99),
    new CategoryItem("Pendant Light", "112", 6, 119.99),
    new CategoryItem("Ceiling Fan with Light", "113", 4, 149.99),
  ]),
  new Category("Stationery", 4, [
    new CategoryItem("Notebook", "105", 50, 3.49),
    new CategoryItem("Pen Pack (12 pcs)", "114", 100, 5.99),
    new CategoryItem("Stapler", "115", 40, 7.99),
    new CategoryItem("Highlighter Set", "116", 60, 4.99),
  ]),
];
