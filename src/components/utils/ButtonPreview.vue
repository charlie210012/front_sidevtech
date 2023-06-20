<template>
    <button  class="btn btn-primary" @click="openNewWindow">Ir a {{ buttonText }}</button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buttonText: "Ver preview",
        url: "/preview/"+localStorage.getItem('clientId'),
      };
    },
    methods: {
        openNewWindow() {
           window.open(this.url, "_blank");
        },
    },
  };
  </script>
  