<template>
    <div>
      <div class="floating-container" :style="containerStyle" v-if="!chatOpen">
        <button class="floating-button" @click="handleButtonClick">
          <img src="./assets/sai.png" style="width: 100%; height: 100%; border-radius: 50%;" alt="Logo de nuestro asistente virtual" srcset="">
        </button>
      </div>
  
      <div v-if="chatOpen" class="chat-container">
        <div class="chat-header">
          <span>Chat</span> 
          <button class="close-button" @click="closeChat">×</button>
        </div>
        
        <div class="chat-messages">
          <div v-for="message in chatMessages" class="chat-message" :key="message.id">{{ message.text }}</div>
        </div>
        <div class="chat-input-container">
          <input v-model="inputMessage" class="chat-input" placeholder="Escribe un mensaje">
          <button class="chat-send-button" @click="sendMessage">Enviar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        containerStyle: {
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: '9999',
          transition: 'bottom 0.3s',
        },
        chatOpen: false,
        chatMessages: [
          { id: 1, text: 'Hola, me encanta saludarte' },
          { id: 2, text: 'Quiero comentarte que aún estoy en desarrollo y próximamente me integraré con una inteligencia artificial. ¿No te parece increíble? Pronto contaré con más capacidades para asistirte en todo lo que necesites.' },
        ],
        inputMessage: '',
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
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
        if (this.inputMessage.trim() !== '') {
          this.chatMessages.push({id:3, text: this.inputMessage});
          this.inputMessage = '';
        }
      },
      closeChat() {
        this.chatOpen = false;
      },
    },
  };
  </script>
  
  <style>
  .floating-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #007bff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .floating-button {
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
    width: 300px;
    max-width: 90vw;
    height: 400px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    font-family: Arial, sans-serif;
  }
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    background-color: #007bff;
    color: #ffffff;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  
  .chat-messages {
    height: 300px;
    padding: 10px;
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
    padding: 0;
  }
  </style>
  