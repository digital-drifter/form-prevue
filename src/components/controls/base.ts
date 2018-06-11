import { Component, Prop, Vue } from 'vue-property-decorator'
import { FieldConfigInterface, FieldSettingsInterface } from '@/types/controls'
import { FieldOptionInterface } from '@/types/options'

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
    return this.$store.getters['FormModule/findFieldByUuid'](this.uuid)
  }

  get options(): FieldOptionInterface[] {
    return this.config.options || []
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

  get hint (): string | undefined {
    return this.config.settings.hint.value
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
    let promises: Promise<any>[] = []

    promises.push(this.$store.dispatch('FormModule/updateFieldSettings', {
      uuid: this.uuid,
      settings: this.settings
    }))

    promises.push(this.$store.dispatch('FormModule/updateFieldOptions', {
      uuid: this.uuid,
      options: this.options
    }))

    Promise.all(promises)
      .catch(error =>error)
  }
}
