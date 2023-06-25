<template>
    <div>
      <form ref="paymentForm"></form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        apiKey: "ad4695e91c540743bf592abd0e3f6b41",
        amount: 400000,
        name: "Suscripcion de pagína web",
        description: "Hosting y dominio",
        currency: "cop",
        country: "co",
        testMode: true,
        responseUrl: process.env.VUE_APP_APP_URL + "dashboard",
        confirmationUrl: "",
        methodConfirmation: "get",
      };
    },
    mounted() {
      this.loadCheckoutScript();
    },
    methods: {
      loadCheckoutScript() {
        const script = document.createElement("script");
        script.src = "https://checkout.epayco.co/checkout.js";
        script.className = "epayco-button";
        script.setAttribute("data-epayco-key", this.apiKey);
        script.setAttribute("data-epayco-amount", this.amount);
        script.setAttribute("data-epayco-name", this.name);
        script.setAttribute("data-epayco-description", this.description);
        script.setAttribute("data-epayco-currency", this.currency);
        script.setAttribute("data-epayco-country", this.country);
        script.setAttribute("data-epayco-test", this.testMode);
        script.setAttribute("data-epayco-external", "false");
        script.setAttribute("data-epayco-response", this.responseUrl);
        script.setAttribute("data-epayco-confirmation", this.confirmationUrl);
        script.setAttribute(
          "data-epayco-methodconfirmation",
          this.methodConfirmation
        );
  
        this.$refs.paymentForm.appendChild(script);
      },
    },
  };
</script>
  