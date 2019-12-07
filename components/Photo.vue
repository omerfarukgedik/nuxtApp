<template>
  
    <div :class="this.sm">
      <nuxt-link style="text-decoration: none" :to="'photos/' + id">
        <div class="container-fluid p-2 mb-2  rounded shadow">
          <img :src="photo.download_url" class="border border-dark">
          <span class="ml-1">[{{photo.id}}]</span>
          <span>{{ photo.author }}</span>
        </div>
      </nuxt-link>
    </div>
</template>

<script>
export default {
  name: "Photo",
  props: ["photo", "id"],
  data () {
    return {
        sm: 'col-sm-6'
    }
  },
  mounted: function () { 
    this.$root.$on('myEvent', (sm) => {
     this.sm = sm;
    })
  }
};
</script>

<style scoped>

.container img{
  width: 100px;
  height: 70px;
}
</style>
