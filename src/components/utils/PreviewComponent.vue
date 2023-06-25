<template>
  <div>
    <body>
      <ButtonEditable @gestion ="HadleChange" />
      <div v-if="isLoading">
        <div class="loading-circle"></div>
      </div>
      <div v-show="!isLoading">
        <ButtonPayment />
        <div v-for="(seccion, index) in structure" :key="index">
          <component
            v-if="isComponentLoaded(seccion.key)"
            :gestion="gestion"
            :is="seccion.key"
            @submit-clicked="handleEvento"
          />
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import axios from "axios";
import ButtonEditable from "./ButtonEditable.vue";
import ButtonPayment from "./ButtonPayment.vue";

export default {
  data() {
    return {
      business: "",
      structure: [],
      gestion: true,
      isLoading: true,
      loadedComponents: [], // Array para rastrear los componentes cargados
    };
  },
  components: {
    ButtonEditable,
    ButtonPayment,
  },
  methods: {
    getServicesSection() {
      const urlBase = localStorage.getItem("urlBase");
      localStorage.setItem("clientId", this.business);
      const clientId = this.business;

      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      };

      axios
        .get(urlBase + "api/web/" + clientId + "/structure", config)
        .then((response) => {
          this.structure = response.data.structure ?? [];

          const componentPromises = this.structure.map((element) => {
            if (element.component) {
              return import(`../webs/${element.component}.vue`).then(({ default: component }) => {
                return { key: element.key, component };
              });
            } else {
              return Promise.resolve(null); // Devuelve una promesa resuelta con valor null para los elementos sin componente
            }
          });

          Promise.all(componentPromises).then((components) => {
            components.forEach(({ key, component }) => {
              // Asignar el componente al objeto $options.components
              this.$options.components[key] = component;
              this.loadedComponents.push(key); // Registrar el componente cargado
            });

            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
            // Los componentes han sido importados, dejar de mostrar el círculo de carga
          });
        })
        .catch((error) => {
          this.errorMessage =
            "Se produjo un error al consultar datos. Por favor, inténtalo de nuevo."; // Mostrar mensaje de error
          // Ocurrió un error al enviar la solicitud
          console.error(error); // Imprime el error en la consola
          // Puedes mostrar un mensaje de error aquí
        });
    },
    HadleChange() {
      this.gestion = !this.gestion;
    },
    isComponentLoaded(componentKey) {
      return this.loadedComponents.includes(componentKey);
    }
  },
  mounted() {
    this.getServicesSection();
    const cssFiles = [
      "/css/icofont/icofont.min.css",
      "/css/boxicons/css/boxicons.min.css",
      "/css/remixicon/remixicon.css",
    ];

    cssFiles.forEach((cssFile) => {
      const link = document.createElement("link");
      link.href = cssFile;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    });
  },
  created() {
    // Accede al parámetro pasado en la URL usando $route.params
    this.business = this.$route.params.id;
  },
};
</script>

<style scoped>

.loading-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 8px solid #ddd;
  border-top-color: #47b2e4;
  animation: loading-circle-rotate 1s linear infinite;
  margin: 0 auto;
  margin-top: 50px;
}

@keyframes loading-circle-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/*--------------------------------------------------------------
# Back to top button
--------------------------------------------------------------*/
.back-to-top {
  position: fixed;
  display: none;
  right: 15px;
  bottom: 15px;
  z-index: 99999;
}

.back-to-top i {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background: #47b2e4;
  color: #fff;
  transition: all 0.4s;
}

.back-to-top i:hover {
  background: #209dd8;
  color: #fff;
}

/* Mobile Navigation */
.mobile-nav-toggle {
  position: fixed;
  top: 20px;
  right: 15px;
  z-index: 9998;
  border: 0;
  background: none;
  font-size: 24px;
  transition: all 0.4s;
  outline: none !important;
  line-height: 1;
  cursor: pointer;
  text-align: right;
}

.mobile-nav-toggle i {
  color: #fff;
}

.mobile-nav {
  position: fixed;
  top: 55px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  z-index: 9999;
  overflow-y: auto;
  background: #fff;
  transition: ease-in-out 0.2s;
  opacity: 0;
  visibility: hidden;
  border-radius: 10px;
  padding: 10px 0;
}

.mobile-nav * {
  margin: 0;
  padding: 0;
  list-style: none;
}

.mobile-nav a {
  display: block;
  position: relative;
  color: #37517e;
  padding: 10px 20px;
  font-weight: 500;
  outline: none;
}

.mobile-nav a:hover, .mobile-nav .active > a, .mobile-nav li:hover > a {
  color: #47b2e4;
  text-decoration: none;
}

.mobile-nav .drop-down > a:after {
  content: "\ea99";
  font-family: IcoFont;
  padding-left: 10px;
  position: absolute;
  right: 15px;
}

.mobile-nav .active.drop-down > a:after {
  content: "\eaa1";
}

.mobile-nav .drop-down > a {
  padding-right: 35px;
}

.mobile-nav .drop-down ul {
  display: none;
  overflow: hidden;
}

.mobile-nav .drop-down li {
  padding-left: 20px;
}

.mobile-nav-overly {
  width: 100%;
  height: 100%;
  z-index: 9997;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(40, 58, 90, 0.6);
  overflow: hidden;
  display: none;
  transition: ease-in-out 0.2s;
}

.mobile-nav-active {
  overflow: hidden;
}

.mobile-nav-active .mobile-nav {
  opacity: 1;
  visibility: visible;
}

.mobile-nav-active .mobile-nav-toggle i {
  color: #fff;
}

  /*--------------------------------------------------------------
# Sections General
--------------------------------------------------------------*/
section {
  padding: 60px 0;
  overflow: hidden;
}

.section-bg {
  background-color: #f3f5fa;
}

.section-title {
  text-align: center;
  padding-bottom: 30px;
}

.section-title h2 {
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
  padding-bottom: 20px;
  position: relative;
  color: #37517e;
}

.section-title h2::before {
  content: '';
  position: absolute;
  display: block;
  width: 120px;
  height: 1px;
  background: #ddd;
  bottom: 1px;
  left: calc(50% - 60px);
}

.section-title h2::after {
  content: '';
  position: absolute;
  display: block;
  width: 40px;
  height: 3px;
  background: #47b2e4;
  bottom: 0;
  left: calc(50% - 20px);
}

.section-title p {
  margin-bottom: 0;
}

</style>
  