<template>
  <div>
    <button class="floating-button position" @click="openModal">
      <b>Publicar Página</b>
    </button>
  </div>

  <div v-if="showConfirmation" class="modal-overlay">
    <div class="modal-content" v-if="payment">
      <h3>Confirmar Publicación</h3>
      <p>¿Está seguro de que desea publicar en la pagina web?</p>
      <div class="modal-buttons">
        <button class="btn btn-secondary" @click="cancelPublish">Cancelar</button>
        <button class="btn btn-primary" @click="confirmPublish">Confirmar</button>
      </div>
    </div>
    <div class="modal-content" v-if="!payment">
      <h3>Realizar Pago</h3>
      <p>Antes de empezar a publicar debes realizar el pago de tu pagina web</p>
      <div class="modal-buttons">
        <button class="btn btn-secondary" @click="cancelPublish">Cancelar</button>
        <button class="btn btn-primary"><IntegrationPayment /></button>
      </div>
    </div>
  </div>

</template>

<script>
import IntegrationPayment from './IntegrationPayment.vue';
import axios from "axios";
export default {
    data() {
        return {
            payment: false,
            position: "left",
            showConfirmation: false
        };
    },
    methods: {
        getPayment(){

            const urlBase = localStorage.getItem('urlBase');
            const clientId = localStorage.getItem("clientId");

            const config = {
              headers: {
                Authorization: 'Bearer '+ localStorage.getItem('userToken')
              }
            };
            axios
                .get(urlBase + 'api/payment/'+clientId,config)
                .then(response => {

                  if(response.data.status == "success"){
                    this.payment = true;
                  }
                })
                .catch(error => {
                this.errorMessage = 'Se produjo un erro al consultar datos. Por favor, inténtalo de nuevo.'; // Mostrar mensaje de error
                // Ocurrió un error al enviar la solicitud
                console.error(error); // Imprime el error en la consola
                // Puedes mostrar un mensaje de error aquí
                });
        },
        openModal() {
            this.showConfirmation = true;
        },
        confirmPublish() {
            this.showConfirmation = false;
            // Lógica para publicar los cambios en la página web
            this.publishPage();
        },
        cancelPublish() {
            this.showConfirmation = false;
        },
        publishPage() {
          const urlBase = localStorage.getItem("urlBase");
          const clientId = localStorage.getItem("clientId");
          const config = {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("userToken"),
            },
          };
         
          axios
          .post(urlBase + "api/publish/" + clientId + "/structure",null,config)
          .then((response) => {
            if(response.status == 201 || response.status == 200){
              console.log(response.data);
            }

          })
          .catch((error) => {
            this.errorMessage =
              "Se produjo un error al consultar datos. Por favor, inténtalo de nuevo."; // Mostrar mensaje de error
            // Ocurrió un error al enviar la solicitud
            console.error(error); // Imprime el error en la consola
            // Puedes mostrar un mensaje de error aquí
          });
        },
    },
    components: { IntegrationPayment },
    mounted(){
      this.getPayment();
    }
};
</script>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 20px;
  background-color: #104415;
  color: #fff;
  padding: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  transition: left 0.3s;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  line-height: 1;
  z-index: 9999;
}

.position {
  left: 50%;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  max-width: 400px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  margin-left: 10px;
}

</style>
