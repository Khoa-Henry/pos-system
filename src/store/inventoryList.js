import { Category } from "@/Models/Category";
import { CategoryItem } from "@/Models/Item";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "../firebase";

export const useInventoryListStore = defineStore("inventoryList", {
  state: () => {
    return { value: [] };
  },

  actions: {
    // Fetch all categories and items from Firestore to populate the store with real-time updates
    async fetchInventory() {
      try {
        const store = [];

        // Fetch categories with real-time updates
        const categoryCollectionRef = collection(
          db,
          "Categories"
        ).withConverter(Category.converter);
        onSnapshot(categoryCollectionRef, (snapshot) => {
          store.length = 0; // Clear the store
          snapshot.docs.forEach((doc) => {
            const category = doc.data();
            if (category) {
              category.categoryId = doc.id; // Ensure categoryId is set
              store.push(category);
            }
          });

          // Fetch items with real-time updates
          const itemsCollectionRef = collection(db, "Items").withConverter(
            CategoryItem.converter
          );
          onSnapshot(itemsCollectionRef, (snapshot) => {
            snapshot.docs.forEach((doc) => {
              const item = doc.data();
              if (item) {
                const category = store.find(
                  (cat) => cat.categoryId === item.categoryId
                );
                if (category) {
                  category.addItem(item);
                }
              }
            });

            this.value = [...store]; // Update the store state with the new data
          });
        });
      } catch (error) {
        console.error("Error fetching inventory:", error);
        // TODO: Navigate to error page or show a notification
      }
    },

    async storeDeleteItem(itemId, categoryName) {
      const category = this.value.find(
        (cat) => cat.categoryName === categoryName
      );
      if (category) {
        const item = category.items.find((item) => item.itemId === itemId);
        if (item) {
          const itemDocRef = doc(db, "Items", item.itemId);
          await deleteDoc(itemDocRef);
          category.deleteItem(itemId);
        }
      }
    },

    async storeAddItem(newItem, categoryName) {
      const category = this.value.find(
        (cat) => cat.categoryName === categoryName
      );
      if (category) {
        // Ensure newItem has the correct categoryName and categoryId
        newItem.categoryName = category.categoryName;
        newItem.categoryId = category.categoryId;

        // Add or update the item in Firestore
        if (newItem.itemId) {
          // Check if the item exists in a different category
          for (let i = 0; i < this.value.length; i++) {
            if (i !== this.value.indexOf(category)) {
              const existingItemIndex = this.value[i].findItemIndexById(
                newItem.itemId
              );
              if (existingItemIndex !== -1) {
                // If it exists in a different category, remove it from there
                this.value[i].deleteItem(newItem.itemId);
                break;
              }
            }
          }

          const itemDocRef = doc(db, "Items", newItem.itemId);
          await updateDoc(itemDocRef, newItem.toFirestore());
        } else {
          const itemsCollectionRef = collection(db, "Items").withConverter(
            CategoryItem.converter
          );
          console.log(newItem.toFirestore());
          const docRef = await addDoc(
            itemsCollectionRef,
            newItem.toFirestore()
          );
          newItem.itemId = docRef.id; // Assign the generated ID from Firestore
        }

        // Add or update the item in the category
        category.addItem(newItem);
      }
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
