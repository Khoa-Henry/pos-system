<template>
  <div
    style="
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    "
  >
    <div class="center-text">Circle</div>
    <ul class="nav-list">
      <li class="nav-item" style="transform: rotate(0deg) translate(120px)">
        <RouterLink to="/checkout" class="nav-link">
          <span style="transform: rotate(-0deg)">
            <v-icon
              style="font-size: 60px"
              color="primary"
              icon="mdi-table"
            ></v-icon>
            <br />
            Checkout
          </span>
        </RouterLink>
      </li>
      <li class="nav-item" style="transform: rotate(60deg) translate(120px)">
        <RouterLink to="/" class="nav-link">
          <span style="transform: rotate(-60deg)">
            <v-icon
              style="font-size: 60px"
              color="primary"
              icon="mdi-chart-areaspline"
            ></v-icon>
            <br />
            Reports
          </span>
        </RouterLink>
      </li>
      <li class="nav-item" style="transform: rotate(120deg) translate(120px)">
        <RouterLink to="/history" class="nav-link">
          <span style="transform: rotate(-120deg)"
            ><v-icon style="font-size: 60px" color="primary" icon="mdi-history">
            </v-icon>
            <br />
            History
          </span>
        </RouterLink>
      </li>
      <li class="nav-item" style="transform: rotate(180deg) translate(120px)">
        <RouterLink to="/" class="nav-link">
          <span style="transform: rotate(-180deg)">
            <v-icon
              style="font-size: 60px"
              color="primary"
              icon="mdi-folder"
            ></v-icon>
            <br />
            Placeholder
          </span>
        </RouterLink>
      </li>
      <li class="nav-item" style="transform: rotate(240deg) translate(120px)">
        <RouterLink to="/" class="nav-link">
          <span style="transform: rotate(-240deg)">
            <v-icon
              style="font-size: 60px"
              color="primary"
              icon="mdi-cogs"
            ></v-icon>
            <br />
            Setting
          </span>
        </RouterLink>
      </li>
      <li class="nav-item" style="transform: rotate(300deg) translate(120px)">
        <RouterLink to="/" class="nav-link">
          <span style="transform: rotate(-300deg)">
            <v-icon
              style="font-size: 60px"
              color="primary"
              icon="mdi-logout"
            ></v-icon>
            <br />
            Logout
          </span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}

a:hover {
  /* color: pink; */
}

.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
}

.nav-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.nav-item {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  width: 100%;
  height: 100%;
}
</style>
