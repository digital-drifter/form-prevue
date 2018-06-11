import uuidv4 from 'uuid'
import Vue from 'vue'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { FieldConfigInterface } from '@/types/controls'
import FormStateInterface from '@/types/forms'
import { FieldOptionInterface } from '@/types/options'

const state: FormStateInterface = {
  uuid: '',
  fields: []
}

const getters: GetterTree<FormStateInterface, any> = {
  uuid: (state: FormStateInterface) => state.uuid,
  fields: (state: FormStateInterface) => state.fields,
  findFieldByUuid: (state: FormStateInterface) => (uuid: string) => state.fields.find((field: FieldConfigInterface) => field.uuid === uuid),
  findFieldIndex: (state: FormStateInterface) => (uuid: string) => state.fields.findIndex((field: FieldConfigInterface) => field.uuid === uuid),
}

const mutations: MutationTree<FormStateInterface> = {
  SET_FORM_UUID: (state: FormStateInterface, uuid: string) => {
    Vue.set(state, 'uuid', uuid)
  },
  SET_FORM_FIELDS: (state: FormStateInterface, fields: FieldConfigInterface[]) => {
    Vue.set(state, 'fields', fields)
  },
  ADD_FORM_FIELD: (state: FormStateInterface, field: FieldConfigInterface) => {
    Vue.set(state.fields, state.fields.length, field)
  },
  REMOVE_FORM_FIELD: (state: FormStateInterface, uuid: string) => {
    let fields: FieldConfigInterface[] = state.fields.filter((field: FieldConfigInterface) => field.uuid !== uuid)

    Vue.set(state, 'fields', fields)
  },
  TOGGLE_SETTINGS_MENU: (state: FormStateInterface, {field, options}) => {
    Vue.set(field.menu, 'open', options.open)
    Vue.set(field.menu, 'x', options.x)
    Vue.set(field.menu, 'y', options.y)
  },
  UPDATE_FIELD_SETTINGS: (state: FormStateInterface, {field, settings}) => {
    Vue.set(field, 'settings', {...settings})
  },
  UPDATE_FIELD_SETTING: (state: FormStateInterface, {index, key, setting}) => {
    Vue.set(state.fields[index].settings, key, setting)
  },
  UPDATE_FIELD_OPTIONS: (state: FormStateInterface, {field, options}) => {
    Vue.set(field, 'options', options)
  },
  ADD_FIELD_OPTION: (state: FormStateInterface, uuid: string) => {
    let field: FieldConfigInterface | undefined = state.fields.find(field => field.uuid === uuid)

    if (field) {
      Vue.set(field.options, field.options.length, {
        uuid: uuidv4(),
        label: '',
        value: ''
      })
    }
  },
  UPDATE_FIELD_OPTION: (state: FormStateInterface, {index, option}) => {
    let options: FieldOptionInterface[] = state.fields[index].options
    let i: number = options.findIndex(({uuid}) => option.uuid === uuid)

    Vue.set(options, i, option)
  },
  REMOVE_FIELD_OPTION: (state: FormStateInterface, {uuid, option}) => {
    let field: FieldConfigInterface | undefined = state.fields.find(field => field.uuid === uuid)

    if (field) {
      let options: FieldOptionInterface[] = field.options.filter(({uuid}) => uuid !== option.uuid)

      Vue.set(field, 'options', options)
    }
  },
  UPDATE_FIELD_VALIDATION_RULES: (state: FormStateInterface, {index, rules}) => {
    Vue.set(state.fields[index].validation, 'rules', rules)
  },
}

const actions: ActionTree<FormStateInterface, any> = {
  create: (context: ActionContext<FormStateInterface, any>) => {
    context.commit('SET_FORM_UUID', uuidv4())
    context.commit('SET_FORM_FIELDS', [])
  },
  addField: (context: ActionContext<FormStateInterface, any>, field: FieldConfigInterface) => {
    context.commit('ADD_FORM_FIELD', field)
  },
  removeField: (context: ActionContext<FormStateInterface, any>, uuid: string) => {
    let fields: FieldConfigInterface[] = context.state.fields.filter((field: FieldConfigInterface) => field.uuid !== uuid)

    context.commit('SET_FORM_FIELDS', fields)
  },
  toggleSettingsMenu: (context: ActionContext<FormStateInterface, any>, {uuid, options}) => {
    let field: FieldConfigInterface = context.getters['findFieldByUuid'](uuid)

    context.commit('TOGGLE_SETTINGS_MENU', {field, options})
  },
  updateFieldSettings: (context: ActionContext<FormStateInterface, any>, {uuid, settings}) => {
    let field: FieldConfigInterface = context.getters['findFieldByUuid'](uuid)

    context.commit('UPDATE_FIELD_SETTINGS', {field, settings})
  },
  updateFieldSetting: (context: ActionContext<FormStateInterface, any>, {uuid, key, setting}) => {
    let index: number = context.getters['findFieldIndex'](uuid)

    context.commit('UPDATE_FIELD_SETTING', {index, key, setting})
  },
  updateFieldOptions: (context: ActionContext<FormStateInterface, any>, {uuid, options}) => {
    let field: FieldConfigInterface = context.getters['findFieldByUuid'](uuid)
    options.forEach((option: FieldOptionInterface) => {
      option.uuid = option.uuid || uuidv4()
    })
    context.commit('UPDATE_FIELD_OPTIONS', {field, options})
  },
  updateFieldValidationRules: (context: ActionContext<FormStateInterface, any>, {uuid, rules}) => {
    let index: number = context.getters['findFieldIndex'](uuid)

    context.commit('UPDATE_FIELD_VALIDATION_RULES', {index, rules})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
