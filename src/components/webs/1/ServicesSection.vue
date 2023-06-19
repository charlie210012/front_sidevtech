<template>
  <section id="services" class="services section-bg">
    <div class="container" data-aos="fade-up">
      <div class="section-title">
        <div class = "title-box">
          <h2>Servicios</h2>
          <ServicesForm v-if ="gestion" @submit-clicked = "handleEvento"/>
        </div>
        <p style="text-justify: auto;">
          Si deseas automatizar los procesos de tu empresa, llevar a cabo una idea basada en tecnología, crear
          una tienda virtual, una página web o una aplicación web para tu idea de negocio, nosotros podemos ayudarte.
        </p>
      </div>

      <div class="row">
        <div v-for="(service, index) in services" :key="index" class="col-xl-3 col-md-6" data-aos="zoom-in">
          <div class="icon-box d-flex flex-column">
            <div class="icon"><i :class="service.icon"></i></div>
            <div class="col-auto text-right" v-if = "gestion">
              <span class="mr-2">
                <DeleteCustom :id="service.id" @deleted="handleEvento" />
              </span>
              <span>
                <UpdateServicesForm :data = "service" @update="handleUpdate"/>
              </span>
            </div>
            <!-- puedes usar :href="service.link" para enlazarlo a una pagina -->
            <h4><a>{{ service.title }}</a></h4>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import DeleteCustom from "@/components/utils/DeleteCustom.vue";
import ServicesForm from "./forms/ServicesForm.vue";

const dir = localStorage.getItem("clientId");
const UpdateServicesForm = dir != null ? require(`@/components/webs/${dir}/updateForm/UpdateServicesForm.vue`).default : null;

export default {
  name: 'ServicesSection',
  components: {
    DeleteCustom,
    UpdateServicesForm,
    ServicesForm
  },
  props:{
    gestion: {
      type: Boolean,
      required: false,
    }
  },
  data() {
    return {
      services: [],
    };
  },
  mounted() {
    this.getServicesSection();
  },
  methods: {
    getServicesSection() {
      const urlBase = localStorage.getItem('urlBase');
      const clientId = localStorage.getItem("clientId");
      axios
        .get(urlBase + 'api/component/'+clientId+'/ServicesSection')
        .then(response => {
          this.services = response.data.data ?? [];
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
  },
};
</script>

<style scoped>
/* Estilos existentes para las tarjetas de servicios */
.services .icon-box {
  box-shadow: 0px 0 25px 0 rgba(0, 0, 0, 0.1);
  padding: 50px 30px;
  transition: all ease-in-out 0.4s;
  background: #fff;
}

.services .icon-box .icon {
  margin-bottom: 10px;
}

.services .icon-box .icon i {
  color: #47b2e4;
  font-size: 36px;
  transition: 0.3s;
}

.services .icon-box h4 {
  font-weight: 500;
  margin-bottom: 15px;
  font-size: 24px;
}

.services .icon-box h4 a {
  color: #37517e;
  transition: ease-in-out 0.3s;
  text-decoration: none;
}

.title-box {
  display: flex;
  align-items: center;
  gap: 30px; /* Espacio entre los elementos */
}

.services .icon-box p {
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}

.services .icon-box:hover {
  transform: translateY(-10px);
}

.services .icon-box:hover h4 a {
  color: #47b2e4;
}
</style>
