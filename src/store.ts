import Vue from 'vue'
import Vuex, { Payload, Store } from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const plugin: VuexPersistence<typeof Store, Payload> = new VuexPersistence({
  storage: window.localStorage
})

const RootState: any = {

}

const store = new Store<typeof RootState>({
  strict: true,
  plugins: [plugin.plugin],
  state: RootState
})

export default store
