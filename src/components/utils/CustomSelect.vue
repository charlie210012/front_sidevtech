<template>
    <v-select
      v-model="selectedOption"
      :items="options"
      item-text="text"
      item-value="value"
      :label="label"
      outlined
      clearable
    ></v-select>
  </template>
  
  <script>
  import {VSelect} from 'vuetify/components';
  export default {
    props: {
      options: {
        type: Array,
        required: true,
      },
      label: {
        type: String,
        default: 'Select',
      },
    },
    components:{
        VSelect
    },
    data() {
      return {
        selectedOption: null,
      };
    },
  };
  </script>
  