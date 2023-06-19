<template>
    <section id="Precios" class="pricing">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Precios</h2>
          <p>Nuestros precios están sujetos a los requerimientos del cliente.</p>
        </div>
  
        <div class="row">
          <div v-for="item in pricingItems" :key="item.id" class="col-lg-4 mt-4">
            <div class="box" data-aos="fade-up" :data-aos-delay="item.delay">
              <h3>{{ item.title }}</h3>
              <!-- <h4><sup>$</sup>{{ item.price }} COP<span>Desde</span></h4> -->
              <ul>
                <li v-for="feature in item.features" :key="feature.id">
                  <i class="bx bx-check"></i> {{ feature.description }}
                </li>
              </ul>
              <a href="#contact" class="buy-btn">Quiero saber más</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'PricingSection',
    data() {
      return {
        pricingItems: [
          {
            id: 1,
            title: 'Páginas web',
            price: '800.000',
            features: [
              { id: 1, description: 'Diseño personalizado' },
              { id: 2, description: 'Correo corporativos' },
              { id: 3, description: 'Comportamientos e interatividad' },
              { id: 4, description: 'Enlace con redes sociales' },
              { id: 5, description: 'SSL Seguridad Garantizada' }
            ],
            delay: 100
          },
          {
            id: 2,
            title: 'Plataformas web',
            price: '4.200.000',
            features: [
              { id: 1, description: 'Cumple tus especificaciones' },
              { id: 2, description: 'Interfaz interactiva' },
              { id: 3, description: 'Arquitectura de bases de datos' },
              { id: 4, description: 'Estructuras API´S' },
              { id: 5, description: 'FRONTEND Y BACKEND ESPECIALIZADOS' }
            ],
            delay: 200
          },
          {
            id: 3,
            title: 'Aplicaciones móviles',
            price: '5.000.000',
            features: [
              { id: 1, description: 'Interfaz personalizadas' },
              { id: 2, description: 'Requerimientos y comportamientos únicos' },
              { id: 3, description: 'Para android o ios' },
              { id: 4, description: 'Enlazadas a tus bases de datos' },
              { id: 5, description: 'Arquitectura de backend' }
            ],
            delay: 300
          }
        ]
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
  