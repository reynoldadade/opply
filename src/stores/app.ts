import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";
import { Supplier } from "../models/suppliers.model";
import { GET_supplier } from "../services/api.service";

export const useAppStore = defineStore("app", () => {
  // supplier that user selects from list of suppliers
  const selectedSupplier: Ref<Supplier | null> = ref(null);
  // saves selected Supplier to store
  function setSelectedSupplier(supplier: Supplier): void {
    selectedSupplier.value = supplier;
  }
  // retrieve supplier details from api instead
  async function setSelectedSupplierAsync(id: number) {
    // pass the id to the GET_supplier service
    const response = await GET_supplier(id);
    if (response) {
      // if api returned a response then save that value
      selectedSupplier.value = response;
      return;
    }
    // if no response was returned when in error then set the selectedSupplier back to null
    selectedSupplier.value = null;
  }
  // retrieve supplier value from store
  const getSelectedSupplier = computed(() => {
    return selectedSupplier.value;
  });

  // loaders for loading states
  const loading: Ref<boolean> = ref(false);
  // get loading value from store
  const getLoader = computed(() => {
    return loading.value;
  });
  // set loading value in store
  const setLoader = (value: boolean) => {
    loading.value = value;
  };

  //error messages for errors
  const error: Ref<string> = ref("");
  // get error value from store
  const getError = computed(() => {
    return error.value;
  });
  // set error value in store
  const setError = (value: string) => {
    error.value = value;
  };
  // error indicators

  // indicate if there is an error
  const isError: Ref<boolean> = ref(false);

  // set isError
  const setIsError = (value: boolean) => {
    isError.value = value;
  };

  // get IsError value from store
  const getIsError = computed(() => {
    return isError.value;
  });

  return {
    setSelectedSupplier,
    getSelectedSupplier,
    selectedSupplier,
    setSelectedSupplierAsync,
    loading,
    getLoader,
    setLoader,
    error,
    getError,
    setError,
    isError,
    setIsError,
    getIsError,
  };
});
