<template>
  <header :class="{'header-scrolled': isHeaderScrolled}" id="header" class="fixed-top">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="logo">
        <img src="./assets/logo-blanco.png" id="logo" class="" alt="logo">
      </div>
      
      <nav class="nav-menu d-lg-flex align-items-right">
        <ul v-if="!isMobile || isMobileMenuOpen">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#about">Acerca de Nosotros</a></li>
          <li><a href="#services">Servicios</a></li>
          <li><a href="#portfolio">Portafolio</a></li>
          <li><a href="#contact">Contacto</a></li>
          <li><a href="https://intelligentsai.sidevtech.com/login" target="_blank" class="get-started-btn scrollto">Iniciar Sesion</a></li>
        </ul>
        
        <div class="mobile-menu" v-if="isMobile">
          <MenuDesplegable v-if="isMobile" />
        </div>
      </nav>
    </div>

    

    <!-- Ventana emergente del menú -->
    <!-- <b-modal v-if="isMobile" v-model="isMobileMenuOpen" title="Menú" @onClick="toggleMobileMenu">
      <ul>
        <li class="active"><a href="index">Home</a></li>
        <li><a href="#about">Acerca de Nosotros</a></li>
        <li><a href="#services">Servicios</a></li>
        <li><a href="#portfolio">Portafolio</a></li>
        <li><a href="#contact">Contacto</a></li>
        <li><a href="http://admin.sidevtech.com/" target="_blank">Iniciar Sesion</a></li>
      </ul>
    </b-modal> -->
  </header>
</template>

<script>

import MenuDesplegable from '@/components/utils/MenuDesplegable.vue'
export default {
  name: 'HeaderApp',
  components: {
    MenuDesplegable
  },
  data() {
    return {
      isHeaderScrolled: false,
      isMobile: false,
      isMobileMenuOpen: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.checkScreenWidth);
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.pageYOffset;
      const normalPosition = 0; // Posición normal del scroll donde el color de fondo es transparente

      this.isHeaderScrolled = scrollPosition > normalPosition;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    checkScreenWidth() {
      this.isMobile = window.innerWidth <= 1024;
      console.log(this.isMobile);
    }
  }
}
</script>

<style scoped>
/*--------------------------------------------------------------
# Header
--------------------------------------------------------------*/
#header {
  transition: all 0.5s;
  z-index: 997;
  padding: 15px 0;
}

#header.header-scrolled {
  background: rgba(40, 58, 90, 0.9);
}

#header .logo {
  font-size: 30px;
  margin: 0;
  padding: 0;
  line-height: 1;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
}

#header .logo a {
  color: #fff;
  text-decoration: none;
}

#header .logo img {
  width: 100%;
  height: 100%;
}

#header ul {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

#header ul li {
  margin-right: 20px;
}

#header ul li:last-child {
  margin-right: 0;
}

#header ul li a {
  display: block;
  color: #fff;
  text-decoration: none;
  transition: 0.3s;
}

#header ul li a:hover {
  color: #9c9c9c;
}

.mobile-menu {
  display: none;
}

.mobile-menu span {
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.mobile-menu span.active {
  color: #9c9c9c;
}

/* Estilos para dispositivos móviles */
@media (max-width: 992px) {
  #header .logo {
    font-size: 24px;
  }

  #header .logo img {
    width: 50%;
    height: 50%;
  }

  #header ul {
    display: none;
  }

  .mobile-menu {
    display: block;
  }
}
</style>
