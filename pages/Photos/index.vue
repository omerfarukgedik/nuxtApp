<template>
  <div>
    <div class="row mb-4 ">
      <div class="col-sm-11 ">
        <input type="text" placeholder="Search Author" v-model="search" class="form-control shadow border-warning">
      </div>
      <div class="col-sm-1 text-right mt-2">
        <font-awesome-icon @click="changeIcon" fas :icon="this.iconName" />
      </div>
    </div>
    
    <div class="row pt-2">
      <Photo v-for="(p, index) in  filteredPhotos" :key="index" :photo="p"/>
    </div>
    <Trigger @triggerIntersected="loadMore"/>
  </div>
</template>

<script>
import Photo from "@/components/Photo";
import Trigger from "@/components/Trigger"


export default {
  components: {
    Photo,
    Trigger
  },
  data() {
    return {
      list: true,
      iconName: 'grip-lines',
      search: ''
    };
  },
  computed: {
    photos(){
      return this.$store.getters.getPhotos
    },
    filteredPhotos(search){
      return this.$store.getters.getPhotos.filter((photo)=>{
        return photo.author.match(this.search);
      })
      
    }
  },
  methods: {
    async loadMore() {
      return this.$store.dispatch('addPhotos')
    },
    changeIcon: function(){
      if(this.list){
        this.$root.$emit('myEvent', 'col-sm-12');
        this.list = false
        this.iconName = 'th-large'
      }
      else{        
        this.$root.$emit('myEvent', 'col-sm-6');
        this.list = true
        this.iconName = 'grip-lines'
      }
    },
  }
};
</script>

<style>
</style>
