<template>
    <section id="hero" class="d-flex align-items-center">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
            <h1>Crearemos las mejores soluciones para tu negocio</h1>
            <h2>Nuestro equipo de desarolladores talentosos lo hará por ti</h2>
            <div class="d-lg-flex">
              <a href="https://intelligentsai.sidevtech.com/login" target="_blank" class="btn-get-started scrollto">Iniciar Sesión</a>
              <!-- <a class="venobox btn-watch-video">
                <CardVideo 
                :videoUrl="videoUrl" 
                :videoTitle="videoTitle"
                />
                <i class="icofont-play-alt-2"></i>
              </a> -->
            </div>
          </div>
          <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
            <img :src="imgHero" class="img-fluid animated" alt="">
          </div>
        </div>
      </div>
      
    </section>
  </template>
  
  <script>
  import imgHero from "./assets/hero.png";
  // import CardVideo from "./utils/CardVideo.vue";
  export default {
    components:{
      // CardVideo
    },
    data() {
    return {
      imgHero: imgHero,
      videoUrl: "https://www.youtube.com/embed/L8oS-SpwG6Y",
      videoTitle: "Prueba"
    };
  }
  };
  </script>
  
  <style scoped>
  /*--------------------------------------------------------------
# Hero Section
--------------------------------------------------------------*/
#hero {
  width: 100%;
  height: 80vh;
  background: #37517e;
}

#hero .container {
  padding-top: 72px;
}

#hero .container a {
  text-decoration: none;
}

#hero h1 {
  margin: 0 0 10px 0;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  color: #fff;
}

#hero h2 {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 50px;
  font-size: 24px;
}

#hero .btn-get-started {
  font-family: "Jost", sans-serif;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 10px 28px 11px 28px;
  border-radius: 50px;
  transition: 0.5s;
  margin: 10px 0 0 0;
  color: #fff;
  background: #47b2e4;
}

#hero .btn-get-started:hover {
  background: #209dd8;
}

#hero .btn-watch-video {
  font-size: 16px;
  display: inline-block;
  padding: 10px 0 8px 40px;
  transition: 0.5s;
  margin: 10px 0 0 25px;
  color: #fff;
  position: relative;
}

#hero .btn-watch-video i {
  color: #fff;
  font-size: 32px;
  position: absolute;
  left: 0;
  top: 7px;
  transition: 0.3s;
}

#hero .btn-watch-video:hover i {
  color: #47b2e4;
}

#hero .animated {
  animation: up-down 2s ease-in-out infinite alternate-reverse both;
}

@media (max-width: 991px) {
  #hero {
    height: 100vh;
    text-align: center;
  }
  #hero .animated {
    -webkit-animation: none;
    animation: none;
  }
  #hero .hero-img {
    text-align: center;
  }
  #hero .hero-img img {
    width: 50%;
  }
}

@media (max-width: 768px) {
  #hero h1 {
    font-size: 28px;
    line-height: 36px;
  }
  #hero h2 {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 30px;
  }
  #hero .hero-img img {
    width: 70%;
  }
}

@media (max-width: 575px) {
  #hero .hero-img img {
    width: 80%;
  }
  #hero .btn-get-started {
    font-size: 16px;
    padding: 10px 24px 11px 24px;
  }
  #hero .btn-watch-video {
    font-size: 16px;
    padding: 10px 0 8px 40px;
    margin-left: 20px;
  }
  #hero .btn-watch-video i {
    font-size: 32px;
    top: 7px;
  }
}

@-webkit-keyframes up-down {
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(-10px);
  }
}

@keyframes up-down {
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(-10px);
  }
}

  </style>
  