<template>
  <div>
    <nuxt-link to="/photos">Back To Photos</nuxt-link>
    <img :src="this.photo" class="mt-3" >
    <hr>
    <small>Photo ID: {{ $route.params.id }}</small>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photo: `https://picsum.photos/id/${this.$route.params.id}/740/400/`
    };
  },
};
</script>
