<template>
  <div>
    <button class="btn btn-primary" @click="openModal">Crear Nuevo Servicio</button>

    <div v-if="modalOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="header-modal">
          <h3>Registrar</h3>
          <button @click="closeModal">X</button>
        </div>
        <form>
          <div class="mb-3">
            <label for="iconSelect" class="form-label">Icono</label>
            <select v-model="icon" 
            class="form-select" 
            id="iconSelect"
            @change="getIcon(icon)"
            >
              <option disabled value="">Seleccione un icono</option>
              <option 
              v-for="(option, index) in iconOptions" 
              :value="option.value" 
              :key="index"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <i :class="selectedIcon"></i>
          </div>
          <div class="mb-3">
            <label for="linkInput" class="form-label">Enlace</label>
            <input v-model="link" type="text" class="form-control" id="linkInput">
          </div>

          <div class="mb-3">
            <label for="titleInput" class="form-label">Título</label>
            <input v-model="title" type="text" class="form-control" id="titleInput">
          </div>

          <div class="mb-3">
            <label for="descriptionTextarea" class="form-label">Descripción</label>
            <textarea v-model="description" class="form-control" id="descriptionTextarea" rows="4"></textarea>
          </div>

          <button type="button" class="btn btn-primary" @click="submitForm">Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      modalOpen: false,
      selectedIcon: null,
      link: '',
      title: '',
      description: '',
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
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal(){
      this.modalOpen = false;
    },
    submitForm() {
      const urlBase = localStorage.getItem('urlBase');
      const clientId = localStorage.getItem("clientId");
      const requestBody = {
        icon: this.icon,
        link: this.link,
        title: this.title,
        description: this.description,
      };

      const config = {
        headers: {
          Authorization: 'Bearer '+ localStorage.getItem('userToken')
        }
      };

      axios.post(urlBase + 'api/component/'+clientId+'/ServicesSection', requestBody, config)
        .then(response => {
          console.log('Respuesta:', response.data);
          if(response.status == 201){
            this.$emit('submit-clicked',{
              component: 'ServicesSection',
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
    getIcon(icon){
      this.selectedIcon = icon;
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
  z-index: 9999;
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
