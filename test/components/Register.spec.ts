/** @vitest-environment happy-dom */
import Register from "../../src/components/auth/Register.vue";
import { expect, test, describe, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { mount, flushPromises } from "@vue/test-utils";
import waitForExpect from "wait-for-expect";

describe("Register", () => {
  beforeEach(() => {
    // create store instance and set it as the active store
    setActivePinia(createPinia());
  });

  test("should return error message if user does not enter any data ", async () => {
    // get test id helper function when component is rendered
    const wrapper = mount(Register);

    // get signUp button
    const signUpButton = wrapper.find("[data-testid='signUpButton']");
    // click signUp button
    await signUpButton.trigger("click");
    // check if error message is rendered
  });
});
