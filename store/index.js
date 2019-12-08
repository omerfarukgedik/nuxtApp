import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      photos: [],
      page: 1
    },
    mutations:{
      setPhotos(state, photos){
        state.photos = photos
      },
      setNextPhotos(state, newPhotos){
        state.photos = state.photos.concat(newPhotos)
      },
    },
    actions:{
      nuxtServerInit(vuexContent, context){
        return context.$axios.get(`/v2/list?limit=10&page=1`)
          .then(res => {
            vuexContent.commit("setPhotos", res.data)
          })
      },
      addPhotos(vuexContent){
        this.state.page++
        return this.$axios.get(`/v2/list?limit=10&page=${this.state.page}`)
          .then(res => {
            vuexContent.commit("setNextPhotos", res.data)
          })
      }
    },
    getters: {
      getPhotos(state){
        return state.photos
      }
    }
  })
}

export default createStore