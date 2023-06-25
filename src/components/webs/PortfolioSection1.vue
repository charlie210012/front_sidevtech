<template>
    <section id="portfolio" class="portfolio">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>{{ portfolioTitle }}</h2>
          <p>{{ portfolioDescription }}</p>
        </div>
        <FormDinamic :component = "component" v-if ="gestion" @submit-clicked = "handleEvento"/>

  
        <ul id="portfolio-flters" class="d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
          <li v-for="filter in filters" @click="setFilter(filter.value)" :key="filter.value" :data-filter="filter.value" :class="['portfolio-filter', { 'filter-active': filter.value === currentFilter }]">{{ filter.label }}</li>
        </ul>
  
        <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
          <div v-for="item in filteredItems" :key="item.id" :class="['col-lg-4 col-md-6 portfolio-item', item.filter]">
            <div class="col-auto text-right" v-if = "gestion">
              <span class="mr-2">
                <DeleteCustom :id="item.id" @deleted="handleEvento" />
              </span>
              <span>
                <UpdateFormDinamic :component="component" :data = "item" @update="handleUpdate"/>
              </span>
            </div>
            <div class="portfolio-img">
              <img :src="item.image" class="img-fluid" alt="">
            </div>
            <div class="portfolio-info">
              <h4>{{ item.title }}</h4>
              <p>{{ item.category }}</p>
              <a class="venobox preview-link" :title="item.title">
                <ImagenModal :image-url="item.image" />
              </a>
              <div v-if="showPopup" class="popup"  @click="closePopupOutside">
                <div class="popup-content">
                  <img :src="popupImage" alt="Imagen emergente" class="popup-image" />
                  <button class="btn btn-danger" @click="closePopup">Cerrar</button>
                </div>
              </div>
              <!-- <a data-lightbox="portfolio" class="venobox preview-link" :title="item.title"><i class="bx bx-plus"></i></a> -->
              <!-- <a href="portfolio-details" class="details-link" title="Más detalles"><i class="bx bx-link"></i></a> -->
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


import ImagenModal from '@/components/utils/ImagenModal.vue';
  export default {
        components: {
          ImagenModal,
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
        mounted() {
          this.getServicesSection();
        },
        data() {
            return {
                component:'PortfolioSection',
                showPopup: false,
                popupImage: '',
                portfolioItems: [
                // {
                //     id: 1,
                //     filter: 'filter-he',
                //     image: require('./assets/portfolio/11.jpg'),
                //     title: 'Visual Studio',
                //     category: 'Herramientas'
                // },
                // {
                //     id: 2,
                //     filter: 'filter-web',
                //     image: require('./assets/portfolio/2.jpg'),
                //     title: 'Borja Grupo Construcciones',
                //     category: 'Web'
                // },
                // {
                //     id: 3,
                //     filter: 'filter-pw',
                //     image: require('./assets/portfolio/9.jpg'),
                //     title: 'Pradosystem',
                //     category: 'Plataforma web'
                // },
                // {
                //     id: 4,
                //     filter: 'filter-pw',
                //     image: require('./assets/portfolio/4.jpg'),
                //     title: 'Entregalo',
                //     category: 'Plataforma web'
                // }
                ],
                filters: [
                    { label: 'Todos', value: '*' },
                    { label: 'Herramientas de desarrollo', value: 'filter-he' },
                    { label: 'Páginas web', value: 'filter-web' },
                    { label: 'Plataformas web', value: 'filter-pw' },
                    { label: 'Aplicaciones móviles', value: 'filter-am' }
                ],
                currentFilter: '*',
                portfolioTitle: 'Portafolio',
                portfolioDescription: 'En esta sección encontrarás algunos de nuestros trabajos más recientes utilizando diferentes tecnologías. Nuestro trabajo se destaca por su excelente calidad y las mejores metodologías del mercado.',
            };
        },
        computed: {
            filteredItems() {
                if (this.currentFilter === '*') {
                    return this.portfolioItems;
                } else {
                    return this.portfolioItems.filter(item => item.filter === this.currentFilter);
                }
            }
        },
        methods: {
            setFilter(filterValue) {
                this.currentFilter = filterValue;
            },
            openPopup(image) {
              // Asigna la URL de la imagen que deseas mostrar en la ventana emergente
              this.popupImage = image;
              this.showPopup = true;
            },
            closePopup() {
              this.showPopup = false;
              this.popupImage = '';
            },
            closePopupOutside(event) {
              // Verificar si el evento se originó fuera de la imagen
              if (!event.target.classList.contains('popup-image')) {
                this.closePopup();
              }
            },
            async getServicesSection() {
              const urlBase = localStorage.getItem('urlBase');
              const clientId = localStorage.getItem("clientId");
              axios
                .get(urlBase + 'api/component/'+clientId+'/' + this.component)
                .then(response => {
                  this.portfolioItems = response.data.data ?? [];
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
# Portfolio
--------------------------------------------------------------*/
.portfolio #portfolio-flters {
  list-style: none;
  margin-bottom: 20px;
}

.portfolio #portfolio-flters li {
  cursor: pointer;
  display: inline-block;
  margin: 10px 5px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  color: #444444;
  transition: all 0.3s;
  padding: 8px 20px;
  border-radius: 50px;
  font-family: "Poppins", sans-serif;
}

.portfolio #portfolio-flters li:hover, .portfolio #portfolio-flters li.filter-active {
  background: #47b2e4;
  color: #fff;
}

.portfolio .portfolio-item {
  margin-bottom: 30px;
}

.portfolio .portfolio-item .portfolio-img {
  overflow: hidden;
}

.portfolio .portfolio-item .portfolio-img img {
  transition: all 0.6s;
}

.portfolio .portfolio-item .portfolio-info {
  opacity: 0;
  position: sticky;
  left: 15px;
  bottom: 0;
  z-index: 3;
  right: 15px;
  transition: all 0.3s;
  background: rgba(55, 81, 126, 0.8);
  padding: 10px 15px;
}

.portfolio .portfolio-item .portfolio-info h4 {
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0px;
}

.portfolio .portfolio-item .portfolio-info p {
  color: #f9fcfe;
  font-size: 14px;
  margin-bottom: 0;
}

.portfolio .portfolio-item .portfolio-info .preview-link, .portfolio .portfolio-item .portfolio-info .details-link {
  position: absolute;
  right: 40px;
  font-size: 24px;
  top: calc(50% - 18px);
  color: #fff;
  transition: 0.3s;
}

.portfolio .portfolio-item .portfolio-info .preview-link:hover, .portfolio .portfolio-item .portfolio-info .details-link:hover {
  color: #47b2e4;
}

.portfolio .portfolio-item .portfolio-info .details-link {
  right: 10px;
}

.portfolio .portfolio-item:hover .portfolio-img img {
  transform: scale(1.15);
}

.portfolio .portfolio-item:hover .portfolio-info {
  opacity: 1;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  max-width: 70%;
  max-height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
}

.popup-image {
  max-width: 80%;
  max-height: 80%;
}

.popup button {
  margin-left: 10px;
}

  </style>
  