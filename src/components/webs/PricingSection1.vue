<template>
    <section id="Precios" class="pricing">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Precios</h2>
          <p>Nuestros precios están sujetos a los requerimientos del cliente.</p>
        </div>

        <FormDinamic :component = "component" v-if ="gestion" @submit-clicked = "handleEvento"/>
  
        <div class="row">
          <div v-for="item in pricingItems" :key="item.id" class="col-lg-4 mt-4">
            <div class="col-auto text-right" v-if = "gestion">
              <span class="mr-2">
                <DeleteCustom :id="item.id" @deleted="handleEvento" />
              </span>
              <span>
                <UpdateFormDinamic :component="component" :data = "item" @update="handleUpdate"/>
              </span>
            </div>
            <div class="box" data-aos="fade-up" :data-aos-delay="item.delay">
              <h3>{{ item.title }}</h3>
              <h4><sup>$</sup>{{ item.price }} COP<span>Desde</span></h4>
              <ul>
                <li v-for="feature in item.features" :key="feature.id">
                  <i class="bx bx-check"></i> {{ feature }}
                </li>
              </ul>
              <a :href="item.link" class="buy-btn">Quiero saber más</a>
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
    mounted() {
      this.getServicesSection();
    },
    methods:{
      async getServicesSection() {
        const urlBase = localStorage.getItem('urlBase');
        const clientId = localStorage.getItem("clientId");
        axios
          .get(urlBase + 'api/component/'+clientId+'/' + this.component)
          .then(response => {
            this.pricingItems = response.data.data ?? [];
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
    data() {
      return {
        pricingItems: [],
        component: 'PricingSection'
      };
    }
  };
  </script>
  
  <style scoped>
  /*--------------------------------------------------------------
# Pricing
--------------------------------------------------------------*/
.pricing .row {
  padding-top: 40px;
}

.pricing .box {
  padding: 60px 40px;
  box-shadow: 0 3px 20px -2px rgba(20, 45, 100, 0.1);
  background: #fff;
  height: 100%;
  border-top: 4px solid #fff;
  border-radius: 5px;
}

.pricing h3 {
  font-weight: 500;
  margin-bottom: 15px;
  font-size: 30px;
  color: #37517e;
}

.pricing h4 {
  font-size: 48px;
  color: #37517e;
  font-weight: 400;
  font-family: "Jost", sans-serif;
  margin-bottom: 25px;
}

.pricing h4 sup {
  font-size: 28px;
}

.pricing h4 span {
  color: #47b2e4;
  font-size: 18px;
  display: block;
}

.pricing ul {
  padding: 20px 0;
  list-style: none;
  color: #999;
  text-align: left;
  line-height: 20px;
}

.pricing ul li {
  padding: 10px 0 10px 30px;
  position: relative;
}

.pricing ul i {
  color: #28a745;
  font-size: 24px;
  position: absolute;
  left: 0;
  top: 6px;
}

.pricing ul .na {
  color: #ccc;
}

.pricing ul .na i {
  color: #ccc;
}

.pricing ul .na span {
  text-decoration: line-through;
}

.pricing .buy-btn {
  display: inline-block;
  padding: 12px 35px;
  border-radius: 50px;
  color: #47b2e4;
  transition: none;
  font-size: 16px;
  font-weight: 500;
  font-family: "Jost", sans-serif;
  transition: 0.3s;
  border: 1px solid #47b2e4;
}

.pricing .buy-btn:hover {
  background: #47b2e4;
  color: #fff;
}

.pricing .featured {
  border-top-color: #47b2e4;
}

.pricing .featured .buy-btn {
  background: #47b2e4;
  color: #fff;
}

.pricing .featured .buy-btn:hover {
  background: #23a3df;
}

@media (max-width: 992px) {
  .pricing .box {
    max-width: 60%;
    margin: 0 auto 30px auto;
  }
}

@media (max-width: 767px) {
  .pricing .box {
    max-width: 80%;
    margin: 0 auto 30px auto;
  }
}

@media (max-width: 420px) {
  .pricing .box {
    max-width: 100%;
    margin: 0 auto 30px auto;
  }
}

  </style>
  