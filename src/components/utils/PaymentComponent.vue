<template>
  <div class="payment-summary">
    <h2 class="payment-summary__title">Resumen de Pago</h2>
    <div class="payment-summary__details">
      <div class="payment-summary__row">
        <span class="payment-summary__label">Nombre:</span>
        <span class="payment-summary__value">{{ nombre }}</span>
      </div>
      <div class="payment-summary__row">
        <span class="payment-summary__label">Email:</span>
        <span class="payment-summary__value">{{ email }}</span>
      </div>
      <div class="payment-summary__row">
        <span class="payment-summary__label">Total a pagar:</span>
        <span class="payment-summary__value">{{ total }}</span>
      </div>
      <div class="payment-summary__row">
        <span class="payment-summary__label">Descripción:</span>
        <span class="payment-summary__value">{{ descripcion }}</span>
      </div>
      <div class="payment-summary__row">
        <span class="payment-summary__label">Método de pago:</span>
        <span class="payment-summary__value">{{ metodoPago }}</span>
      </div>
    </div>
    <button class="payment-summary__button" @click="realizarPago">Realizar Pago</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      email: '',
      total: 0,
      descripcion: '',
      metodoPago: '',
    };
  },
  methods: {
    realizarPago() {
      // Aquí se puede agregar la lógica para enviar la solicitud de pago a la pasarela de pago
      // utilizando la información almacenada en los datos del componente.
      // Por ejemplo, se puede llamar a una función de pago o realizar una redirección a la página de pago.
      // También se pueden utilizar librerías o componentes de pasarelas de pago para gestionar el proceso de pago.
    },
  },
};
</script>

<style scoped>
.payment-summary {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
}

.payment-summary__title {
  font-size: 24px;
  margin-bottom: 10px;
}

.payment-summary__details {
  margin-bottom: 20px;
}

.payment-summary__row {
  display: flex;
  margin-bottom: 10px;
}

.payment-summary__label {
  font-weight: bold;
  width: 120px;
}

.payment-summary__value {
  flex-grow: 1;
}

.payment-summary__button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.payment-summary__button:hover {
  background-color: #0069d9;
}
</style>
