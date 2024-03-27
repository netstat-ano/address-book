<template>
  <!-- <SplashScreen v-if="!isServiceWorkerReady"></SplashScreen> -->
  <v-app v-if="isServiceWorkerReady">
    <v-main>
      <v-app-bar color="primary">
        <v-app-bar-title>Addresses book</v-app-bar-title>
      </v-app-bar>
      <Container>
        <RouterView />
      </Container>
    </v-main>
  </v-app>
</template>
<script setup>
import { onMounted, ref } from "vue";
import SplashScreen from "@/components/UI/SplashScreen.vue";
import Container from "./components/Container.vue";

const isServiceWorkerReady = ref(false);

const startCheckingProcedure = () => {
  if (
    !(
      navigator.serviceWorker &&
      navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage
    )
  ) {
    location.reload();
  } else {
    isServiceWorkerReady.value = true;
  }
};

onMounted(() => {
  if (navigator.serviceWorker) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/serviceWorker.js", { scope: "/" })
        .then((registration) => {
          startCheckingProcedure();
        });
    });
  }
});
</script>
