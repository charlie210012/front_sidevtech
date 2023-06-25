<template>
  <section id="about-section" class="about-section">
    <div class="container" data-aos="fade-up">

      <div class="section-title">
        <h2>Sobre Nosotros</h2>
      </div>

      <FormDinamic :component="component" v-if="gestion" @submit-clicked="handleEvento" />

      <div class="row content">
        <div class="col-lg-6">
          <p>Somos una empresa dedicada a brindar soluciones tecnológicas innovadoras para nuestros clientes.</p>
          <ul>
            <li v-for="item in aboutItems" :key="item.id">
              <i class="ri-check-double-line"></i> {{ item.text }}
              <div class="col-auto text-right" v-if="gestion">
                <span class="mr-2">
                  <DeleteCustom :id="item.id" @deleted="handleEvento" />
                </span>
                <span>
                  <UpdateFormDinamic :component="component" :data="item" @update="handleUpdate" />
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-lg-6 pt-4 pt-lg-0">
          <p style="margin-top: 30px;">Estamos comprometidos en ofrecer servicios de calidad y satisfacer las necesidades de nuestros clientes.</p>
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
  props: {
    gestion: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    DeleteCustom,
    UpdateFormDinamic,
    FormDinamic,
  },
  data() {
    return {
      aboutItems: [],
      component: "AboutSection",
    };
  },
  mounted() {
    this.getAboutSection();
  },
  methods: {
    getAboutSection() {
      const urlBase = localStorage.getItem("urlBase");
      const clientId = localStorage.getItem("clientId");
      axios
        .get(urlBase + "api/component/" + clientId + "/AboutSection")
        .then((response) => {
          this.aboutItems = response.data.data ?? [];
        })
        .catch((error) => {
          this.errorMessage =
            "Se produjo un erro al consultar datos. Por favor, inténtalo de nuevo."; // Mostrar mensaje de error
          // Ocurrió un error al enviar la solicitud
          console.error(error); // Imprime el error en la consola
          // Puedes mostrar un mensaje de error aquí
        });
    },
    handleEvento() {
      this.getAboutSection();
    },
    handleUpdate() {
      this.getAboutSection();
    },
  },
};
</script>

<style scoped>
/*--------------------------------------------------------------
# About Section
--------------------------------------------------------------*/
.about-section .section-title {
  text-align: center;
  margin-bottom: 40px;
}

.about-section .content ul {
  list-style: none;
  padding: 0;
}

.about-section .content ul li {
  margin-bottom: 10px;
  position: relative;
}

.about-section .content ul i {
  position: absolute;
  left: -24px;
  top: 4px;
  font-size: 18px;
  color: #47b2e4;
}

.about-section .content p:last-child {
  margin-bottom: 0;
}

.about-section .content .btn-learn-more {
  display: inline-block;
  padding: 12px 32px;
  border-radius: 4px;
  transition: 0.3s;
  line-height: 1;
  color: #fff;
  background-color: #47b2e4;
  border: none;
  font-weight: 500;
}

.about-section .content .btn-learn-more:hover {
  background-color: #2098d1;
  cursor: pointer;
}

.about-section .content .col-lg-6 {
  background-color: #f5f5f5;
  padding: 20px;
}

.about-section .content .col-lg-6 p {
  color: #555;
}

.title-box {
  display: flex;
  align-items: center;
  gap: 30px;
}

/* Custom Styling for Variation */
.about-section {
  background-color: #fafafa;
  padding: 40px 0;
}

.about-section .section-title h2 {
  color: #2098d1;
}

.about-section .content ul li {
  display: flex;
  align-items: center;
}

.about-section .content ul li i {
  font-size: 20px;
  margin-right: 10px;
  color: #47b2e4;
}

.about-section .content ul li:last-child {
  margin-bottom: 0;
}

.about-section .content .col-lg-6 {
  background-color: #fff;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.about-section .content .btn-learn-more {
  background-color: #47b2e4;
  color: #fff;
}

.about-section .content .btn-learn-more:hover {
  background-color: #2098d1;
}

.about-section .content .col-lg-6 p {
  color: #333;
}
</style>
