import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alerts: [],
  }),

  actions: {
    vAlert: function (message, type = "error") {
      this.alerts.push({ message, type });
      setTimeout(() => {
        this.alerts.shift();
      }, 2000);
    },
    vSuccess: function (message) {
      this.vAlert(message, "success");
    },
  },
});
