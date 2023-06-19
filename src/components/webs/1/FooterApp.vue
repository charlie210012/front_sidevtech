<template>
    <footer id="footer">
      <div class="footer-newsletter">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <h4>Suscríbete para recibir promociones</h4>
              <p>Te enviaremos promociones de nuestros servicios</p>
              <form @submit.prevent="submitForm">
                <input type="email" name="email" v-model="formData.email" required/><input type="submit" value="Suscribirme"/>
              </form>
            </div>
            <v-spacer></v-spacer>
            <div class="mb-3">
              <v-alert type="info" v-show="loading">
                <v-progress-circular
                  indeterminate
                  size="32"
                  color="primary"
                ></v-progress-circular>
                <div class="loading-text">Cargando...</div>
              </v-alert>
              <v-alert type="info" v-show="showAlert">
                {{ alertMessage }}
              </v-alert>
            </div>
          </div>
        </div>
      </div>

  
      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 footer-contact">
              <img src="./assets/logo-notfondo.png" id="logo" class="logo" alt="logo">
              <p>
                <!--pendiente--><br />
                Santiago de Cali<br />
                Colombia<br /><br />
                <strong>Telefono:</strong> (602) 404 5698<br />
                <strong>Correo:</strong> comercial@sidevtech.com<br />
              </p>
            </div>
  
            <div class="col-lg-3 col-md-6 footer-links">
              <h4>Menu</h4>
              <ul>
                <li><i class="bx bx-chevron-right"></i> <a href="/">Home</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#about">Acerca de Nosotros</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#services">Servicios</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#">Terminos y condiciones</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#">Politica de privacidad</a></li>
              </ul>
            </div>
  
            <div class="col-lg-3 col-md-6 footer-links">
              <h4>Nuestros Servicios</h4>
              <ul>
                <li><i class="bx bx-chevron-right"></i> <a>Diseño web</a></li>
                <li><i class="bx bx-chevron-right"></i> <a>Desarrollo Web</a></li>
                <li><i class="bx bx-chevron-right"></i> <a>Desarrolo de aplicaciones móviles</a></li>
                <li><i class="bx bx-chevron-right"></i> <a>Marketing</a></li>
                <li><i class="bx bx-chevron-right"></i> <a>Desarrollo de páginas web</a></li>
              </ul>
            </div>
  
            <div class="col-lg-3 col-md-6 footer-links">
              <h4>Nuestras Redes Sociales</h4>
              <p>Síguenos en nuestras redes</p>
              <div class="social-links mt-3">
                <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
                <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
                <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
                <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
                <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="container footer-bottom clearfix">
        <div class="copyright">
          &copy; Derechos de autor <strong><span>SIDEVTECH - NIT. 900939232 </span></strong>. TODOS LOS DERECHOS RESERVADOS
        </div>
        <div class="credits">
          DESARROLLADA POR SIDEVTECH
        </div>
      </div>
    </footer>
  </template>
  
  <script>

  import axios from "axios";
  import {VAlert,VProgressCircular,VSpacer} from 'vuetify/components'
  
  export default {
    name: 'FooterApp',
    components: {
    VAlert,
    VProgressCircular,
    VSpacer
    },
    data() {
      return{
        formData: {
          email: '',
        },
        loading: false,
        showAlert: false,
        alertMessage: "",

      }
    },
    methods: {
      submitForm() {
        this.loading = true;
        axios
        .post('https://api.sidevtech.com/api/suscripcion', this.formData)
        .then(response => {
          //Puedes mostrar un mensaje de éxito aquí
          if (response.data.status === 'success') {
              this.showAlert = true;
              this.alertMessage = response.data.message;
              this.formData.email = ''; 
              setTimeout(() => {
                this.showAlert = false;
                this.alertMessage = '';
              }, 2000);
          // Muestra el diálogo emergente de Vuetify
            this.formData = {
              email: '',
            }; // Borra los datos del formulario
          }
        })
        .catch(error => {
          this.errorMessage = 'Se produjo un error al enviar el mensaje. Por favor, inténtalo de nuevo.'; // Mostrar mensaje de error
          // Ocurrió un error al enviar la solicitud
          console.error(error); // Imprime el error en la consola
          // Puedes mostrar un mensaje de error aquí
        })
        .finally(() => {
          this.loading = false; // Desactivar el estado de carga
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /*--------------------------------------------------------------
    # Footer
    --------------------------------------------------------------*/
    #footer {
    font-size: 14px;
    background: #37517e;
    }

    #footer .footer-newsletter {
    padding: 50px 0;
    background: #f3f5fa;
    text-align: center;
    font-size: 15px;
    color: #444444;
    }

    #footer .footer-newsletter h4 {
    font-size: 24px;
    margin: 0 0 20px 0;
    padding: 0;
    line-height: 1;
    font-weight: 600;
    color: #37517e;
    }

    #footer .footer-newsletter form {
    margin-top: 30px;
    background: #fff;
    padding: 6px 10px;
    position: relative;
    border-radius: 50px;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.06);
    text-align: left;
    }

    #footer .footer-newsletter form input[type="email"] {
    border: 0;
    padding: 4px 8px;
    width: calc(100% - 100px);
    }

    #footer .footer-newsletter form input[type="submit"] {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    border: 0;
    background: none;
    font-size: 16px;
    padding: 0 20px;
    background: #47b2e4;
    color: #fff;
    transition: 0.3s;
    border-radius: 50px;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
    }

    #footer .footer-newsletter form input[type="submit"]:hover {
    background: #209dd8;
    }

    #footer .footer-top {
    padding: 60px 0 30px 0;
    background: #fff;
    }

    #footer .footer-top .footer-contact {
    margin-bottom: 30px;
    }

    #footer .footer-top .footer-contact h3 {
    font-size: 28px;
    margin: 0 0 10px 0;
    padding: 2px 0 2px 0;
    line-height: 1;
    text-transform: uppercase;
    font-weight: 600;
    color: #37517e;
    }

    #footer .footer-top .footer-contact p {
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 0;
    font-family: "Jost", sans-serif;
    color: #5e5e5e;
    }

    #footer .footer-top h4 {
    font-size: 16px;
    font-weight: bold;
    color: #37517e;
    position: relative;
    padding-bottom: 12px;
    }

    #footer .footer-top .footer-links {
    margin-bottom: 30px;
    }

    #footer .footer-top .footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
    }

    #footer .footer-top .footer-links ul i {
    padding-right: 2px;
    color: #47b2e4;
    font-size: 18px;
    line-height: 1;
    }

    #footer .footer-top .footer-links ul li {
    padding: 10px 0;
    display: flex;
    align-items: center;
    }

    #footer .footer-top .footer-links ul li:first-child {
    padding-top: 0;
    }

    #footer .footer-top .footer-links ul a {
    color: #777777;
    transition: 0.3s;
    display: inline-block;
    line-height: 1;
    text-decoration: none;
    }

    #footer .footer-top .footer-links ul a:hover {
    text-decoration: none;
    color: #47b2e4;
    }

    #footer .footer-top .social-links a {
    font-size: 18px;
    display: inline-block;
    background: #47b2e4;
    color: #fff;
    line-height: 1;
    padding: 8px 0;
    margin-right: 4px;
    border-radius: 50%;
    text-align: center;
    width: 36px;
    height: 36px;
    transition: 0.3s;
    }

    #footer .footer-top .social-links a:hover {
    background: #209dd8;
    color: #fff;
    text-decoration: none;
    }

    #footer .footer-bottom {
    padding-top: 30px;
    padding-bottom: 30px;
    color: #fff;
    }

    #footer .copyright {
    float: left;
    }

    #footer .credits {
    float: right;
    font-size: 13px;
    }

    #footer .credits a {
    transition: 0.3s;
    }

    #logo {
      width: 100%;
      height: 25%;
    }

    @media (max-width: 768px) {

      #logo {
        width: 80%;
        height: 30%;
      }

        #footer .footer-bottom {
            padding-top: 20px;
            padding-bottom: 20px;
        }
        #footer .copyright, #footer .credits {
            text-align: center;
            float: none;
        }
        #footer .credits {
            padding-top: 4px;
        }

        .subscription {
          color: red;                  /* Cambiar color de texto */
          background-color: yellow;    /* Establecer fondo */
        }

    }

  </style>
  