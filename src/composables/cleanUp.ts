import { useAppStore } from "../stores/app";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useRouter } from "vue-router";

// create instance for router, store and cookies

export function useCleanUp() {
  //   const appStore = useAppStore();
  const cookies = useCookies();
  const router = useRouter();
  // clear store
  //   appStore.$reset();
  //remove the token from the cookies
  cookies.remove("token");
  //redirect to the login page
  router.replace({
    name: "Auth",
  });
}
