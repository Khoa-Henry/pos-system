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
    new CategoryItem(
      "Laptop",
      "101",
      0,
      899.99,
      "TechSupply Co.",
      "2024-08-25",
      "Aisle 3, Shelf B"
    ),
    new CategoryItem(
      "Wireless Mouse",
      "103",
      30,
      24.99,
      "GadgetsPlus",
      "2024-08-30",
      "Aisle 2, Shelf F"
    ),
    new CategoryItem(
      "Smartphone",
      "106",
      20,
      699.99,
      "MobileTech Inc.",
      "2024-09-05",
      "Aisle 3, Shelf A"
    ),
    new CategoryItem(
      "Tablet",
      "107",
      10,
      499.99,
      "TechSupply Co.",
      "2024-09-02",
      "Aisle 3, Shelf C"
    ),
  ]),
  new Category("Furniture", 2, [
    new CategoryItem(
      "Office Chair",
      "102",
      8,
      199.99,
      "OfficeWorld",
      "2024-09-01",
      "Aisle 7, Shelf D"
    ),
    new CategoryItem(
      "Standing Desk",
      "108",
      5,
      399.99,
      "FurnitureHub",
      "2024-09-04",
      "Aisle 7, Shelf A"
    ),
    new CategoryItem(
      "Bookshelf",
      "109",
      7,
      149.99,
      "HomeEssentials",
      "2024-08-29",
      "Aisle 7, Shelf B"
    ),
    new CategoryItem(
      "Conference Table",
      "110",
      2,
      799.99,
      "OfficeWorld",
      "2024-08-31",
      "Aisle 8, Shelf C"
    ),
  ]),
  new Category("Lighting", 3, [
    new CategoryItem(
      "Desk Lamp",
      "104",
      12,
      49.99,
      "HomeEssentials",
      "2024-08-28",
      "Aisle 5, Shelf A"
    ),
    new CategoryItem(
      "Floor Lamp",
      "111",
      10,
      89.99,
      "BrightLights",
      "2024-08-30",
      "Aisle 5, Shelf B"
    ),
    new CategoryItem(
      "Pendant Light",
      "112",
      6,
      119.99,
      "LightingPlus",
      "2024-08-27",
      "Aisle 5, Shelf C"
    ),
    new CategoryItem(
      "Ceiling Fan with Light",
      "113",
      4,
      149.99,
      "FanWorks",
      "2024-08-26",
      "Aisle 5, Shelf D"
    ),
  ]),
  new Category("Stationery", 4, [
    new CategoryItem(
      "Notebook",
      "105",
      50,
      3.49,
      "PaperGoods Inc.",
      "2024-09-03",
      "Aisle 1, Shelf C"
    ),
    new CategoryItem(
      "Pen Pack (12 pcs)",
      "114",
      100,
      5.99,
      "StationeryWorld",
      "2024-09-04",
      "Aisle 1, Shelf B"
    ),
    new CategoryItem(
      "Stapler",
      "115",
      40,
      7.99,
      "OfficeSupplies Co.",
      "2024-09-01",
      "Aisle 1, Shelf D"
    ),
    new CategoryItem(
      "Highlighter Set",
      "116",
      60,
      4.99,
      "ColorMark",
      "2024-09-02",
      "Aisle 1, Shelf A"
    ),
  ]),
];
