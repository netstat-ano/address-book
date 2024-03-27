<template>
  <Modal
    :isVisible="isConfirmDeleteModalVisible"
    @update:modelValue="isConfirmDeleteModalVisible = false"
    title="Address deletion"
  >
    <v-card-text> Are you sure you want to delete this address? </v-card-text>

    <template v-slot:actions>
      <v-btn
        variant="elevated"
        color="primary_dark"
        text="Confirm"
        @click="onDeleteAddress"
      ></v-btn>
      <v-btn variant="outlined" text="Cancel" @click="onRejectDeletion"></v-btn>
    </template>
  </Modal>

  <v-snackbar color="success" :timeout="1500" v-model="isSnackbarVisible">
    {{ snackbarText }}
  </v-snackbar>

  <AddressCreatorModal
    :selectedAddressId="selectedAddressId"
    :isVisible="isAddressCreatorModalVisible"
    :address="addressFields"
    @onSave="onSaveAddressHandler"
    @onUpdate="onUpdateAddressHandler"
    @onClose="onCloseAddressCreatorModal"
  >
  </AddressCreatorModal>

  <div
    class="tw-bg-primary tw-w-[250px] sm:tw-w-[400px] lg:tw-w-[800px] tw-p-4 tw-m-4 tw-rounded"
  >
    <div class="tw-mt-4">
      <v-btn
        color="primary_dark"
        @click="onAddAddressClickHandler"
        :prepend-icon="Icon.PLUS"
        >Add address</v-btn
      >
    </div>
    <v-data-table class="dataTable" :headers="tableHeaders" :items="addresses">
      <template v-slot:no-data>
        <div>No data</div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="tw-flex tw-gap-2">
          <v-icon icon="mdi-pencil" @click="onEditAddress(item)"> </v-icon>
          <v-icon icon="mdi-delete" @click="onConfirmDeleteAddress(item)">
          </v-icon>
        </div>
      </template>
      <template #bottom></template>
    </v-data-table>
  </div>
</template>
<script setup lang="ts">
import AddressCreatorModal from "@/components/viewsComponents/AddressCreatorModal.vue";
import { Icon } from "@/enums/Icon";
import type { Address, AddressResponse } from "@/types/Address";
import { reactive, ref, onMounted } from "vue";
import { Events } from "@/enums/Events";
import Modal from "@/components/UI/Modal.vue";
import { request } from "@/helpers/request";

const addresses = ref<AddressResponse[]>();
const selectedAddressId = ref<number | null>(null);

const isAddressCreatorModalVisible = ref(false);
const isConfirmDeleteModalVisible = ref(false);
const isSnackbarVisible = ref(false);

const snackbarText = ref<string>("");

const addressFields = reactive<Address>({
  name: null,
  surname: null,
  email: null,
  phone: null,
});

const tableHeaders = [
  { title: "Name", value: "name" },
  { title: "Surname", value: "surname" },
  { title: "E-mail", value: "email" },
  { title: "Phone number", value: "phone" },
  { title: "Actions", key: "actions" },
];
const onSaveAddressHandler = () => {
  try {
    request({
      event: Events.CREATE_ADDRESS,
      data: addressFields,
    });
    isAddressCreatorModalVisible.value = false;
    showSnackbar("Succesfully created address!");
    fetchAddresses();
  } catch (err) {
    console.log({ err });
  }
};

const showSnackbar = (text: string) => {
  snackbarText.value = text;
  isSnackbarVisible.value = true;
};

const fetchAddresses = () => {
  request(
    {
      event: Events.GET_ADDRESSES,
    },
    (response) => {
      addresses.value = response.data.addresses;
    }
  );
};

const onEditAddress = (item: AddressResponse) => {
  isAddressCreatorModalVisible.value = true;
  selectedAddressId.value = item.id;
  addressFields.email = item.email;
  addressFields.name = item.name;
  addressFields.phone = item.phone;
  addressFields.surname = item.surname;
};

const onAddAddressClickHandler = () => {
  isAddressCreatorModalVisible.value = true;
  clearFields();
};

const onUpdateAddressHandler = () => {
  request({
    event: Events.UPDATE_ADDRESS,
    data: { ...addressFields, id: selectedAddressId.value },
  });
  isAddressCreatorModalVisible.value = false;
  showSnackbar("Succesfully updated address!");
  fetchAddresses();
};
const onDeleteAddress = () => {
  request({
    event: Events.DELETE_ADDRESS,
    data: { id: selectedAddressId.value },
  });
  showSnackbar("Succesfully deleted address!");
  isConfirmDeleteModalVisible.value = false;
  fetchAddresses();
};

const onRejectDeletion = () => {
  selectedAddressId.value = null;
  isConfirmDeleteModalVisible.value = false;
};

const onConfirmDeleteAddress = (item: AddressResponse) => {
  selectedAddressId.value = item.id;
  isConfirmDeleteModalVisible.value = true;
};

const clearFields = () => {
  selectedAddressId.value = null;
  addressFields.email = null;
  addressFields.name = null;
  addressFields.phone = null;
  addressFields.surname = null;
};

const onCloseAddressCreatorModal = () => {
  isAddressCreatorModalVisible.value = false;
  clearFields();
};
onMounted(() => {
  fetchAddresses();
});
</script>
