<template>
  <section id="about" class="about">
    <div class="container" data-aos="fade-up">

      <div class="section-title">
        <h2>Acerca de Nosotros</h2>
      </div>
  
      <FormDinamic :component = "component" v-if ="gestion" @submit-clicked = "handleEvento"/>
       

      <div class="row content">
        <div class="col-lg-6">
          <p>
            Somos una empresa dedicada al desarrollo de páginas web, aplicaciones móviles, aplicaciones web y software corporativos.
          </p>
          <ul>
            <li v-for="item in skills" :key="item.id">
              <i class="ri-check-double-line"></i> {{ item.text }}
              <div class="col-auto text-right" v-if = "gestion">
                <span class="mr-2">
                  <DeleteCustom :id="item.id" @deleted="handleEvento" />
                </span>
                <span>
                  <UpdateFormDinamic :component="component" :data = "item" @update="handleUpdate"/>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-lg-6 pt-4 pt-lg-0">
          <p>
            Nuestro equipo te ayudará a encontrar la mejor solución tecnológica para que tu empresa optimice sus procesos.
          </p>
          <a href="#" class="btn btn-learn-more">Leer más</a>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import axios from "axios";
import DeleteCustom from "@/components/utils/DeleteCustom.vue";
import FormDinamic from "@/components/utils/FormDinamic.vue";
import UpdateFormDinamic from "@/components/utils/UpdateFormDinamic.vue";


export default {
  props:{
    gestion: {
      type: Boolean,
      required: false,
    }
  },
  components: {
    DeleteCustom,
    UpdateFormDinamic,
    FormDinamic
  },
  data() {
    return {
      skills: [],
      component:'AboutSection'
    };
  },
  mounted() {
    this.getServicesSection();
  },
  methods: {
    async getServicesSection() {
      const urlBase = localStorage.getItem('urlBase');
      const clientId = localStorage.getItem("clientId");
      axios
        .get(urlBase + 'api/component/'+clientId+'/AboutSection')
        .then(response => {
          this.skills = response.data.data ?? [];
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
};
</script>

<style scoped>
/*--------------------------------------------------------------
# About Us
--------------------------------------------------------------*/
.about .content h3 {
  font-weight: 600;
  font-size: 26px;
}

.about .content ul {
  list-style: none;
  padding: 0;
}

.about .content ul li {
  padding-left: 28px;
  position: relative;
}

.about .content ul li + li {
  margin-top: 10px;
}

.about .content ul i {
  position: absolute;
  left: 0;
  top: 2px;
  font-size: 20px;
  color: #47b2e4;
  line-height: 1;
}

.about .content p:last-child {
  margin-bottom: 0;
}

.about .content .btn-learn-more {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 12px 32px;
  border-radius: 4px;
  transition: 0.3s;
  line-height: 1;
  color: #47b2e4;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
  margin-top: 6px;
  border: 2px solid #47b2e4;
}

.about .content .btn-learn-more:hover {
  background: #47b2e4;
  color: #fff;
  text-decoration: none;
}

.title-box {
  display: flex;
  align-items: center;
  gap: 30px; /* Espacio entre los elementos */
}
</style>
