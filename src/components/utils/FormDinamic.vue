<template>
  <div>
    <button class="btn btn-primary" @click="openModal">Crear Nuevo</button>

    <div v-if="modalOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="header-modal">
          <h3>Registrar</h3>
          <button @click="closeModal">X</button>
        </div>
        <form>
          <div v-for="(field, index) in formFields" :key="index" class="mb-3">
            <div class="mb-3">
              <label :for="field.name" class="form-label">{{ field.label }}</label>
              <select
                v-if="field.type === 'select'"
                :id="field.name"
                :name="field.name"
                class="form-select"
                v-model="formData[field.name]"
              >
                <option v-for="option in field.options" :value="option.value" :key="option.value">{{ option.label }}</option>
              </select>
              <input
                :type="field.type"
                :id="field.name"
                :name="field.name"
                :placeholder="field.placeholder"
                class="form-control"
                v-model="formData[field.name]"
              />
            </div>
          </div>
          <button type="button" class="btn btn-primary" @click="submitForm">Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
  import axios from "axios";
  export default {
    name: 'DynamicForm',
    data() {
      return {
        formFields: [],
        formData: {},
         modalOpen: false,
      };
    },
    props:{
      component: {
        type: String,
        required: true
      }
    },
    mounted() {
      this.formStructure();
    },
    methods:{
        formStructure(){
            const urlBase = localStorage.getItem('urlBase');
            const clientId = localStorage.getItem("clientId");
            axios
                .get(urlBase + 'api/form/'+clientId+'/' +this.component)
                .then(response => {
                  console.log(response.data.structure);
                  this.formFields = response.data.structure ?? [];
                })
                .catch(error => {
                this.errorMessage = 'Se produjo un erro al consultar datos. Por favor, inténtalo de nuevo.'; // Mostrar mensaje de error
                // Ocurrió un error al enviar la solicitud
                console.error(error); // Imprime el error en la consola
                // Puedes mostrar un mensaje de error aquí
                });
        },
        openModal() {
          this.modalOpen = true;
        },
        closeModal(){
          this.modalOpen = false;
        },
        submitForm() {
          const urlBase = localStorage.getItem('urlBase');
          const clientId = localStorage.getItem("clientId");
          const requestBody = this.formData;
          console.log(requestBody);

          const config = {
            headers: {
              Authorization: 'Bearer '+ localStorage.getItem('userToken')
            }
          };

          axios.post(urlBase + 'api/component/'+clientId+'/'+this.component, requestBody, config)
            .then(response => {
              console.log('Respuesta:', response.data);
              if(response.status == 201){
                this.$emit('submit-clicked',{
                  component: this.component,
                  activeComponent: true,
                  message: response.data.message
                });


              }
              // Realizar acciones después de la solicitud exitosa
            })
            .catch(error => {
              console.error('Error:', error);
              // Realizar acciones en caso de error
            });

          this.modalOpen = false;
        },
    }
  };
</script>

<style scoped>
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
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  max-width: 400px;
}

.modal-content form {
  margin-bottom: 0;
}

.header-modal {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}

.v-menu__content {
  z-index: 9999;
}
</style>
  