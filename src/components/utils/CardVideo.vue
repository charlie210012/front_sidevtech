<template>
  <span @click="openModal">Ver video</span>
  <v-dialog v-model="modalOpen" max-width="80%" hide-overlay>
    <v-card class="video-card">
      <v-responsive class="embed-responsive-16by9">
        <div class="embed-responsive-video">
          <iframe
            width="100%"
            height="100%"
            :src="videoUrl"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </v-responsive>
    </v-card>
  </v-dialog>
</template>

<script>
import { VCard, VResponsive, VDialog } from 'vuetify/lib/components';

export default {
  components: {
    VCard,
    VResponsive,
    VDialog,
  },
  props: {
    videoUrl: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
  },
};
</script>

<style scoped>
.embed-responsive-video {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
}

.embed-responsive-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
}

.video-card {
  background-color: transparent;
  box-shadow: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.v-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
