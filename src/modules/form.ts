import Vue from 'vue'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import uuidv4 from 'uuid'
import FormControlConfig from '@/components/controls/FormControlConfig'
import FormControlConfigInterface, { FormControlSettingsInterface } from '@/types/controls'

interface FormState {
  uuid: string | null
  fields: FormControlConfigInterface[]
}

const state: FormState = {
  uuid: null,
  fields: []
}

const getters: GetterTree<FormState, any> = {
  uuid: (state: FormState) => state.uuid,
  fields: (state: FormState) => state.fields,
  findFieldByUuid: (state: FormState) => (uuid: string) => state.fields.find(field => field.uuid === uuid)
}

const mutations: MutationTree<FormState> = {
  SET_FORM_UUID: (state: FormState, uuid: string) => {
    Vue.set(state, 'uuid', uuid)
  },
  SET_FORM_FIELDS: (state: FormState, fields: FormControlConfigInterface[]) => {
    Vue.set(state, 'fields', fields)
  },
  ADD_FORM_FIELD: (state: FormState, field: FormControlConfigInterface) => {
    Vue.set(state.fields, state.fields.length, field)
  },
  TOGGLE_SETTINGS_MENU: (state: FormState, {field, options}) => {
    Vue.set(field, 'menu', {
      open: options.open,
      x: options.x,
      y: options.y
    })
  },
  UPDATE_FIELD_SETTINGS: (state: FormState, {field, settings}) => {
    Vue.set(field, 'settings', {...settings})
  },
  UPDATE_FIELD_SETTING: (state: FormState, {index, key, setting}) => {
    Vue.set(state.fields[index].settings, key, setting)
  },
}

const actions: ActionTree<FormState, any> = {
  create: (context: ActionContext<FormState, any>) => {
    context.commit('SET_FORM_UUID', uuidv4())
    context.commit('SET_FORM_FIELDS', [])
  },
  addField: (context: ActionContext<FormState, any>, field: FormControlConfig) => {
    context.commit('ADD_FORM_FIELD', field)
  },
  toggleSettingsMenu: (context: ActionContext<FormState, any>, {uuid, options}) => {
    let field: FormControlConfigInterface = context.getters['findFieldByUuid'](uuid)

    context.commit('TOGGLE_SETTINGS_MENU', {field, options})
  },
  updateFieldSettings: (context: ActionContext<FormState, any>, {uuid, settings}) => {
    let field: FormControlConfigInterface = context.getters['findFieldByUuid'](uuid)

    context.commit('UPDATE_FIELD_SETTINGS', {field, settings})
  },
  updateFormControlSetting: (context: ActionContext<FormState, any>, {uuid, key, setting}) => {
    let index: number = context.state.fields.findIndex(field => uuid === field.uuid)

    context.commit('UPDATE_FIELD_SETTING', {index, key, setting})
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
