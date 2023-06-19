<template>
    <div class="login">
      <img class="wave" :src="waveImageUrl">
      <div class="container">
        <div class="img">
          <img :src="dataImageUrl">
        </div>
        <div class="login-content">
          <form id="formLogin" name="formLogin" @submit.prevent="submitForm">
            <img :src="upperLoginImageUrl">
            <h2 class="title">SIDEVTECH</h2>
            <div v-if="error" class="alert alert-danger" role="alert">
              <p>{{ errorMessage }}</p>
            </div>
            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5 for="email">Correo</h5>
                <input
                    id="email"
                    name="email"
                    type="email"
                    v-model="email"
                    class="input"
                    required
                    @focus="addcl"
                    @blur="remcl"
                    />
              </div>
            </div>
            <div class="alert alert-danger" id="emailAlert" name="identificationAlert" role="alert" v-if="identificationError">
              <p>Su numero de identificación es incorrecto</p>
            </div>
            <div class="input-div pass">
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5 for="password">Contraseña</h5>
                <input
                    id="password"
                    name="password"
                    type="password"
                    v-model="password"
                    class="input"
                    required
                    autocomplete="current-password"
                    @focus="addcl"
                    @blur="remcl"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                  <button type="submit" id="btnLogin" name="btnLogin" class="btn btn-primary">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
  
export default {
    name: 'LoginPage',
    created() {
        const token = localStorage.getItem('userToken');
        if (token) {
        this.$router.push('/dashboard');
        }
    },
    data() {
        return {
            waveImageUrl: require("./storage/images/wave.png"),
            dataImageUrl: require("./storage/images/data.svg"),
            upperLoginImageUrl: require("./storage/images/upperLogin.svg"),
            email: "",
            password: "",
            error: false,
            errorMessage: "",
        };
    },
    computed: {
        isFormValid() {
            // Aquí puedes agregar la lógica para determinar si el formulario es válido o no
            // Por ejemplo, verificar si los campos de identificación y contraseña no están vacíos
            return this.correo !== "" && this.password !== "";
        },
    },
    methods: {
        submitForm() {
            const urlBase = localStorage.getItem('urlBase');
            axios.post(urlBase + 'oauth/token', {
            grant_type: 'client_credentials',
            client_id: process.env.VUE_APP_API_ID,
            client_secret: process.env.VUE_APP_API_KEY,
            scope: '',
            })
            .then((response) => {
                localStorage.setItem('accessToken', response.data.access_token);
                this.authenticateUser(this.password, this.email);
            });
            
        },
        async authenticateUser(password, email) {
        const urlBase = localStorage.getItem('urlBase');
        try {
            // Realiza la autenticación y obtén el token de acceso aquí
            // Por ejemplo, utilizando Axios para hacer una solicitud HTTP POST a la API
            axios.post(urlBase + 'api/login', {
                email,
                password,
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then((response) => {
                    //Si la autenticación es exitosa, guarda el token en el almacenamiento local y redirige al usuario
                if (response.status == 200) {
                    localStorage.setItem("userToken", response.data.token);
                    localStorage.setItem("clientId", response.data.business_id);
                    this.$router.push("/dashboard");
                } else {
                    alert("Error: la autenticación falló");
                // Si la autenticación falla, muestra un mensaje de error
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.errorMessage = 'credenciales incorrectas.'
                // Mostrar alerta de error específica para el estado 401
                this.error = true;
                setTimeout(() => {
                    this.error = false;
                    this.errorMessage = '';
                }, 2000);
                } else {
                // Mostrar alerta genérica para otros errores
                    this.errorMessage = 'ocurrió un error en la autenticación.'
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                        this.errorMessage = '';
                    }, 2000);
                }
            });
        } catch (error) {
            this.error = true;
        }
        },
        addcl(event) {
            const parent = event.target.parentNode.parentNode;
            parent.classList.add("focus");
        },
        remcl(event) {
            const parent = event.target.parentNode.parentNode;
            if (event.target.value === "") {
                parent.classList.remove("focus");
            }
        },
    },   
};
</script>

<style scoped>
  /* Aquí puedes agregar estilos específicos para el componente Home */
  *{
	padding: 0;
	margin: 0;
	box-sizing: border-box;
    }

    body{
        font-family: 'Poppins', sans-serif;
        overflow: hidden;
    }

    .wave{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 100%;
        z-index: -1;
    }

    .container{
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap :7rem;
        padding: 0 2rem;
    }

    .img{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .login-content{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
    }

    .img img{
        width: 500px;
    }

    form{
        width: 360px;
    }

    .login-content img{
        height: 100px;
    }

    .login-content h2{
        margin: 15px 0;
        color: #333;
        text-transform: uppercase;
        font-size: 2.9rem;
    }

    .login-content .input-div{
        position: relative;
        display: grid;
        grid-template-columns: 7% 93%;
        margin: 25px 0;
        padding: 5px 0;
        border-bottom: 2px solid #d9d9d9;
    }

    .login-content .input-div.one{
        margin-top: 0;
    }

    .i{
        color: #d9d9d9;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .i i{
        transition: .3s;
    }

    .input-div > div{
        position: relative;
        height: 45px;
    }

    .input-div > div > h5{
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        font-size: 18px;
        transition: .3s;
    }

    .input-div:before, .input-div:after{
        content: '';
        position: absolute;
        bottom: -2px;
        width: 0%;
        height: 2px;
        background-color: #38d39f;
        transition: .4s;
    }

    .input-div:before{
        right: 50%;
    }

    .input-div:after{
        left: 50%;
    }

    .input-div.focus:before, .input-div.focus:after{
        width: 50%;
    }

    .input-div.focus > div > h5{
        top: -5px;
        font-size: 15px;
    }

    .input-div.focus > .i > i{
        color: #38d39f;
    }

    .input-div > div > input{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: none;
        padding: 0.5rem 0.7rem;
        font-size: 1.2rem;
        color: #555;
        font-family: 'poppins', sans-serif;
    }

    .input-div.pass{
        margin-bottom: 4px;
    }

    a{
        display: block;
        text-align: right;
        text-decoration: none;
        color: #999;
        font-size: 0.9rem;
        transition: .3s;
    }

    a:hover{
        color: #38d39f;
    }

    .btn{
        display: block;
        width: 100%;
        height: 50px;
        border-radius: 25px;
        outline: none;
        border: none;
        background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
        background-size: 200%;
        font-size: 1.2rem;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        text-transform: uppercase;
        margin: 1rem 0;
        cursor: pointer;
        transition: .5s;
    }
    .btn:hover{
        background-position: right;
    }


    @media screen and (max-width: 1050px){
        .container{
            grid-gap: 5rem;
        }
    }

    @media screen and (max-width: 1000px){
        form{
            width: 290px;
        }

        .login-content h2{
            font-size: 2.4rem;
            margin: 8px 0;
        }

        .img img{
            width: 400px;
        }
    }

    @media screen and (max-width: 900px){
        .container{
            grid-template-columns: 1fr;
        }

        .img{
            display: none;
        }

        .wave{
            display: none;
        }

        .login-content{
            justify-content: center;
        }
    }

    .alert {
        margin-bottom: 1rem;
        padding: .75rem 1.25rem;
        border: 1px solid transparent;
        border-radius: .25rem;
    }

    .alert-danger {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
    }
  </style>
  