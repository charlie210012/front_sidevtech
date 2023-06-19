<template>
    <div>
      <div class="btn-box">
        <button
          v-for="(item, index) in buttonArray"
          :key="index"
          type="button"
          class="btn btn-primary"
          @click="activeComponent(item.component)"
        >
          {{ item.text }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: 'ButtonList',
    data() {
      return {
        buttonArray: []
      };
    },
    mounted() {
      this.getServicesSection();
    },
    methods: {
      getServicesSection() {
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken')
          }
        };
        const urlBase = localStorage.getItem('urlBase');
        const clientId = localStorage.getItem("clientId");
        axios
          .get(urlBase + 'api/component/' + clientId, config)
          .then(response => {
            this.buttonArray = response.data.structure ?? [];
          })
          .catch(error => {
            this.errorMessage = 'Se produjo un error al consultar datos. Por favor, inténtalo de nuevo.'; // Mostrar mensaje de error
            // Ocurrió un error al enviar la solicitud
            console.error(error); // Imprime el error en la consola
            // Puedes mostrar un mensaje de error aquí
          });
      },
      activeComponent(value) {
        console.log(value);
        this.$emit('submit-clicked', {
            component: value,
            message: 'Realiza los ajustes que necesites',
            activeComponent: true
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .btn-box {
    display: flex;
    align-items: center;
    gap: 10px; /* Espacio entre los elementos */
    color: white;
    overflow-x: auto; /* Agrega desplazamiento horizontal si hay desbordamiento */
    padding-bottom: 10px; /* Agrega un espacio inferior para evitar que los botones se superpongan con otros elementos */
    flex-wrap: wrap; /* Envuelve los elementos en nuevas líneas */
    justify-content: flex-start; /* Alinea los botones hacia la izquierda */
  }
  
  .btn {
    white-space: nowrap; /* Evita el salto de línea */
    flex-shrink: 0; /* Evita que los botones se reduzcan en tamaño */
    max-width: calc(25% - 10px); /* Ancho máximo de cada botón para mostrar 4 botones por línea */
  }
  </style>
  