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
/* Aquí puedes agregar estilos globales o específicos para el componente */
</style>
