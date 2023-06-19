<template>
    <div>
      <div class="menu-icon" @click="toggleMenu">
        <i class="icofont-navigation-menu"></i>
      </div>
      <div class="sidebar-overlay" :class="{ 'overlay-open': isMenuOpen }" @click="toggleMenu"></div>
      <div class="sidebar" :class="{ 'sidebar-open': isMenuOpen }">
        <ul>
          <li class="active"><a href="index">Home</a></li>
          <li><a href="#about">Acerca de Nosotros</a></li>
          <li><a href="#services">Servicios</a></li>
          <li><a href="#portfolio">Portafolio</a></li>
          <li><a href="#contact">Contacto</a></li>
          <li><a href="http://admin.sidevtech.com/" target="_blank" class="get-started-btn">Iniciar Sesion</a></li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMenuOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .menu-icon {
    cursor: pointer;
    color: #fff;
    font-size: 24px;
  }
  
  .sidebar {
    width: 200px;
    height: 100vh;
    background-color: rgba(40, 58, 90, 0.9);
    position: fixed;
    top: 0;
    left: -200px;
    transition: left 0.3s;
    padding: 20px;
    z-index: 1000;
  }
  
  .sidebar-open {
    left: 0;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    margin-bottom: 10px;
  }
  
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }
  
  .overlay-open {
    opacity: 1;
    pointer-events: auto;
  }

.get-started-btn {
  color: #fff;
  border-radius: 50px;
  white-space: nowrap;
  transition: 0.3s;
  font-size: 14px;
  display: inline-flex;
  border: 2px solid #47b2e4;
  font-weight: 600;
  min-width: fit-content;
}

.get-started-btn:hover {
  background-color: #47b2e4;
}
  </style>
  