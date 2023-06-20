<template>
  <div class="chatbot-container" id="chat-body">
    <div class="chatbot-header bg-dark text-light">
      <img src="./assets/images/sai.png" alt="Chatbot Avatar" class="chatbot-avatar">
      <h3 class="chatbot-title">Sistema de Asistencia Inteligente (SAI)</h3>
      <button class="logout-button ml-auto" @click="logout">Cerrar sesión</button>
    </div>
    <div class="chatbot-messages">
      <div v-for="message in messages" :key="message.id" class="chatbot-message" :class="{'chatbot-message-bot': message.sender === 'bot', 'chatbot-message-user': message.sender === 'user'}">
          <img :src="message.sender == 'bot' ?imageSai:imageUser" alt="">
          <p class="chatbot-message-text">{{ message.content }}</p>
          <div class="container" style="overflow: visible; padding: 5px;">
            <div v-if="message.activeComponent" class="component-container" style="overflow: hidden; padding: 20px;">
              <component :gestion="gestion" :is="message.component" @submit-clicked="handleEvento" />
            </div>
          </div>
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
      <div class="chatbot-input-container">
        <input type="text" 
        v-model="inputMessage" 
        class="chatbot-input form-control" 
        placeholder="Escribe tu mensaje..."
        @keyup.enter="sendMessage"
        >
        <button class="chatbot-send btn btn-primary" @click="sendMessage">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {VProgressCircular} from 'vuetify/components';
const dir = localStorage.getItem("clientId");
const ServicesSection = dir != null ? require(`../webs/${dir}/ServicesSection.vue`).default : null;
const ServicesForm = dir != null ? require(`../webs/${dir}/forms/ServicesForm.vue`).default : null;
const WhyUsSection = dir != null ? require(`../webs/${dir}/WhyUsSection.vue`).default : null;
const TeamSection = dir != null ? require(`../webs/${dir}/TeamSection.vue`).default : null;
const AboutSection = dir != null ? require(`../webs/${dir}/AboutSection.vue`).default : null;
const ChatBot = dir != null ? require(`../webs/${dir}/ChatBot.vue`).default : null;
const ContactSection = dir != null ? require(`../webs/${dir}/ContactSection.vue`).default : null;
const CTASection = dir != null ? require(`../webs/${dir}/CTASection.vue`).default : null;
const FooterApp = dir != null ? require(`../webs/${dir}/FooterApp.vue`).default : null;
const HeaderApp = dir != null ? require(`../webs/${dir}/HeaderApp.vue`).default : null;
const HeroSection = dir != null ? require(`../webs/${dir}/HeroSection.vue`).default : null;
const PortfolioSection = dir != null ? require(`../webs/${dir}/PortfolioSection.vue`).default : null;
const PricingSection = dir != null ? require(`../webs/${dir}/PricingSection.vue`).default : null;
const SkillsSection = dir != null ? require(`../webs/${dir}/SkillsSection.vue`).default : null;
import ButtonComponents from "../utils/ButtonComponents.vue";
import ButtonPreview from "../utils/ButtonPreview.vue";

const format = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false, timeZone: 'America/Bogota' };

export default {
 
  data() {
    return {
      messages: [],
      inputMessage: '',
      imageUser: require('./assets/images/SaiCloud.svg'),
      imageSai: require('./assets/images/sai.png'),
      consult: false,
      gestion: true,
      activeComponent: false,
      component: '',
      iconOptions: [
          'icono1',
          'icono2',
          'icono3',
        ],
    };
  },
  components:{
    VProgressCircular,
    ServicesSection,
    ServicesForm,
    WhyUsSection,
    TeamSection,
    AboutSection,
    ChatBot,
    ContactSection,
    CTASection,
    FooterApp,
    HeaderApp,
    HeroSection,
    PortfolioSection,
    PricingSection,
    SkillsSection,
    ButtonComponents,
    ButtonPreview
},
  methods: {
    toggleChatbot() {
      // Lógica para mostrar/ocultar el chatbot
    },
    addMessage(message) {
        this.messages.push(message);
        // Desplazarse al final del chat para mostrar el último mensaje
        this.$nextTick(() => {
          const chatBody = document.querySelector('.chatbot-messages');
          chatBody.scrollTop = chatBody.scrollHeight;
        });
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
          message: message
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
    handleEvento(payload){
      this.addMessage({
        id: Date.now(),
        sender: 'bot',
        content: payload.message,
        link: '',
        activeComponent: payload.activeComponent ?? false,
        component: payload.component ?? null,
        timestamp: new Date().toLocaleTimeString('es-ES',format)
      });
    },
    logout() {
    // Realiza las acciones necesarias para cerrar la sesión del usuario
    // Por ejemplo, puedes borrar el token de acceso almacenado en el local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('clientId');
    localStorage.removeItem('userToken');
    // Redirecciona al usuario a la página de inicio de sesión
    this.$router.push('/login');
  }

  },
  mounted() {
    setTimeout(() => {
        this.addMessage({
            id:1,
            sender: 'bot',
            content: "Bienvenido, yo soy Sai, tu asistente inteligente, pregunta por mis funcionalidades desarrolladas",
            link: '',
            activeComponent:false,
            component:null,
            timestamp: new Date().toLocaleTimeString('es-ES',format)
        });
    }, 1000);
  }
};
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: calc(100% - 40px);
  height: 100%;
  max-height: calc(100% - 40px);
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  z-index: 1000;
}


.chatbot-header {
  padding: 10px;
  color: #fff;
  display: flex;
  align-items: center;
}

.chatbot-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.chatbot-title {
  margin: 0;
  font-size: 16px;
}

.chatbot-close {
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

.chatbot-messages {
  flex: 1;
  max-height: calc(100% - 130px);
  overflow-y: auto;
  padding: 10px;
}

.chatbot-message {
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 8px;
}

.chatbot-message img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
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

.chatbot-input-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
}

.chatbot-input {
  flex: 1;
  margin-right: 5px;
}

@media (max-width: 768px) {
  .chatbot-container {
    width: 90%;
    max-width: 90%;
    height: 90%;
    max-height: 90%;
  }
}
</style>
