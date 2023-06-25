<template>
    <div class="floating-button" :class="{ 'left': position === 'left' }" @click="toggleEditable">
      {{ editable ? 'Editable' : 'No editable' }}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        editable: true,
        position: 'left'
      };
    },
    methods: {
      toggleEditable() {
        this.editable = !this.editable;
        this.$emit('gestion');
      }
    }
  };
  </script>
  
  <style scoped>
  .floating-button {
    position: fixed;
    bottom: 20px;
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: left 0.3s;
  }
  
  .left {
    left: 20px;
  }
  
  </style>
  