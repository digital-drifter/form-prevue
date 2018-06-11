import { Component, Prop, Vue } from 'vue-property-decorator'
import { FieldConfigInterface, FieldSettingsInterface } from '@/types/controls'

@Component({
  components: {
    'settings': () => import('@/components/controls/Settings.vue')
  }
})
export default class BaseControl extends Vue {
  settings: FieldSettingsInterface

  @Prop() uuid: string

  get element (): HTMLElement {
    let component: Vue = <Vue>this.$refs[this.uuid]

    return <HTMLElement>component.$el
  }

  get config (): FieldConfigInterface {
    return this.$store.getters['FormModule/findFieldByUuid'](this.uuid) || null
  }

  get validation (): string | object {
    return this.config.validation
  }

  get autocomplete (): boolean {
    return this.config.settings.autocomplete.value
  }

  get label (): string | undefined {
    return this.config.settings.label.value
  }

  get required (): boolean {
    return this.config.settings.required.value
  }

  get placeholder (): string | undefined {
    return this.config.settings.placeholder.value
  }

  // @Watch('required')
  // onRequiredChanged (current: boolean, previous: boolean) {
  //   if (this.config && this.validation) {
  //     this.$store.dispatch('FormModule/updateFieldValidationRules', {
  //       uuid: this.uuid,
  //       rules: Object.assign({}, this.config.validation.rules, {required: current && !previous})
  //     })
  //       .catch(error => {
  //         console.error(error)
  //       })
  //   }
  // }

  created (): void {
    this.$store.dispatch('FormModule/updateFieldSettings', {
      uuid: this.uuid,
      settings: this.settings
    })
      .catch(error => {
        // console.error(error)
        return error
      })
  }
}
