<template>
  <button  class="btn btn-primary" @click="openNewWindow">{{ buttonText }}</button>
</template>

<script>
export default {
  data() {
    return {
      buttonText: "Continuar creando la pagina web",
      url: "/build/"+localStorage.getItem('clientId'),
    };
  },
  methods: {
      openNewWindow() {
         window.open(this.url, "_blank");
      },
  },
};
</script>
