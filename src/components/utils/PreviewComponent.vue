<template>
  <div>
    <body>
      <div v-for="(seccion, index) in structure" :key = "index">
        <component :gestion ="gestion" :is="seccion.component" @submit-clicked="handleEvento" />
      </div>
    </body>
  </div>
</template>
  
  <script>
  import axios from "axios";
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
  export default {
    data() {
      return {
        business:'',
        structure:[],
        gestion:true,
      };
    },
    components:{
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
},
    methods: {
      getServicesSection() {
        const urlBase = localStorage.getItem('urlBase');

        const config = {
            headers: {
              Authorization: 'Bearer '+ localStorage.getItem('userToken')
            }
          };
       
        axios
          .get(urlBase + 'api/web/'+this.business+'/structure',config)
          .then(response => {
            console.log(response.data);
            this.structure = response.data.structure ?? [];
          })
          .catch(error => {
            this.errorMessage = 'Se produjo un erro al consultar datos. Por favor, inténtalo de nuevo.'; // Mostrar mensaje de error
            // Ocurrió un error al enviar la solicitud
            console.error(error); // Imprime el error en la consola
            // Puedes mostrar un mensaje de error aquí
          });
      },
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
    }
  };
  </script>

<style scoped>
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
  