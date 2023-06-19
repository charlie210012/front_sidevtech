<template>
    <i class="icofont-trash" @click="confirmDelete"></i>

    <!-- Ventana emergente de confirmación -->
    <div v-if="showConfirmation" class="modal-overlay">
      <div class="modal-content">
        <h3>Confirmar Eliminación</h3>
        <p>¿Está seguro de que desea eliminar el servicio?</p>
        <div class="modal-buttons">
          <button class="btn btn-secondary" @click="cancelDelete">Cancelar</button>
          <button class="btn btn-danger" @click="deleteService">Eliminar</button>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
  data() {
    return {
      showConfirmation: false, // Estado para mostrar/ocultar la ventana de confirmación
    };
  },
  methods: {
    confirmDelete() {
      this.showConfirmation = true; // Mostrar la ventana de confirmación al hacer clic en el icono de eliminación
    },
    cancelDelete() {
      this.showConfirmation = false; // Ocultar la ventana de confirmación al cancelar la eliminación
    },
    deleteService() {
        const urlBase = localStorage.getItem('urlBase');
        const requestBody = {
            id: this.id
        };
        const config = {
            headers: {
            Authorization: 'Bearer '+ localStorage.getItem('userToken')
            }
        };

        axios.post(urlBase + 'api/component/delete', requestBody, config)
            .then(response => {
            console.log('Respuesta:', response.data);
            if(response.status == 200){
                this.$emit('deleted');
            }
            // Realizar acciones después de la solicitud exitosa
            })
            .catch(error => {
            console.error('Error:', error);
            // Realizar acciones en caso de error
            });

        this.modalOpen = false;

        this.showConfirmation = false; // Ocultar la ventana de confirmación después de eliminar el servicio
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  max-width: 400px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  margin-left: 10px;
}
</style>
