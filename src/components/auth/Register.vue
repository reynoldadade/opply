<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { POST_users } from "../../services/auth.service";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useAppStore } from "../../stores/app";
import Spinner from "../UI/Spinner.vue";

// define router hook
const router = useRouter();
// define cookies hook
const cookies = useCookies();
// define appStore hook
const appStore = useAppStore();

// schema to define validation rules for the form
const registerSchema = yup.object().shape({
  username: yup.string().required().min(1).max(150),
  password: yup.string().required().min(1).max(128),
  first_name: yup.string().min(0).max(150),
  last_name: yup.string().min(0).max(150),
  email: yup.string().email().min(0).max(256),
});
// emitter
const emit = defineEmits<{
  // emitted when user wants to register
  (event: "switchComponent", component: string): void;
}>();

// this method is called when the form is submitted
async function onSubmit(values: any): Promise<void> {
  // send values to server
  const response = await POST_users(values);
  if (response) {
    cookies.set("token", response.token);
    // push to suppliers page
    router.push({ path: "/suppliers", replace: true });
  }
}

// if user clicks sign up, emit the event to switch to login component
function switchToRegister() {
  emit("switchComponent", "Login");
}
</script>

<template>
  <div class="w-full p-4">
    <div class="capitalize text-lg">
      <span>Register</span>
    </div>
    <Form @submit="onSubmit" :validation-schema="registerSchema">
      <div class="form-control">
        <label for="username" class="label"
          ><span class="label-text">Username</span></label
        >
        <Field
          name="username"
          type="text"
          class="py-1 px-2 rounded-sm border w-full"
          id="username"
          data-testid="registerUsername"
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
          data-testid="registerPassword"
          value=""
        />
        <ErrorMessage name="password" class="text-xs text-gray-400" />
      </div>
      <div class="form-control">
        <label for="firstName" class="label"
          ><span class="label-text">First Name</span></label
        >
        <Field
          name="first_name"
          type="text"
          class="py-1 px-2 rounded-sm border w-full"
          id="firstName"
          data-testid="registerFirstName"
          value=""
        />
        <ErrorMessage name="first_name" class="text-xs text-gray-400" />
      </div>
      <div class="form-control">
        <label for="lastName" class="label"
          ><span class="label-text">Last Name</span></label
        >
        <Field
          name="last_name"
          type="text"
          class="py-1 px-2 rounded-sm border w-full"
          id="lastName"
          data-testid="registerLastName"
          value=""
        />
        <ErrorMessage name="last_name" class="text-xs text-gray-400" />
      </div>
      <div class="form-control">
        <label for="email" class="label"
          ><span class="label-text">Email</span></label
        >
        <Field
          name="email"
          type="email"
          class="py-1 px-2 rounded-sm border w-full"
          id="email"
          data-testid="registerEmail"
          value=""
        />
        <ErrorMessage name="email" class="text-xs text-gray-400" />
      </div>
      <div class="py-2">
        <button type="submit" class="btn">
          <span>Sign Up</span> <Spinner v-if="appStore.getLoader" />
        </button>
      </div>
    </Form>
    <div class="text-xs text-gray-400" v-if="appStore.getIsError">
      <span>{{ appStore.error }} </span>
    </div>
    <div>
      Already have an account?
      <span class="btn btn-link" @click="switchToRegister">Sign In</span>
    </div>
  </div>
</template>
