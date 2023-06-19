<template>
  <section id="contact" class="contact">
    <div class="container" data-aos="fade-up">
      <div class="section-title">
        <h2>Contáctenos</h2>
        <p>Escríbenos y nos contactaremos contigo de forma inmediata.</p>
      </div>

      <div class="row">
        <div class="col-lg-5 d-flex align-items-stretch">
          <div class="info">
            <div class="address">
              <i class="icofont-google-map"></i>
              <h4>Localización:</h4>
              <p>Cra 12 46 - 47 ofi 301</p>
            </div>

            <div class="email">
              <i class="icofont-envelope"></i>
              <h4>Correo:</h4>
              <p>comercial@sidevtech.com</p>
            </div>

            <div class="phone">
              <i class="icofont-phone"></i>
              <h4>Teléfono:</h4>
              <p>(602) 404 5698</p>
            </div>

            <iframe
              src="https://maps.google.com/maps?q=cra%2012%2046-47,%20cali&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              style="border:0; width: 100%; height: 290px;"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
          <form @submit.prevent="submitForm" class="php-email-form">
            <div class="row">
              <div class="form-group col-md-6">
                <label for="name">Tu nombre</label>
                <input
                  v-model="formData.name"
                  required
                  type="text"
                  name="name"
                  class="form-control"
                  id="name"
                  data-rule="minlen:4"
                  data-msg="Por favor, introduce al menos 4 caracteres"
                />
                <div class="validate"></div>
              </div>
              <div class="form-group col-md-6">
                <label for="name">Tu correo</label>
                <input
                  v-model="formData.email"
                  required
                  type="email"
                  class="form-control"
                  name="email"
                  id="email"
                  data-rule="email"
                  data-msg="Por favor, introduce un correo electrónico válido"
                />
                <div class="validate"></div>
              </div>
            </div>
            <div class="form-group">
              <label for="name">Asunto</label>
              <input
                v-model="formData.subject"
                required
                type="text"
                class="form-control"
                name="subject"
                id="subject"
                data-rule="minlen:4"
                data-msg="Por favor, introduce al menos 8 caracteres en el asunto"
              />
              <div class="validate"></div>
            </div>
            <div class="form-group">
              <label for="name">Mensaje</label>
              <textarea
                v-model="formData.message"
                required
                class="form-control"
                name="message"
                rows="10"
                data-rule="required"
                data-msg="Por favor, escribe algo para nosotros"
              ></textarea>
              <div class="validate"></div>
            </div>
            <div class="mb-3">
              <v-alert type="info" v-show="loading">
                <v-progress-circular
                  indeterminate
                  size="32"
                  color="primary"
                ></v-progress-circular>
                <div class="loading-text">Cargando...</div>
              </v-alert>
              <v-alert type="error" v-show="errorMessage">{{ errorMessage }}</v-alert>
              <v-alert type="info" v-show="showAlert">
                {{ alertMessage }}
              </v-alert>
            </div>

            <div class="text-center">
              <button type="submit">Enviar mensaje</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import {VAlert,VProgressCircular} from 'vuetify/components'

export default {
  name: 'ContactSection',
  components: {
    VAlert,
    VProgressCircular,
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      dialog: false,
      loading: false,
      alertMessage:'',
      errorMessage: '', // Mensaje de error
      showAlert: false,
    };
  },
  methods: {
    submitForm() {
      this.loading = true;
      this.errorMessage = ''; // Restablecer el mensaje de error
      axios
        .post('https://api.sidevtech.com/api/notification', this.formData)
        .then(response => {
          
          // Puedes mostrar un mensaje de éxito aquí
          if (response.data.status === 'success') {
            this.alertMessage = response.data.message;
             // Muestra el diálogo emergente de Vuetify
            this.formData = {
              name: '',
              email: '',
              subject: '',
              message: ''
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
          this.loading = false;
            this.showAlert = true;
            
            setTimeout(() => {
                this.showAlert = false;
                this.alertMessage = '';
              }, 2000);// Desactivar el estado de carga
        });
    }
  }
};
</script>

<style scoped>
/*--------------------------------------------------------------
# Contact
--------------------------------------------------------------*/
.contact .info {
  border-top: 3px solid #47b2e4;
  border-bottom: 3px solid #47b2e4;
  padding: 30px;
  background: #fff;
  width: 100%;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.1);
}

.contact .info i {
  font-size: 20px;
  color: #47b2e4;
  float: left;
  width: 44px;
  height: 44px;
  background: #e7f5fb;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
}

.contact .info h4 {
  padding: 0 0 0 60px;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #37517e;
}

.contact .info p {
  padding: 0 0 10px 60px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #6182ba;
}

.contact .info .email p {
  padding-top: 5px;
}

.contact .info .social-links {
  padding-left: 60px;
}

.contact .info .social-links a {
  font-size: 18px;
  display: inline-block;
  background: #333;
  color: #fff;
  line-height: 1;
  padding: 8px 0;
  border-radius: 50%;
  text-align: center;
  width: 36px;
  height: 36px;
  transition: 0.3s;
  margin-right: 10px;
}

.contact .info .social-links a:hover {
  background: #47b2e4;
  color: #fff;
}

.contact .info .email:hover i,
.contact .info .address:hover i,
.contact .info .phone:hover i {
  background: #47b2e4;
  color: #fff;
}

.contact .php-email-form {
  width: 100%;
  border-top: 3px solid #47b2e4;
  border-bottom: 3px solid #47b2e4;
  padding: 30px;
  background: #fff;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
}

.contact .php-email-form .form-group {
  padding-bottom: 8px;
}

.contact .php-email-form .validate {
  display: none;
  color: red;
  margin: 0 0 15px 0;
  font-weight: 400;
  font-size: 13px;
}

.contact .php-email-form .error-message {
  display: none;
  color: #fff;
  background: #ed3c0d;
  text-align: left;
  padding: 15px;
  font-weight: 600;
}

.contact .php-email-form .error-message br + br {
  margin-top: 25px;
}

.contact .php-email-form .sent-message {
  display: none;
  color: #fff;
  background: #18d26e;
  text-align: center;
  padding: 15px;
  font-weight: 600;
}

.contact .php-email-form .loading {
  display: none;
  background: #fff;
  text-align: center;
  padding: 15px;
}

.contact .php-email-form .loading:before {
  content: "";
  display: inline-block;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin: 0 10px -6px 0;
  border: 3px solid #18d26e;
  border-top-color: #eee;
  -webkit-animation: animate-loading 1s linear infinite;
  animation: animate-loading 1s linear infinite;
}

.contact .php-email-form .form-group {
  margin-bottom: 20px;
}

.contact .php-email-form label {
  padding-bottom: 8px;
}

.contact .php-email-form input,
.contact .php-email-form textarea {
  border-radius: 0;
  box-shadow: none;
  font-size: 14px;
  border-radius: 4px;
}

.contact .php-email-form input:focus,
.contact .php-email-form textarea:focus {
  border-color: #47b2e4;
}

.contact .php-email-form input {
  height: 44px;
}

.contact .php-email-form textarea {
  padding: 10px 12px;
}

.contact .php-email-form button[type="submit"] {
  background: #47b2e4;
  border: 0;
  padding: 12px 34px;
  color: #fff;
  transition: 0.4s;
  border-radius: 4px;
}

.contact .php-email-form button[type="submit"]:hover {
  background: #0f8fe4;
}

@-webkit-keyframes animate-loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes animate-loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-top: 10px;
  font-size: 14px;
}

.error-message {
  margin-top: 10px;
}
</style>
