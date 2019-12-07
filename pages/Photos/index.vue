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
      <Photo v-for="p in filteredPhotos" :key="p.id" :id="p.id" :photo="p"/>
    </div>
    <Trigger @triggerIntersected="loadMore"/>
  </div>
</template>

<script>
import Photo from "@/components/Photo";
import Trigger from '@/components/Trigger'


export default {
  components: {
    Photo,
    Trigger
  },
  data() {
    return {
      photos: [],
      page: 1,
      list: true,
      iconName: 'grip-lines',
      search: ''
    };
  },
  computed: {
    filteredPhotos: function(){
      return this.photos.filter((photo)=>{
        return photo.author.match(this.search);
      })
    }
  },
  async created() {
    const config = {
      headers: {
        Accept: "application/json"
      }
    };

    try {
      const res = await this.$axios.get("/v2/list?page=1&limit=10", config);

      this.photos = res.data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async loadMore() {
      const config = {
        headers: {
          Accept: "application/json"
        }
      };

      this.page += 1;
      const { data } = await this.$axios.get(`/v2/list?page=${this.page}&limit=10`, config);
      this.photos = [...this.photos, ...data];
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
