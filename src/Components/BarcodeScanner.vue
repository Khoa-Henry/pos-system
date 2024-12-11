<script setup>
import { BrowserQRCodeReader } from "@zxing/library";
import { onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  dialog: { type: Boolean, required: true },
});
const emit = defineEmits(["update:dialog", "scannedContent"]);

const video = ref(null);
const scannedContent = ref("");
const codeReader = new BrowserQRCodeReader();

const startScanning = async () => {
  try {
    // List available video input devices
    const videoInputDevices = await codeReader.listVideoInputDevices();
    if (videoInputDevices.length === 0) {
      console.error("No video devices found");
      return;
    }

    // Select the first available video device
    const selectedDeviceId = videoInputDevices[0].deviceId;
    console.log(`Started decoding from camera with id ${selectedDeviceId}`);

    // Start decoding from the selected video device
    codeReader.decodeFromVideoDevice(
      selectedDeviceId,
      video.value,
      (result, err) => {
        if (result) {
          scannedContent.value = result.getText();
          // Emit the text up a component
          emit("scannedContent", scannedContent.value);
          emit("update:dialog", false);
          // Stop the scanner after a successful scan
          stopScanning();
        }
        if (err && !(err instanceof Error)) {
          // Handle non-error messages (e.g., QR Code too small)
          console.log("Message: ", err);
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};

const stopScanning = () => {
  // Reset the code reader to stop the camera and clean up resources
  codeReader.reset();
};

watch(() => {
  if (props.dialog) {
    startScanning();
  } else {
    stopScanning();
  }
});

onBeforeUnmount(() => {
  // Ensure the scanner is stopped when the component is destroyed
  stopScanning();
});
</script>

<template>
  <v-dialog
    v-model="props.dialog"
    transition="dialog-bottom-transition"
    max-width="700"
  >
    <v-btn
      icon="mdi-close"
      @click="
        emit('update:dialog', false);
        stopScanning();
      "
    />
    <video ref="video" autoplay></video>
  </v-dialog>
</template>

<style scoped></style>
