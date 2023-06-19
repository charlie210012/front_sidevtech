<template>
  <section id="skills" class="skills" data-aos="fade-up">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex align-items-center" data-aos="fade-right" data-aos-delay="100">
          <img src="./assets/skills.png" class="img-fluid" alt="">
        </div>
        <div class="col-lg-6 pt-4 pt-lg-0 content" data-aos="fade-left" data-aos-delay="100">
          <h3>Nuestro equipo de desarrollo es experto en muchas tecnologías y lenguajes de programación</h3>
          <div class = "title-box">
            <p class="font-italic">Estas son algunas de nuestras especialidades.</p>
            <FormDinamic :component = "component" v-if ="gestion" @submit-clicked = "handleEvento"/>
          </div>

          <div class="skills-content">
            <div v-for="(skill, index) in skills" :key="index" class="progress">
              <span class="skill">{{ skill.label }} <i class="val">{{ skill.percentage }}%</i></span>
              <div class="col-auto text-right" v-if = "gestion">
                <span class="mr-2">
                  <DeleteCustom :id="skill.id" @deleted="handleEvento" />
                </span>
                <span>
                  <UpdateFormDinamic :component="component" :data = "skill" @update="handleUpdate"/>
                </span>
              </div>
              <div class="progress-bar-wrap">
                <div class="progress-bar" role="progressbar" :style="{ width: skill.percentage + '%' }"></div>
              </div>
            </div>
          </div>
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
  name: 'SkillsSection',
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
      component:'SkillsSection'
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
        .get(urlBase + 'api/component/'+clientId+'/SkillsSection')
        .then(response => {
          console.log(response.data);
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
# Skills
--------------------------------------------------------------*/
.skills .content h3 {
  font-weight: 700;
  font-size: 32px;
  color: #37517e;
  font-family: "Poppins", sans-serif;
}

.skills .content ul {
  list-style: none;
  padding: 0;
}

.skills .content ul li {
  padding-bottom: 10px;
}

.skills .content ul i {
  font-size: 20px;
  padding-right: 4px;
  color: #47b2e4;
}

.skills .content p:last-child {
  margin-bottom: 0;
}

.skills .progress {
  height: 60px;
  display: block;
  background: none;
  border-radius: 0;
}

.skills .progress .skill {
  padding: 0;
  margin: 0 0 6px 0;
  text-transform: uppercase;
  display: block;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  color: #37517e;
}

.skills .progress .skill .val {
  float: right;
  font-style: normal;
}

.skills .progress-bar-wrap {
  background: #e8edf5;
  height: 10px;
}

.skills .progress-bar {
  width: 0;
  height: 10px;
  transition: width 0.9s ease-in-out;
  background-color: #4668a2;
}

.title-box {
  display: flex;
  align-items: center;
  gap: 30px; /* Espacio entre los elementos */
}
</style>
