import { Category } from "./Models/Category";
import { CategoryItem } from "./Models/Item";

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
