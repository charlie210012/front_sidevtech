<template>
  <div class="chatbot-container" id="chat-body">
    <div class="chatbot-header bg-dark text-light">
      <img src="./assets/images/sai.png" alt="Chatbot Avatar" class="chatbot-avatar">
      <h3 class="chatbot-title">Sistema de Asistencia Inteligente (SAI)</h3>
      <select 
        id="business" 
        name="business" 
        class="form-select ml-auto"
        v-model="selectedBusiness"
        @change="changeClient"
      >
        <option v-for="(business, index) in businesses" :value="business.business_id" :key="index">{{ business.name }}</option>
      </select>
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
import ButtonComponents from "../utils/ButtonComponents.vue";
import ButtonPreview from "../utils/ButtonPreview.vue";
import ConstructorComponent from "../utils/ConstructorComponent.vue";
import ContinueConstructorComponent from "../utils/ContinueConstructorComponent.vue";
import moment from 'moment';


const format = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false, timeZone: 'America/Bogota' };

export default {
 
  data() {
    return {
      messages: [],
      refPayco: null,
      structure: [],
      businesses : [],
      selectedBusiness: '',
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
    ButtonComponents,
    ButtonPreview,
    ConstructorComponent,
    ContinueConstructorComponent,
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

          this.consult = false;
          // Agregar la respuesta del servidor al chat
          if(this.structure.length == 0){
            this.addMessage({
              id:1,
              sender: 'bot',
              content: 'Aun no has creado una pagina web para tu empresa, Quieres crear una?',
              link: '',
              activeComponent: response.data.activeComponent ?? false,
              component: 'ConstructorComponent',
              timestamp: new Date().toLocaleTimeString('es-ES',format)
            });
          }else{
            this.addMessage({
              id:1,
              sender: 'bot',
              content: response.data.message,
              link: '',
              activeComponent: response.data.activeComponent ?? false,
              component: response.data.component ?? null,
              timestamp: new Date().toLocaleTimeString('es-ES',format)
            });
          }
          

         

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
    },
    getServicesSection() {
      const urlBase = localStorage.getItem('urlBase');
      const clientId = localStorage.getItem('clientId');

      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('userToken')
        }
      };

      axios
        .get(urlBase + 'api/web/' + clientId + '/structure', config)
        .then(response => {
          this.structure = response.data.structure ?? [];

          const componentPromises = this.structure.map(element => {
            if (element.component) {
              return import(`../webs/${element.component}.vue`).then(({ default: component }) => {
                return { key: element.key, component };
              });
            }
          });

          Promise.all(componentPromises).then(components => {
            components.forEach(({ key, component }) => {
              // Asignar el componente al objeto $options.components
              this.$options.components[key] = component;
            });
          });
        })
        .catch(error => {
          this.errorMessage =
            'Se produjo un error al consultar datos. Por favor, inténtalo de nuevo.'; // Mostrar mensaje de error
          // Ocurrió un error al enviar la solicitud
          console.error(error); // Imprime el error en la consola
          // Puedes mostrar un mensaje de error aquí
        });
    },
    getClients() {
      const urlBase = localStorage.getItem('urlBase');

      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('userToken')
        }
      };

      axios
        .get(urlBase + 'api/business', config)
        .then(response => {
          this.businesses = response.data.businesses;
          localStorage.setItem('businesses', JSON.stringify(this.businesses));
          this.selectedBusiness = localStorage.getItem("clientId");
          this.getServicesSection();
          
        })
        .catch(error => {
          this.errorMessage =
            'Se produjo un error al consultar datos. Por favor, inténtalo de nuevo.'; // Mostrar mensaje de error
          // Ocurrió un error al enviar la solicitud
          console.error(error); // Imprime el error en la consola
          // Puedes mostrar un mensaje de error aquí
        });
    },
    changeClient(){
      localStorage.setItem("clientId", this.selectedBusiness);
      this.getServicesSection();
    },
    getTransacion(){
      const urlBase = "https://secure.epayco.co/validation/v1/reference/";

      axios
        .get(urlBase + this.refPayco)
        .then(response => {
          console.log(response.data.data);
          // Parsea la fecha utilizando Moment.js
          let date = moment(response.data.data.x_fecha_transaccion, 'YYYY-MM-DD HH:mm:ss');

          // Suma 6 meses a la fecha
          let newDate = date.add(6, 'months');

          // Obtén la nueva fecha en el formato deseado
          let finalDate = newDate.format('YYYY-MM-DD HH:mm:ss');
          const data = {
            transaction_id: this.refPayco,
            description: response.data.data.x_description,
            amount: response.data.data.x_amount,
            status: response.data.data.x_response_reason_text == "Aprobada"?1:0,
            payer_name: response.data.data.x_customer_name,
            business_id: localStorage.getItem("clientId"),
            payment_date: response.data.data.x_fecha_transaccion,
            expiration_date: finalDate,
            payer_email: response.data.data.x_customer_email,
            data: JSON.stringify(response.data.data)
          }

          this.registerTransaccion(data);
          // this.businesses = response.data.businesses;
          // localStorage.setItem('businesses', JSON.stringify(this.businesses));
          // this.selectedBusiness = localStorage.getItem("clientId");
          // this.getServicesSection();
          
        })
        .catch(error => {
          this.errorMessage =
            'Se produjo un error al consultar datos. Por favor, inténtalo de nuevo.'; // Mostrar mensaje de error
          // Ocurrió un error al enviar la solicitud
          console.error(error); // Imprime el error en la consola
          // Puedes mostrar un mensaje de error aquí
        });
    },
    async registerTransaccion(data) {
      const urlBase = localStorage.getItem('urlBase');
      const clientId = localStorage.getItem("clientId");
      const requestBody = data;

      const config = {
        headers: {
          Authorization: 'Bearer '+ localStorage.getItem('userToken')
        }
      };

      axios.post(urlBase + 'api/payment/'+clientId, requestBody, config)
        .then(response => {
          console.log(response.data);
          
          // Realizar acciones después de la solicitud exitosa
        })
        .catch(error => {
          console.error('Error:', error);
          // Realizar acciones en caso de error
        });

      this.modalOpen = false;
    },
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

    if(this.refPayco != null) {
      this.getTransacion();
      setTimeout(() => {
        this.addMessage({
            id:1,
            sender: 'bot',
            content: "Tu pago fue realizado con exito, ya puedes publicar tu pagina web",
            link: '',
            activeComponent:true,
            component:ButtonPreview,
            timestamp: new Date().toLocaleTimeString('es-ES',format)
        });
    }, 1200);
    }

    this.getServicesSection(); 
    this.getClients();
   
  },
  created() {
    this.getClients();
    this.refPayco = this.$route.query.ref_payco;
  },
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

.form-select{
  width: 20%;
}
</style>
