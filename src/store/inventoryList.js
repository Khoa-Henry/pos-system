import { Category } from "@/Models/Category";
import { CategoryItem } from "@/Models/Item";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  runTransaction,
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

    async syncDirtyItems() {
      for (const category of this.value) {
        for (const item of category.items) {
          if (item.isDirty) {
            try {
              const itemDocRef = doc(db, "Items", item.itemId);

              await runTransaction(db, async (transaction) => {
                const itemSnapshot = await transaction.get(itemDocRef);
                if (!itemSnapshot.exists()) {
                  throw new Error(`Item ${item.itemId} does not exist.`);
                }

                // Update the item with the new data
                transaction.update(itemDocRef, item.toFirestore());

                // Mark the item as clean after syncing
                item.isDirty = false;
              });
            } catch (error) {
              console.error(`Sync failed:`, error);
            }
          }
        }
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

    async storeAddCategory(newCategory) {
      const existingCategoryIndex = this.value.findIndex(
        (cat) => cat.categoryId === newCategory.categoryId
      );

      if (existingCategoryIndex === -1) {
        // If category doesn't exist, add it
        const categoriesCollectionRef = collection(
          db,
          "Categories"
        ).withConverter(Category.converter);
        const docRef = await addDoc(
          categoriesCollectionRef,
          newCategory.toFirestore()
        );
        newCategory.categoryId = docRef.id; // Assign the generated ID from Firestore
      } else {
        // If category exists, update it
        const categoryDocRef = doc(db, "Categories", newCategory.categoryId);
        await updateDoc(categoryDocRef, {
          categoryName: newCategory.categoryName,
        });
      }
    },

    async storeDeleteCategory(newCategory) {
      const categoryIndex = this.value.findIndex(
        (cat) => cat.categoryId === newCategory.categoryId
      );
      console.log(categoryIndex, "idnex");
      if (categoryIndex !== -1) {
        const category = this.value[categoryIndex];
        const categoryDocRef = doc(db, "Categories", category.categoryId);
        await deleteDoc(categoryDocRef);

        // Delete all items in this category
        console.log(category, "2131");
        for (const item of category.items) {
          const itemDocRef = doc(db, "Items", item.itemId);
          await deleteDoc(itemDocRef);
        }
      }
    },

    storeClear() {
      this.value = [];
    },
  },
});
