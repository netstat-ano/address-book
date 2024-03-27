<template>
  <Modal
    :isVisible="isVisible"
    @update:modelValue="emit('onClose')"
    title="Add address"
    subtitle="Here you can add address to your adress book"
  >
    <v-card-text>
      <Textfield v-model="address.name" label="Name"></Textfield>
      <Textfield v-model="address.surname" label="Surname"></Textfield>
      <Textfield v-model="address.email" label="E-mail"></Textfield>
      <Textfield v-model="address.phone" label="Phone number"></Textfield>
      <ValidationErrors :errors="validationErrors"></ValidationErrors>
    </v-card-text>
    <template #actions>
      <v-btn color="primary_dark" @click="onSave" variant="elevated">{{
        selectedAddressId ? "Update" : "Add"
      }}</v-btn>
      <v-btn @click="emit('onClose')" variant="outlined">Close</v-btn>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import Textfield from "../UI/Textfield.vue";
import Modal from "../UI/Modal.vue";
import { ref } from "vue";
import ValidationErrors from "../UI/ValidationErrors.vue";
import { addressSchema } from "@/validations/Address";
import type { Address } from "@/types/Address";
import type { ValidationError } from "yup";
const props = defineProps<{
  isVisible: boolean;
  address: Address;
  selectedAddressId: number | null;
}>();
const emit = defineEmits<{
  (e: "onClose"): void;
  (e: "onSave"): void;
  (e: "onUpdate"): void;
}>();
const validationErrors = ref<string[]>([]);
const onSave = async () => {
  addressSchema
    .validate(props.address, { abortEarly: false })
    .then(() => {
      validationErrors.value = [];
      if (props.selectedAddressId) {
        emit("onUpdate");
        return;
      }

      emit("onSave");
    })
    .catch((err: ValidationError) => {
      validationErrors.value = err.errors;
    });
};
</script>
