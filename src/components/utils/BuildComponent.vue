<template>
  <div class="body-build">
    <div class="card div-header">
        <div class="div-title col-md-12">
         <img src="../webs/assets/logo-notfondo.png" alt="loago de la empresa sidevtech" srcset="">
         <h1> Creador de Paginas Web</h1>
        </div>
    </div>
    <div class="div-content">
      <form @submit.prevent="enviarDatos">
        <div class="row">
          <div class="col-md-6" v-for="(item,index) in structure" :key="index">
            <div class="card">
              <div class="card-header">
                {{ searhText(item.key) }}
              </div>
              <img :id="item.key" :src="imageDefault" class="card-img-top" alt="Imagen del componente">
              <div class="card-body">
                <h5 class="card-title">{{ searhKey(item.key) }}</h5>
                <div class="card-text">
                  <div class="mb-3">
                    <label :for="'component-' + index" class="form-label">Selecciona el componente</label>
                    <select 
                    :id="'component-' + index" 
                    name="component" 
                    class="form-select" 
                    v-model="selectedComponents[index]"
                    @click = "changeComponent(selectedComponents[index],item.key)"
                    >
                      <option value="" selected>No seleccionar componente</option>
                      <option v-for="(option, optionIndex) in item.options" :value="option" :key="optionIndex">{{ option }}</option>
                    </select>
                  </div>
                </div>
                <div class="card-buttons">
                  <button class="btn btn-secondary" @click.prevent="showModalProcess(item.key)">Ver</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="button-build">
            <div class="col-md-12">
              <button type="button" class="button-div btn btn-secondary" @click = "closeBuild">Cancelar</button>
              <button type="submit" class="button-div btn btn-primary">Crear Pagína</button>
            </div>
          </div>
        </div>
        
      </form>
    </div>
    <div class="modal" :class="{ 'show': showModal }" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ searhKey(this.component) }}</h5>
            <button type="button" class="close" @click="showModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div>
                <component class= "component" :gestion="gestion" :is="this.component"/>
              </div>
            </div>
            <p>Aquí puedes ver la sección seleccionada. Si se trata de un encabezado (header), se mostrará en la parte superior, pero si se trata de un chatbot, aparecerá flotando.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="button-div btn btn-secondary" @click="showModal = false">Cerrar</button>
            <button type="button" class="button-div btn btn-primary" @click="seleccionar">Seleccionar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
  
  <script>

  import axios from "axios";
  export default {
    data() {
      return {
        showModal: false,
        structure: [],
        gestion: false,
        component: '',
        imageDefault: '/build/default.png',
        selectedComponents: [],
        sections: [
          {
            id: "HeaderApp",
            valor: {
              key: "Header",
              value: "Encabezados principales"
            }
          },
          {
            id: "HeroSection",
            valor: {
              key: "Banner",
              value: "Banners o encabezados grandes (Hero Section)"
            }
          },
          {
            id: "CarruselSection",
            valor: {
              key: "Carrusel",
              value: "Carruseles de imágenes (Image Slider)"
            }
          },
          {
            id: "TestimonialsSection",
            valor: {
              key: "Testimonio",
              value: "Testimonios (Testimonials)"
            }
          },
          {
            id: "ServicesSection",
            valor: {
              key: "Servicio",
              value: "Secciones de características o servicios (Features/Services Section)"
            }
          },
          {
            id: "TeamSection",
            valor: {
              key: "Equipo",
              value: "Equipo o secciones de miembros (Team/Members Section)"
            }
          },
          {
            id: "FaqSection",
            valor: {
              key: "Faq",
              value: "Preguntas frecuentes (FAQ)"
            }
          },
          {
            id: "ContactSection",
            valor: {
              key: "Contacto",
              value: "Sección de contacto (Contact Section)"
            }
          },
          {
            id: "Notices",
            valor: {
              key: "Noticia",
              value: "Sección de noticias o blog (News/Blog Section)"
            }
          },
          {
            id: "Galery",
            valor: {
              key: "Galeria",
              value: "Galería de imágenes (Image Gallery)"
            }
          },
          {
            id: "Map",
            valor: {
              key: "Map",
              value: "Mapa (Map)"
            }
          },
          {
            id: "AboutSection",
            valor: {
              key: "AboutUs",
              value: 'Secciones de "Acerca de nosotros"'
            }
          },
          {
            id: "CTASection",
            valor: {
              key: "Cta",
              value: "Secciones de acción (contactos)"
            }
          },
          {
            id: "ChatBot",
            valor: {
              key: "ChatBot",
              value: "Asistentes inteligentes"
            }
          },
          {
            id: "FooterApp",
            valor: {
              key: "Footer",
              value: "Pies de páginas"
            }
          },
          {
            id: "PortfolioSection",
            valor: {
              key: "Portfolio",
              value: "Portafolios"
            }
          },
          {
            id: "PricingSection",
            valor: {
              key: "Pricing",
              value: "Secciones de precios"
            }
          },
          {
            id: "SkillsSection",
            valor: {
              key: "Skills",
              value: "Secciones de Habilidades"
            }
          },
          {
            id: "WhyUsSection",
            valor: {
              key: "WhyUs",
              value: 'Secciones de "Por qué trabajar con nosotros"'
            }
          }
        ]
      }
    },
    components:{

    },
    mounted(){
      this.getServicesSection();
    },
    methods: {
      showModalProcess(value){
        this.component = value;
        this.showModal = true;
      },
      closeBuild(){
        this.$router.push('/');
      },
      changeComponent(value, key) {
        if (value !== undefined && value !== null && value !== "") {
          this.imageSrc = '/build/'+value+'.png';
          import(`../webs/${value}.vue`).then(component => {
            this.$options.components[key] = component.default;
          });

          const imageRef = document.getElementById(key); // Acceder a la referencia del elemento
          console.log(imageRef);
          if (imageRef) {
            imageRef.setAttribute('src', this.imageSrc); // Actualizar el atributo 'src' de la imagen
          }
        }
        this.component = value;
      },
      searhText(value){
        const element = this.sections.find((item) => item.id === value);
        const texto = element ? element.valor.value : null;
        return texto;
      },
      searhKey(value){
        const element = this.sections.find((item) => item.id === value);
        const texto = element ? element.valor.key : null;
        return texto;
      },
      seleccionar() {
        // Lógica para el botón "Seleccionar"
        console.log('Seleccionar');
      },
      getServicesSection() {
        const urlBase = localStorage.getItem('urlBase');
        // const clientId = localStorage.getItem('clientId');

        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken')
          }
        };

        axios
          .get(urlBase + 'api/config/configGeneral', config)
          .then(response => {
            console.log(response.data);
            this.structure = response.data.structure ?? [];

            console.log(this.structure[0].key);

          })
          .catch(error => {
            this.errorMessage =
              'Se produjo un error al consultar datos. Por favor, inténtalo de nuevo.'; // Mostrar mensaje de error
            // Ocurrió un error al enviar la solicitud
            console.error(error); // Imprime el error en la consola
            // Puedes mostrar un mensaje de error aquí
          });
      },
      enviarDatos() {
        const urlBase = localStorage.getItem("urlBase");
        const clientId = localStorage.getItem("clientId");
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        };
        const data = this.selectedComponents.map((component, index) => {
          return {
            key: this.structure[index].key,
            component,
            text: this.searhText(this.structure[index].key),
          };
        });


        axios
        .post(urlBase + "api/web/" + clientId + "/structure",data, config)
        .then((response) => {
          if(response.status == 201 || response.status == 200){
            this.$router.push('/preview/' + clientId)
          }

        })
        .catch((error) => {
          this.errorMessage =
            "Se produjo un error al consultar datos. Por favor, inténtalo de nuevo."; // Mostrar mensaje de error
          // Ocurrió un error al enviar la solicitud
          console.error(error); // Imprime el error en la consola
          // Puedes mostrar un mensaje de error aquí
        });
      },
    }
  };
  </script>
  
  <style scoped>
  .card {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out;
    margin-top: 20px;
    z-index: 1000;
  }
  
  .card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .card-img-top {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card-body {
    padding: 1.25rem;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }
  
  .card-text {
    margin-bottom: 1rem;
  }
  
  .card-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .modal {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    margin-top: 1px;
  }
  
  .modal.show {
    display: flex;
    width: 100%;
  }
  
  .modal-dialog {
    margin: 10% auto;
  }
  
  .modal-content {
    background-color: #fefefe;
    border: 1px solid #888;
    border-radius: 10px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  
  .modal-title {
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem;
  }

  .container {
    padding: 30px;
  }

  .button-build{
    padding:20px;
    text-align: center;
  }

  .button-div{
    margin-left: 50px;
    margin-right: 50px;
    width: 35%;
    color:white;
  }

  .body-build{
    background: rgba(40, 58, 90, 0.9);
    margin-top: 0;
  }

  .div-content{
    margin-left: 20px;
    margin-right: 20px;
  }

  .div-header{
    padding: 10px;
  }

  .div-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }


 


</style>
  