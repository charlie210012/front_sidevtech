<template>
  <div>
    <div class="floating-container d-flex justify-content-center align-items-center" :style="containerStyle" v-if="!chatOpen">
      <button class="floating-button" @click="handleButtonClick">
        <img src="./assets/sai.png" style="width: 100%; height: 100%; border-radius: 50%;" alt="Logo de nuestro asistente virtual" srcset="">
      </button>
    </div>

    <div v-if="chatOpen" class="chat-container">
      <div class="chat-header">
        <span>Sistema de Asistencia Inteligente (SAI)</span>
        <UpdateFormDinamic v-if="gestion && countPrinciples" :component="component" :data="principles" @update="handleUpdate" />
        <FormDinamic :component="component" v-if="gestion && !countPrinciples" @submit-clicked="handleEvento" />
        <button class="close-button" @click="closeChat">×</button>
      </div>

      <div class="chat-messages">
        <div
          v-for="message in messages"
          class="chat-message"
          :key="message.id"
          :class="{'chatbot-message-bot': message.sender === 'bot', 'chatbot-message-user': message.sender === 'user'}"
        >
          <img :src="message.sender == 'bot' ? imageSai : imageUser" alt="">
          <p class="chatbot-message-text">{{ message.content }}</p>
        </div>
        <div class="chatbot-message" v-show="consult">
          <img :src="imageSai" alt="">
          <v-progress-circular
            indeterminate
            size="24"
            color="primary"
          ></v-progress-circular>
          <p class="chatbot-message-text">Procesando .....</p>
        </div>
      </div>
      <div class="chat-input-container">
        <input v-model="inputMessage" class="chat-input" placeholder="Escribe un mensaje" @keyup.enter="sendMessage">
        <button class="chat-send-button" @click="sendMessage">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {VProgressCircular} from 'vuetify/components';
import UpdateFormDinamic from "@/components/utils/UpdateFormDinamic.vue";
import FormDinamic from "@/components/utils/FormDinamic.vue";
const format = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false, timeZone: 'America/Bogota' };
export default {
  props:{
    gestion: {
      type: Boolean,
      required: false,
    }
  },
  components:{
    FormDinamic,
    UpdateFormDinamic,
    VProgressCircular
  },
  data() {
    return {
      consult: false,
      component: 'ChatBot',
      countPrinciples:false,
      principles:[],
      messages: [],
      imageUser: require('../../ia/assets/images/SaiCloud.svg'),
      imageSai: require('../../ia/assets/images/sai.png'),
      containerStyle: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999',
        transition: 'bottom 0.3s',
      },
      chatOpen: false,
      inputMessage: '',
    };
  },
  mounted() {
    this.getServicesSection();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    getServicesSection() {
      const urlBase = localStorage.getItem('urlBase');
      const clientId = localStorage.getItem("clientId");
      axios
        .get(urlBase + 'api/component/'+clientId+'/' + this.component)
        .then(response => {
          this.principles = response.data.data ?? [];
          if(this.principles.length !== 0){
            this.countPrinciples = true;
          }
        })
        .catch(error => {
          this.errorMessage = 'Se produjo un erro al consultar datos. Por favor, inténtalo de nuevo.'; // Mostrar mensaje de error
          // Ocurrió un error al enviar la solicitud
          console.error(error); // Imprime el error en la consola
          // Puedes mostrar un mensaje de error aquí
        });
    },
    handleEvento() {
      this.getServicesSection();
    },
    handleUpdate(){
      this.getServicesSection();
    },
    addMessage(message) {
      this.messages.push(message);
      // Desplazarse al final del chat para mostrar el último mensaje
      this.$nextTick(() => {
        const chatBody = document.querySelector('.chat-messages');
        chatBody.scrollTop = chatBody.scrollHeight;
      });
    },
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      this.containerStyle.bottom = scrollTop > 0 ? '20px' : '100px';
    },
    handleResize() {
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (screenWidth < 600) {
        this.containerStyle.width = '60px';
        this.containerStyle.height = '60px';
      } else {
        this.containerStyle.width = '80px';
        this.containerStyle.height = '80px';
      }
    },
    handleButtonClick() {
      this.chatOpen = !this.chatOpen;
    },
    sendMessage() {
      const message = this.inputMessage.trim();
      if (message !== '') {
        this.messages.push({ id: Date.now(), sender: 'user', content: message , activeComponent:false, component: '' });
        // Lógica para procesar la respuesta del chatbot
        this.inputMessage = '';

        this.$nextTick(() => {
          const chatBody = document.querySelector('.chatbot-messages');
          chatBody.scrollTop = chatBody.scrollHeight;
        });

        this.sendServices(message);
      }
    },
    sendServices(message){
      this.consult = true;
      const urlBase = localStorage.getItem('urlBase');
      axios.post(urlBase + 'api/sai/send', {
        message: message,
        alarm: true,
        component:this.component,
        clientId: localStorage.getItem('clientId'),
      }, {headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },})
        .then(response => {

          console.log(response.data);

          this.consult = false;
          // Agregar la respuesta del servidor al chat
          this.addMessage({
            id:1,
            sender: 'bot',
            content: response.data.message,
            link: '',
            activeComponent: response.data.activeComponent ?? false,
            component: response.data.component ?? null,
            timestamp: new Date().toLocaleTimeString('es-ES',format)
          });

          this.$nextTick(() => {
            const chatBody = document.querySelector('.chatbot-messages');
            chatBody.scrollTop = chatBody.scrollHeight;
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    closeChat() {
      this.chatOpen = false;
    },
  },
};
</script>

<style>
.floating-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #007bff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.floating-button {
  width: 100%;
  height: 100%;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.chat-container {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 38%;
  max-width: calc(100% - 40px);
  height: 410px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  font-family: Arial, sans-serif;
  z-index: 9999;
}

.chat-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  color: #ffffff;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  height: 60px; /* Ajusta la altura según tus necesidades */
}

.chat-header span {
  margin: 0 auto; /* Alinea el texto al centro horizontalmente */
}


.chat-messages {
  height: 68%;
  padding: 5px;
  overflow-y: scroll;
}

.chat-message {
  margin-bottom: 10px;
}

.chat-input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
}

.chat-input {
  flex: 1;
  padding: 6px;
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.chat-send-button {
  margin-left: 10px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #ffffff;
  cursor: pointer;
}

.close-button {
  border: none;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
}

.chatbot-message-bot {
  background-color: #f1f1f1;
}

.chatbot-message-user {
  background-color: #d8e2fc;
  text-align: right;
}

.chatbot-message-text {
  margin: 0;
}

.chatbot-message img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
