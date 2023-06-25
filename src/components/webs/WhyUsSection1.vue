<template>
  <section id="why-us" class="why-us section-bg">
    <div class="container-fluid" data-aos="fade-up">
      <div class="row">
        <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch order-2 order-lg-1">
          <div class="content">
            <h3>
              La revolución digital llegó para quedarse,
              <strong>No te puedes quedar atrás.</strong>
            </h3>
            <div class = "title-box">
              <p>
                Optimiza tus procesos corporativos con el uso de las Tecnologías de
                la Información, acelera el crecimiento de tu empresa.
              </p>
              <FormDinamic :component = "component" v-if ="gestion" @submit-clicked = "handleEvento"/>
            </div>
          </div>

          <div class="accordion-list">
            <ul>
              <li v-for="(item, index) in accordionItems" :key="index">
                <div class="col-auto text-right" v-if = "gestion">
                  <span class="mr-2">
                    <DeleteCustom :id="item.id" @deleted="handleEvento" />
                  </span>
                  <span>
                    <UpdateFormDinamic :component="component" :data = "item" @update="handleUpdate"/>
                  </span>
                </div>
                <a
                  :class="{ collapsed: item.collapsed }"
                  @click="toggleAccordion(index)"
                >
                  <span>{{ item.number }}</span> {{ item.question }}
                  <i class="bx" :class="[item.collapsed ? 'bx-chevron-down' : 'bx-chevron-up']"></i>
                </a>
                <div
                  :id="'accordion-list-' + (index + 1)"
                  class="collapse"
                  :class="{ show: !item.collapsed }"
                  data-parent=".accordion-list"
                >
                  <p>{{ item.answer }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="col-lg-5 align-items-stretch order-1 order-lg-2 img"
          :style="`background-image: url(${require('./assets/whyUs.png')})`"
          data-aos="zoom-in"
          data-aos-delay="150"
        >
          &nbsp;
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
      component: "WhyUsSection",
      accordionItems: []
    };
  },
  mounted() {
    this.getServicesSection();
  },
  methods: {
    toggleAccordion(index) {
      this.accordionItems.forEach((item, i) => {
        item.collapsed = i === index ? !item.collapsed : true;
      });
    },
    collapseOtherItems(currentItem) {
      this.accordionItems.forEach(item => {
        if (item !== currentItem) {
          item.collapsed = true;
        }
      });
    },
    async getServicesSection() {
      const urlBase = localStorage.getItem('urlBase');
      const clientId = localStorage.getItem("clientId");
      axios
        .get(urlBase + 'api/component/'+clientId+'/' + this.component)
        .then(response => {
          this.accordionItems = response.data.data ?? [];
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
# Why Us
--------------------------------------------------------------*/
.why-us .content {
  padding: 60px 100px 0 100px;
}


.why-us .content h3 {
  font-weight: 400;
  font-size: 34px;
  color: #37517e;
}

.why-us .content h4 {
  font-size: 20px;
  font-weight: 700;
  margin-top: 5px;
}

.why-us .content p {
  font-size: 15px;
  color: #848484;
}

.why-us .img {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}

.why-us .accordion-list {
  padding: 0 100px 60px 100px;
}

.why-us .accordion-list ul {
  padding: 0;
  list-style: none;
}

.why-us .accordion-list li + li {
  margin-top: 15px;
}

.why-us .accordion-list li {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
}

.why-us .accordion-list a {
  display: block;
  position: relative;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  padding-right: 30px;
  outline: none;
  text-decoration: none;
}

.why-us .accordion-list span {
  color: #47b2e4;
  font-weight: 600;
  font-size: 18px;
  padding-right: 10px;
}

.why-us .accordion-list i {
  font-size: 24px;
  position: absolute;
  right: 0;
  top: 0;
}

.why-us .accordion-list p {
  margin-bottom: 0;
  padding: 10px 0 0 0;
}

.why-us .accordion-list .icon-show {
  display: none;
}

.why-us .accordion-list a.collapsed {
  color: #343a40;
}

.why-us .accordion-list a.collapsed:hover {
  color: #47b2e4;
}

.why-us .accordion-list a.collapsed .icon-show {
  display: inline-block;
}

.why-us .accordion-list a.collapsed .icon-close {
  display: none;
}

@media (max-width: 1024px) {
  .why-us .content,
  .why-us .accordion-list {
    padding-left: 0;
    padding-right: 0;
  }
}

@media (max-width: 992px) {
  .why-us .img {
    min-height: 400px;
  }
  .why-us .content {
    padding-top: 30px;
  }
  .why-us .accordion-list {
    padding-bottom: 30px;
  }
}

@media (max-width: 575px) {
  .why-us .img {
    min-height: 200px;
  }
}

.title-box {
  display: flex;
  align-items: center;
  gap: 30px; /* Espacio entre los elementos */
}
</style>

