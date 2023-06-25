<template>
  <header 
  class="header-scrolled"
  :class="{
    'header-scrolled': isHeaderScrolled, 
    'fixed-top': !gestion,
    'header-transparent': gestion?!gestion:scrollPosition === 0,
    }" id="header">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="logo">
        <img src="./assets/logo-blanco.png" id="logo" class="" alt="logo">
      </div>
      
      <nav class="nav-menu d-lg-flex align-items-right">
        <ul v-if="!isMobile || isMobileMenuOpen">
          <li class="active"><a href="#">Home</a></li>
          <li v-for = "(menu,index) in menus" :key="index">
            <a :href="menu.link">
              {{menu.title}}
              <div class="col-auto text-right" v-if = "gestion">
                <span class="mr-2">
                  <DeleteCustom :id="menu.id" @deleted="handleEvento" />
                </span>
                <span>
                  <UpdateFormDinamic :component="component" :data = "menu" @update="handleUpdate"/>
                </span>
              </div>
            </a>
          </li>
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
  <FormDinamic :component = "component" v-if ="gestion" @submit-clicked = "handleEvento"/>
</template>

<script>

import axios from "axios";
import DeleteCustom from "@/components/utils/DeleteCustom.vue";
import FormDinamic from "@/components/utils/FormDinamic.vue";
import UpdateFormDinamic from "@/components/utils/UpdateFormDinamic.vue";

import MenuDesplegable from '@/components/utils/MenuDesplegable.vue'
export default {
  components: {
    MenuDesplegable,
    DeleteCustom,
    UpdateFormDinamic,
    FormDinamic
  },
  props:{
    gestion: {
      type: Boolean,
      required: false,
    }
  },
  data() {
    return {
      isHeaderScrolled: false,
      isMobile: false,
      isMobileMenuOpen: false,
      component:'HeaderApp',
      menus: [],
      scrollPosition: 0
    };
  },
  mounted() {
    this.getServicesSection();
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
      this.scrollPosition = window.pageYOffset;
      const normalPosition = 0;
      this.isHeaderScrolled = this.scrollPosition > normalPosition;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    checkScreenWidth() {
      this.isMobile = window.innerWidth <= 1024;
    },
    async getServicesSection() {
      const urlBase = localStorage.getItem('urlBase');
      const clientId = localStorage.getItem("clientId");
      axios
        .get(urlBase + 'api/component/'+clientId+'/' + this.component)
        .then(response => {
          this.menus = response.data.data ?? [];
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
  z-index: 9999;
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

/*--------------------------------------------------------------
# Navigation Menu
--------------------------------------------------------------*/
/* Desktop Navigation */
.nav-menu ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-menu > ul {
  display: flex;
}

.nav-menu > ul > li {
  position: relative;
  white-space: nowrap;
  padding: 10px 0 10px 28px;
}

.nav-menu a {
  display: block;
  position: relative;
  color: #fff;
  transition: 0.3s;
  font-size: 15px;
  letter-spacing: 0.5px;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
  text-decoration: none;
}

.nav-menu a:hover, .nav-menu .active > a, .nav-menu li:hover > a {
  color: #47b2e4;
}

.nav-menu .drop-down ul {
  border-radius: 8px;
  display: block;
  position: absolute;
  left: 14px;
  top: calc(100% + 30px);
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  padding: 10px 0;
  background: #fff;
  box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
  transition: 0.3s;
}

.nav-menu .drop-down:hover > ul {
  opacity: 1;
  top: 100%;
  visibility: visible;
}

.nav-menu .drop-down li {
  min-width: 180px;
  position: relative;
}

.nav-menu .drop-down ul a {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  text-transform: none;
  color: #0c3c53;
}

.nav-menu .drop-down ul a:hover, .nav-menu .drop-down ul .active > a, .nav-menu .drop-down ul li:hover > a {
  color: #47b2e4;
}

.nav-menu .drop-down > a:after {
  content: "\ea99";
  font-family: IcoFont;
  padding-left: 5px;
}

.nav-menu .drop-down .drop-down ul {
  top: 0;
  left: calc(100% - 30px);
}

.nav-menu .drop-down .drop-down:hover > ul {
  opacity: 1;
  top: 0;
  left: 100%;
}

.nav-menu .drop-down .drop-down > a {
  padding-right: 35px;
}

.nav-menu .drop-down .drop-down > a:after {
  content: "\eaa0";
  font-family: IcoFont;
  position: absolute;
  right: 15px;
}

@media (max-width: 1366px) {
  .nav-menu .drop-down .drop-down ul {
    left: -90%;
  }
  .nav-menu .drop-down .drop-down:hover > ul {
    left: -100%;
  }
  .nav-menu .drop-down .drop-down > a:after {
    content: "\ea9d";
  }
}

/* Get Startet Button */
.get-started-btn {
  margin-left: 25px;
  color: #fff;
  border-radius: 50px;
  padding: 6px 25px 7px 25px;
  white-space: nowrap;
  transition: 0.3s;
  font-size: 14px;
  display: inline-block;
  border: 2px solid #47b2e4;
  font-weight: 600;
}

.get-started-btn:hover {
  background: #31a9e1;
  color: #fff;
}

#header.header-transparent {
  background: transparent;
}


</style>
