import { defineStore } from "pinia";
import { ref } from "vue";
import { Use } from "../tools/type";

export const userStore = defineStore("user", () => {
  // 用户信息
  const user = ref<Use>();
  const token = ref<string>();
  return {
    user,
    token,
  };
});
