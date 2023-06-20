<template>
    <i class="icofont-pencil-alt-2" @click="openModal"></i>
    <div v-if="modalOpen" class="modal-overlay" style ="text-align: left;">
      <div class="modal-content">
        <div class="header-modal">
          <h3 v-if="component != 'ChatBot'">Actualizar</h3>
          <p :class="{ 'text-black': component === 'ChatBot' }" v-else>Actualiza la información de tu empresa</p>
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
                v-else-if="field.type === 'file'"
                :type="field.type"
                :id="field.name"
                :name="field.name"
                class="form-control"
                @change="handleFileUpload"
              />
              <div v-else-if="field.type === 'multi-text'">
                <div v-for="(value, valueIndex) in formData[field.name]" :key="valueIndex">
                  <input
                    :type="field.subType || 'text'"
                    :id="field.name + '-' + valueIndex"
                    :name="field.name"
                    :placeholder="field.placeholder"
                    class="form-control"
                    v-model="formData[field.name][valueIndex]"
                  />
                  <button type="button" class="btn btn-danger" @click="removeDescriptionField(field.name, valueIndex)">Quitar</button>
                </div>
                <button type="button" class="btn btn-primary" @click="addDescriptionField(field.name)">Agregar</button>
              </div>
              <input
                v-else
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
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props:{
      component: {
        type: String,
        required: true
      },
      data: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        modalOpen: false,
        formFields: [],
        formData: {},
        iconOptions: [
          { text: 'Home', value: 'icofont-home' },
          { text: 'User', value: 'icofont-user' },
          { text: 'Settings', value: 'icofont-settings' },
          { text: 'Search', value: 'icofont-search' },
          { text: 'Mail', value: 'icofont-mail' },
          { text: 'Heart', value: 'icofont-heart' },
          { text: 'Star', value: 'icofont-star' },
          { text: 'Download', value: 'icofont-download' },
          { text: 'Upload', value: 'icofont-upload' },
          { text: 'Lock', value: 'icofont-lock' },
          { text: 'Unlock', value: 'icofont-unlock' },
          { text: 'Phone', value: 'icofont-phone' },
          { text: 'Email', value: 'icofont-email' },
          { text: 'Chat', value: 'icofont-chat' },
          { text: 'Calendar', value: 'icofont-calendar' },
          { text: 'Clock', value: 'icofont-clock' },
          { text: 'Globe', value: 'icofont-globe' },
          { text: 'Location', value: 'icofont-location' },
          { text: 'Compass', value: 'icofont-compass' },
          { text: 'Flag', value: 'icofont-flag' },
          { text: 'Shopping Cart', value: 'icofont-shopping-cart' },
          { text: 'Currency Exchange', value: 'icofont-exchange' },
          { text: 'Credit Card', value: 'icofont-credit-card' },
          { text: 'Truck', value: 'icofont-truck' },
          { text: 'Airplane', value: 'icofont-airplane' },
          { text: 'Train', value: 'icofont-train' },
          { text: 'Ship', value: 'icofont-ship' },
          { text: 'Book', value: 'icofont-book' },
          { text: 'Pencil', value: 'icofont-pencil' },
          { text: 'Paper', value: 'icofont-paper' },
          { text: 'Clipboard', value: 'icofont-clipboard' },
          { text: 'Folder', value: 'icofont-folder' },
          { text: 'Image', value: 'icofont-image' },
          { text: 'Video', value: 'icofont-video' },
          { text: 'Music', value: 'icofont-music' },
          { text: 'Play', value: 'icofont-play' },
          { text: 'Pause', value: 'icofont-pause' },
          { text: 'Stop', value: 'icofont-stop' },
          { text: 'Next', value: 'icofont-next' },
          { text: 'Previous', value: 'icofont-previous' },
          {text: 'Stop', value: 'icofont-stop' },
          { text: 'web',value: 'icofont-web'},
          {text:'computer',value:'icofont-computer'},
          {text:'dashboard',value:'icofont-dashboard-web'},
  
        ]
      };
    },
    mounted() {
      this.formStructure();
    },
    methods: {
      removeDescriptionField(fieldName, index) {
        if (Array.isArray(this.formData[fieldName])) {
          this.formData[fieldName].splice(index, 1); // Elimina el campo en el índice específico del array
        }
      },
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
        this.formData = this.data;
        
      },
      closeModal(){
        this.modalOpen = false;
      },
      submitForm() {
        const urlBase = localStorage.getItem('urlBase');
        const url = urlBase + "api/data/"+this.component+"/"+this.data.id;
        const token = "Bearer " + localStorage.getItem('userToken');
  
        const data = this.formData;
  
        axios
          .post(url, data, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            if(response.status == 200){
                  this.$emit('update');
              }
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            // Limpiar los campos del formulario o realizar acciones adicionales después de enviar la solicitud
            this.icon = '';
            this.link = '';
            this.title = '';
            this.description = '';
            this.modalOpen = false;
          });
      },
      handleMouseOut(event) {
        // Verificar si el cursor ha salido completamente del contenedor del componente
        if (!event.currentTarget.contains(event.relatedTarget)) {
          this.closeModal();
        }
      },
      getIcon(icon){
        this.selectedIcon = icon;
        console.log(icon);
      },
      handleFileUpload(event) {
          const file = event.target.files[0];
          const reader = new FileReader();

          reader.onload = () => {
            const fileData = reader.result;

            // Guarda los datos de la imagen en el objeto formData
            this.formData[event.target.name] = fileData;
          };

          reader.readAsDataURL(file);
      },
      addDescriptionField(fieldName) {
        if (Array.isArray(this.formData[fieldName])) {
          this.formData[fieldName].push(''); // Agrega una nueva descripción vacía al array
        } else {
          this.formData[fieldName] = ['']; // Crea un nuevo array con una descripción vacía
        }
      }
    },
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
    z-index: 9999; /* Asegúrate de que el z-index sea superior a otros elementos en la página */
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    max-width: 400px;
  }
  
  .header-modal {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }
  
  /* Añade estilos adicionales según sea necesario para que el componente se vea profesional */
  </style>
  