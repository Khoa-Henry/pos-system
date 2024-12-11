import { db } from "@/firebase";
import { Order } from "@/Models/Order";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { defineStore } from "pinia";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: [],
    previousOrders: [],
    loading: true,
    date: null,
  }),

  actions: {
    async fetchOrders(date) {
      this.loading = true;
      try {
        // Fetch orders for the specified day
        const startOfDay = Timestamp.fromDate(
          new Date(date.setHours(0, 0, 0, 0))
        );
        const endOfDay = Timestamp.fromDate(
          new Date(date.setHours(23, 59, 59, 999))
        );

        const ordersCollectionRef = collection(db, "Orders").withConverter(
          Order.converter
        );

        const q = query(
          ordersCollectionRef,
          where("date", ">=", startOfDay),
          where("date", "<=", endOfDay),
          orderBy("date", "desc")
        );

        const querySnapshot = await getDocs(q);
        this.orders = querySnapshot.docs.map((doc) => doc.data());

        // Fetch orders for the previous day
        const previousDate = new Date(date);
        previousDate.setDate(previousDate.getDate() - 1);

        const startOfPreviousDay = Timestamp.fromDate(
          new Date(previousDate.setHours(0, 0, 0, 0))
        );
        const endOfPreviousDay = Timestamp.fromDate(
          new Date(previousDate.setHours(23, 59, 59, 999))
        );

        const previousQ = query(
          ordersCollectionRef,
          where("date", ">=", startOfPreviousDay),
          where("date", "<=", endOfPreviousDay),
          orderBy("date", "desc")
        );

        const previousQuerySnapshot = await getDocs(previousQ);
        this.previousOrders = previousQuerySnapshot.docs.map((doc) =>
          doc.data()
        );

        this.date = date;
      } catch (error) {
        console.error("Error fetching orders:", error);
        this.orders = [];
        this.previousOrders = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
