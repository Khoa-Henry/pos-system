<script setup>
import { ref } from "vue";
import CategorySelection from "../../Components/CategorySelection.vue";
import ItemSelection from "../../Components/ItemSelection.vue";

const currentCategory = ref("All");
const displayEditing = ref(false);
</script>

<template>
  <v-container fluid class="container px-2">
    <div class="yHeight">
      <v-row no-gutters class="containerRow">
        <v-col class="pt-1">
          <v-btn @click="$router.push('/')" color="primary" variant="text" icon>
            <v-icon icon="mdi-chevron-left" class="icon"></v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row no-gutters class="sectionCol">
        <CategorySelection
          v-model:currentCategory="currentCategory"
          :isEditing="true"
        />
        <ItemSelection
          v-model:currentCategory="currentCategory"
          :isEditing="true"
        />
        <v-col cols="4" class="fullHeight">
          <v-container fluid class="pb-1 px-2 fullHeight">
            <v-sheet height="100%" elevation="4" rounded class="yHeight">
              <!-- hide when item is not selected -->
              <v-form @submit.prevent="" class="yHeight">
                <div style="flex: 1; overflow: auto; padding: 16px 8px 8px 8px">
                  x button goes here
                  <v-row no-gutters>
                    <v-col cols="12" md="6" class="pa-2">
                      <v-text-field
                        v-model="itemName"
                        color="primary"
                        label="Item name"
                        :rules="rules"
                      />
                    </v-col>
                    <v-col cols="12" md="6" class="pa-2">
                      <v-text-field
                        model-value="123545"
                        readonly
                        color="primary"
                        label="Item ID"
                        type="number"
                        :rules="rules"
                      />
                    </v-col>
                    <v-col cols="12" md="6" class="pa-2">
                      <v-text-field
                        label="Price per unit"
                        prefix="$"
                        placeholder="0.00"
                        v-model="price"
                        type="number"
                        :rules="rules"
                        @blur="formatCurrency"
                      />
                    </v-col>
                    <v-col cols="12" md="6" class="pa-2">
                      <v-text-field
                        v-model="qty"
                        placeholder="0"
                        color="primary"
                        label="Quantity"
                        type="number"
                        :rules="rules"
                      />
                    </v-col>
                  </v-row>
                </div>

                <v-row
                  no-gutters
                  justify="center"
                  style="flex: 0 0 auto; padding: 8px 8px 16px 8px"
                >
                  <v-col cols="6">
                    <v-btn color="primary" block>Save</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-sheet>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.container {
  height: 100vh;
}
.containerRow {
  margin: 0;
  flex: 0 0 auto;
}

.fullHeight {
  height: 100%;
  margin: 0;
}
.icon {
  font-size: 3rem;
}
.yHeight {
  display: flex; /* Use flexbox */
  flex-direction: column;
  height: 100%;
}
.sectionCol {
  height: 100%;
  overflow: auto;
}
</style>
