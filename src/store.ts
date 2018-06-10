import Vue from 'vue'
import Vuex, { Payload, Store } from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as Modules from '@/modules'

Vue.use(Vuex)

const plugin: VuexPersistence<typeof Store, Payload> = new VuexPersistence({
  strictMode: true,
  storage: window.localStorage
})

const RootState: any = {

}

const store = new Store<typeof RootState>({
  strict: true,
  plugins: [plugin.plugin],
  state: RootState,
  mutations: {
    RESTORE_MUTATION: plugin.RESTORE_MUTATION
  },
  modules: {
    ...Modules
  }
})

export default store
