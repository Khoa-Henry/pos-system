import { Category } from "@/Models/Category";
import { CategoryItem } from "@/Models/Item";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
        const categoryCollectionRef = collection(db, "Inventory").withConverter(
          Category.converter
        );
        const categorySnapshot = await getDocs(categoryCollectionRef);

        const store = [];

        // Process each category in the snapshot
        for (const doc of categorySnapshot.docs) {
          const category = doc.data();

          const itemsCollectionRef = collection(
            db,
            `Inventory/${doc.id}/items`
          ).withConverter(CategoryItem.converter);
          const itemsSnapshot = await getDocs(itemsCollectionRef);

          category.items = itemsSnapshot.docs.map((itemDoc) => itemDoc.data());

          store.push(category);
        }
        this.value = store;
      } catch (error) {
        // TODO: naviate to error page or something
        console.error("Error fetching inventory:", error);
      }
    },

    // Store action to update an item and sync with Firestore
    async storeUpdateItem(updatedItem) {
      const category = this.value.find(
        (cat) => cat.findItemIndexById(updatedItem.itemId) !== -1
      );
      if (category) {
        category.updateItem(updatedItem); // Update in the store

        // Firestore: Reference to the item document within the category
        const itemDocRef = doc(
          db,
          "Inventory",
          "categories",
          category.categoryId,
          "items",
          updatedItem.itemId
        );

        // Update the item in Firestore
        await updateDoc(itemDocRef, updatedItem.toFirestore());
      }
    },

    // Store action to delete an item and sync with Firestore
    async storeDeleteItem(itemId, categoryName) {
      const category = this.value.find(
        (cat) => cat.categoryName === categoryName
      );
      if (category) {
        category.deleteItem(itemId); // Delete from the store

        // Firestore: Reference to the item document
        const itemDocRef = doc(
          db,
          "Inventory",
          "categories",
          category.categoryId,
          "items",
          itemId
        );

        // Delete the item from Firestore
        await deleteDoc(itemDocRef);
      }
    },

    // Store action to add an item and sync with Firestore
    async storeAddItem(newItem, categoryName) {
      const categoryIndex = this.value.findIndex(
        (cat) => cat.categoryName === categoryName
      );

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

      // Add the item to the store
      this.value[categoryIndex].addItem(newItem);

      // Firestore: Reference to the category document
      const categoryDocRef = doc(
        db,
        "Inventory",
        "categories",
        this.value[categoryIndex].categoryId
      );

      // Firestore: Reference to the item document within the category
      const itemDocRef = doc(
        db,
        "Inventory",
        "categories",
        this.value[categoryIndex].categoryId,
        "items",
        newItem.itemId
      );

      // Add the item to Firestore
      await setDoc(itemDocRef, newItem.toFirestore()); // Add item to Firestore
    },

    // Store action to add a category and sync with Firestore
    async storeAddCategory(newCategory) {
      const categoryIndex = this.value.findIndex(
        (cat) => cat.categoryId === newCategory.categoryId
      );

      // If category doesn't exist, add it
      if (categoryIndex === -1) {
        this.value.push(newCategory);

        // Firestore: Add new category document in Inventory > categories
        const categoryDocRef = doc(
          db,
          "Inventory",
          "categories",
          newCategory.categoryId
        );
        await setDoc(categoryDocRef, newCategory.toFirestore());
      } else {
        this.value[categoryIndex].categoryName = newCategory.categoryName;

        // Firestore: Update existing category in Inventory > categories
        const categoryDocRef = doc(
          db,
          "Inventory",
          "categories",
          newCategory.categoryId
        );
        await updateDoc(categoryDocRef, {
          categoryName: newCategory.categoryName,
        });
      }
    },

    // Store action to delete a category and sync with Firestore
    async storeDeleteCategory(categoryName) {
      const index = this.value.findIndex(
        (cat) => cat.categoryName === categoryName
      );
      if (index !== -1) {
        // Delete category from the store
        const category = this.value[index];
        this.value.splice(index, 1);

        // Firestore: Delete the category document in Inventory > categories
        const categoryDocRef = doc(
          db,
          "Inventory",
          "categories",
          category.categoryId
        );
        await deleteDoc(categoryDocRef);
      }
    },
  },
});
