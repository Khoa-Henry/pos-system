<script setup>
import { useUserStore } from "@/store/user";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth, db } from "../../firebase";

const router = useRouter();
const userStore = useUserStore();

const pin = ref(""); // Reactive PIN value
const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]); // Numbers 0-9
const errorMessage = ref("");

const appendToPin = (number) => {
  errorMessage.value = "";
  if (pin.value.length < 6) {
    pin.value += number; // Append the number to the PIN
  }
};

const submitPin = () => {
  if (pin.value.length === 6) {
    // firebase auth and route to home
    const email = pin.value + "@email.com";
    const password = pin.value + "@email.com";

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // find the logged in user in the database and set the user state
        const userDocRef = doc(collection(db, "Users"), auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        userStore.setUser(userDocSnap.data());
        router.push("/");
      })
      .catch((e) => {
        errorMessage.value = "INVALID CREDENTIALS";
      });
    pin.value = ""; // Reset PIN
  } else {
    // handle error in textfield
    errorMessage.value = "Please enter a 6-digit PIN";
  }
};

const deletePin = () => {
  pin.value = "";
  errorMessage.value = "";
};
</script>

<template>
  <v-container class="fullHeightContainer px-2">
    <v-row
      justify="center"
      align="center"
      class="fullHeightContainer"
      no-gutters
    >
      <div>
        <v-col cols="12">
          <v-row justify="center" no-gutters>
            <h1>Login</h1>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row justify="center" no-gutters>
            <!-- Display the entered PIN -->
            <v-col cols="10" sm="8" md="6" lg="4">
              <v-text-field
                v-model="pin"
                readonly
                outlined
                :errorMessages="errorMessage"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row justify="center" no-gutters>
            <v-col cols="10" sm="8" md="6" lg="4">
              <v-row justify="center">
                <!-- Number Buttons -->
                <v-col cols="4" v-for="number in numbers" :key="number">
                  <v-btn
                    size="x-large"
                    height="80"
                    color="primary"
                    @click="appendToPin(number)"
                    block
                  >
                    {{ number }}
                  </v-btn>
                </v-col>

                <!-- Delete -->
                <v-col cols="4">
                  <v-btn
                    size="x-large"
                    height="80"
                    color="error"
                    block
                    @click="deletePin"
                  >
                    <v-icon class="iconSize">mdi-backspace</v-icon>
                  </v-btn>
                </v-col>

                <!-- Submit Button -->
                <v-col cols="4">
                  <v-btn
                    size="x-large"
                    height="80"
                    color="success"
                    @click="submitPin"
                    block
                  >
                    <v-icon class="iconSize">mdi-login</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<style>
.v-btn {
  font-size: 2rem;
}

.v-text-field input {
  font-size: 2em;
}

.fullHeightContainer {
  height: 100vh;
  overflow: hidden;
}

.contentWrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.headerRow {
  margin: 0;
  flex: 0 0 auto;
}

.sectionRow {
  height: 100%;
  overflow: auto;
}
.iconSize {
  font-size: 2rem;
}
</style>
