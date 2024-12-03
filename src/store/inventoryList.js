import { Category } from "@/Models/Category";
import { CategoryItem } from "@/Models/Item";
import { collection, getDocs } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "../firebase";

export const useInventoryListStore = defineStore("inventoryList", {
  state: () => {
    return { value: [] };
  },

  actions: {
    // Fetch all categories and items from Firestore to populate the store
    async fetchInventory() {
      try {
        const store = [];

        // Fetch categories
        const categoryCollectionRef = collection(
          db,
          "Categories"
        ).withConverter(Category.converter);
        const categorySnapshot = await getDocs(categoryCollectionRef);

        // Create a map for categories for efficient lookup
        const categoryMap = new Map();

        categorySnapshot.docs.forEach((doc) => {
          const category = doc.data();
          if (category) {
            category.items = [];
            categoryMap.set(category.categoryId, category);
            store.push(category);
          }
        });

        // Fetch items
        const itemsCollectionRef = collection(db, "Items").withConverter(
          CategoryItem.converter
        );
        const itemsSnapshot = await getDocs(itemsCollectionRef);

        itemsSnapshot.docs.forEach((doc) => {
          const item = doc.data();
          if (item && categoryMap.has(item.categoryId)) {
            categoryMap.get(item.categoryId).items.push(item);
          }
        });

        this.value = store;
      } catch (error) {
        console.error("Error fetching inventory:", error);
        // TODO: Navigate to error page or show a notification
      }
    },

    storeDeleteItem(itemId, categoryName) {
      const category = this.value.find(
        (cat) => cat.categoryName === categoryName
      );
      if (category) {
        category.deleteItem(itemId);
        // TODO: have to update teh database right away
      }
    },

    storeAddItem(newItem, categoryName) {
      const categoryIndex = this.value.findIndex(
        (cat) => cat.categoryName === categoryName
      );
      newItem.categoryName = this.value[categoryIndex].categoryName;
      newItem.categoryId = this.value[categoryIndex].categoryId;
      console.log(newItem, "$$", categoryName);
      // Check if the item exists in a different category
      for (let i = 0; i < this.value.length; i++) {
        if (i !== categoryIndex) {
          // Skip the current category
          const existingItemIndex = this.value[i].items.findIndex(
            (item) => item.itemId === newItem.itemId
          );
          if (existingItemIndex !== -1) {
            // If it exists in a different category, remove it from there
            this.value[i].items.splice(existingItemIndex, 1);
            break;
          }
        }
      }

      this.value[categoryIndex].addItem(newItem);
    },

    storeAddCategory(newCategory) {
      const categoryIndex = this.value.findIndex(
        (cat) => cat.categoryId === newCategory.categoryId
      );

      // if category doesn't exist add it
      if (categoryIndex === -1) {
        this.value.push(newCategory);
      } else {
        this.value[categoryIndex].categoryName = newCategory.categoryName;
      }
    },

    storeDeleteCategory(newCategory) {
      const index = this.value.findIndex(
        (cat) => cat.categoryName === newCategory.categoryName
      );
      if (index !== -1) {
        this.value.splice(index, 1);
      }
    },

    storeClear() {
      this.value = [];
    },
  },
});
