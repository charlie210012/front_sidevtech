<template>
  <div class="container">
    <h2>Crear Nueva Página Web</h2>
    <div class="form-group">
      <label for="pageName">Nombre de la Página:</label>
      <input type="text" id="pageName" v-model="pageName" class="form-control">
    </div>
    <button @click="createWebPage" class="btn btn-primary">Crear</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pageName: ''
    };
  },
  methods: {
    createWebPage() {
      this.submitForm();
    },
    submitForm() {
      const urlBase = localStorage.getItem('urlBase');
      const requestBody = {name:this.pageName};

      const config = {
        headers: {
          Authorization: 'Bearer '+ localStorage.getItem('userToken')
        }
      };

      axios.post(urlBase + 'api/business', requestBody, config)
        .then(response => {
          console.log(response.data);
          if(response.status == 201){
            this.$emit('submit-clicked',{
              component: this.component,
              activeComponent: false,
              message: response.data.message
            });
            window.open("/build/" + response.data.business_id, "_blank");
          }
          // Realizar acciones después de la solicitud exitosa
        })
        .catch(error => {
          console.error('Error:', error);
          // Realizar acciones en caso de error
        });

      this.modalOpen = false;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0069d9;
}
</style>
