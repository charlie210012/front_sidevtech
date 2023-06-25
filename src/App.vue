<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/about">Acerca de</router-link>
    </nav>
     -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
      localStorage.setItem('urlBase', process.env.VUE_APP_API_URL);
  }
  // Otras opciones de componente si las necesitas
};
</script>

<style>
  body {
    font-family: "Open Sans", sans-serif;
    color: #444444;
  }

  a {
    color: #47b2e4;
  }

  a:hover {
    color: #73c5eb;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Jost", sans-serif;
  }

    
/*--------------------------------------------------------------
# Preloader
--------------------------------------------------------------*/
#preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  overflow: hidden;
  background: #37517e;
}

#preloader:before {
  content: "";
  position: fixed;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  border: 6px solid #37517e;
  border-top-color: #fff;
  border-bottom-color: #fff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  -webkit-animation: animate-preloader 1s linear infinite;
  animation: animate-preloader 1s linear infinite;
}

@-webkit-keyframes animate-preloader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate-preloader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/*--------------------------------------------------------------
# Back to top button
--------------------------------------------------------------*/
.back-to-top {
  position: fixed;
  display: none;
  right: 15px;
  bottom: 15px;
  z-index: 99999;
}

.back-to-top i {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background: #47b2e4;
  color: #fff;
  transition: all 0.4s;
}

.back-to-top i:hover {
  background: #209dd8;
  color: #fff;
}

/* Get Startet Button */
.get-started-btn {
  margin-left: 25px;
  color: #fff;
  border-radius: 50px;
  padding: 6px 25px 7px 25px;
  white-space: nowrap;
  transition: 0.3s;
  font-size: 14px;
  display: inline-block;
  border: 2px solid #47b2e4;
  font-weight: 600;
}

.get-started-btn:hover {
  background: #31a9e1;
  color: #fff;
}

@media (max-width: 768px) {
  .get-started-btn {
    margin: 0 48px 0 0;
    padding: 6px 20px 7px 20px;
  }
}

/* Mobile Navigation */
.mobile-nav-toggle {
  position: fixed;
  top: 20px;
  right: 15px;
  z-index: 9998;
  border: 0;
  background: none;
  font-size: 24px;
  transition: all 0.4s;
  outline: none !important;
  line-height: 1;
  cursor: pointer;
  text-align: right;
}

.mobile-nav-toggle i {
  color: #fff;
}

.mobile-nav {
  position: fixed;
  top: 55px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  z-index: 9999;
  overflow-y: auto;
  background: #fff;
  transition: ease-in-out 0.2s;
  opacity: 0;
  visibility: hidden;
  border-radius: 10px;
  padding: 10px 0;
}

.mobile-nav * {
  margin: 0;
  padding: 0;
  list-style: none;
}

.mobile-nav a {
  display: block;
  position: relative;
  color: #37517e;
  padding: 10px 20px;
  font-weight: 500;
  outline: none;
}

.mobile-nav a:hover, .mobile-nav .active > a, .mobile-nav li:hover > a {
  color: #47b2e4;
  text-decoration: none;
}

.mobile-nav .drop-down > a:after {
  content: "\ea99";
  font-family: IcoFont;
  padding-left: 10px;
  position: absolute;
  right: 15px;
}

.mobile-nav .active.drop-down > a:after {
  content: "\eaa1";
}

.mobile-nav .drop-down > a {
  padding-right: 35px;
}

.mobile-nav .drop-down ul {
  display: none;
  overflow: hidden;
}

.mobile-nav .drop-down li {
  padding-left: 20px;
}

.mobile-nav-overly {
  width: 100%;
  height: 100%;
  z-index: 9997;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(40, 58, 90, 0.6);
  overflow: hidden;
  display: none;
  transition: ease-in-out 0.2s;
}

.mobile-nav-active {
  overflow: hidden;
}

.mobile-nav-active .mobile-nav {
  opacity: 1;
  visibility: visible;
}

.mobile-nav-active .mobile-nav-toggle i {
  color: #fff;
}

  /*--------------------------------------------------------------
# Sections General
--------------------------------------------------------------*/
section {
  padding: 60px 0;
  overflow: hidden;
}

.section-bg {
  background-color: #f3f5fa;
}

.section-title {
  text-align: center;
  padding-bottom: 30px;
}

.section-title h2 {
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
  padding-bottom: 20px;
  position: relative;
  color: #37517e;
}

.section-title h2::before {
  content: '';
  position: absolute;
  display: block;
  width: 120px;
  height: 1px;
  background: #ddd;
  bottom: 1px;
  left: calc(50% - 60px);
}

.section-title h2::after {
  content: '';
  position: absolute;
  display: block;
  width: 40px;
  height: 3px;
  background: #47b2e4;
  bottom: 0;
  left: calc(50% - 20px);
}

.section-title p {
  margin-bottom: 0;
}

</style>
