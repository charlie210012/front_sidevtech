<template>
    <div>
      <span @click="openModal"><i class="bx bx-plus"></i></span>
      <v-dialog v-model="modalOpen" max-width="80%" hide-overlay>
        <v-card class="image-card">
          <v-responsive class="embed-responsive-16by9">
            <img :src="imageUrl" alt="Imagen" class="image-content">
          </v-responsive>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import { VCard, VResponsive, VDialog } from 'vuetify/lib/components';
  
  export default {
    components: {
      VCard,
      VResponsive,
      VDialog,
    },
    props: {
      imageUrl: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        modalOpen: false,
      };
    },
    methods: {
      openModal() {
        this.modalOpen = true;
      },
      closeModal() {
        this.modalOpen = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .image-content {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }
  
  .image-card {
    background-color: transparent;
    box-shadow: none;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
  
  .v-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }
  </style>
  