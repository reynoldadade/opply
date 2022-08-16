<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import * as yup from "yup";
import { POST_login } from "../../services/auth.service";
import Spinner from "../UI/Spinner.vue";
import { useAppStore } from "../../stores/app";

// store instance
const appStore = useAppStore();

// define router
const router = useRouter();
// define cookies
const cookies = useCookies();

// schema to define validation rules for the form
const loginSchema = yup.object().shape({
  username: yup.string().required().min(1),
  password: yup.string().required().min(1),
});
// emitter
const emit = defineEmits<{
  // emitted when user wants to register
  (event: "switchComponent", component: string): void;
}>();

// this method is called when the form is submitted
async function onSubmit(values: any): Promise<void> {
  const response = await POST_login(values);
  // if a response exists, then the user is logged in
  if (response) {
    // save token to cookies
    cookies.set("token", response.token);
    // push to suppliers page
    router.push({ path: "/suppliers", replace: true });
  } else {
  }
}

// if user clicks sign up, emit the event to switch to register component
function switchToRegister() {
  emit("switchComponent", "Register");
}
</script>

<template>
  <div class="w-full p-4">
    <div class="capitalize text-lg">
      <span>Sign In</span>
    </div>
    <Form @submit="onSubmit" :validation-schema="loginSchema">
      <div class="form-control">
        <label for="username" class="label"
          ><span class="label-text">Username</span></label
        >
        <Field
          name="username"
          type="text"
          class="py-1 px-2 rounded-sm border w-full"
          id="username"
          data-testid="loginUsername"
          value=""
        />
        <ErrorMessage name="username" class="text-xs text-gray-400" />
      </div>
      <div class="form-control">
        <label for="password" class="label"
          ><span class="label-text">Password</span></label
        >
        <Field
          name="password"
          type="password"
          class="py-1 px-2 rounded-sm border w-full"
          id="password"
          data-testid="loginPassword"
          value=""
        />
        <ErrorMessage name="password" class="text-xs text-gray-400" />
      </div>
      <div class="py-2">
        <button type="submit" class="btn">
          <span>Sign In</span> <Spinner v-if="appStore.getLoader" />
        </button>
      </div>
    </Form>
    <!-- subtext for incorrect credentials -->
    <div class="text-xs text-gray-400" v-if="appStore.getIsError">
      <span> {{ appStore.error }} </span>
    </div>

    <div>
      Dont have an account?
      <span class="btn btn-link" @click="switchToRegister">Sign Up</span>
    </div>
  </div>
</template>
