import Vue from 'vue'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import uuidv4 from 'uuid'

interface Field {
  id: string
}

interface FormState {
  id: string | null
  fields: Field[]
}

const state: FormState = {
  id: null,
  fields: []
}

const getters: GetterTree<FormState, any> = {
  id: (state: FormState) => state.id,
  fields: (state: FormState) => state.fields,
  findFieldById: (state: FormState) => (id: string) => state.fields.find(field => field.id === id)
}

const mutations: MutationTree<FormState> = {
  SET_FORM_ID: (state: FormState, id: string) => {
    Vue.set(state, 'id', id)
  },
  SET_FORM_FIELDS: (state: FormState, fields: Field[]) => {
    Vue.set(state, 'fields', fields)
  }
}

const actions: ActionTree<FormState, any> = {
  create: (context: ActionContext<FormState, any>) => {
    context.commit('SET_FORM_ID', uuidv4())
    context.commit('SET_FORM_FIELDS', [])
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
