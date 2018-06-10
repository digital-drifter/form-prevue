import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import FieldConfig, { FieldSettings } from '@/configs/FieldConfig'
import Settings from '@/components/controls/Settings.vue'

@Component({
  components: {
    Settings
  }
})
export default class BaseControl extends Vue {
  settings: FieldSettings

  @Prop() type: string

  @Prop() uuid: string

  get config (): FieldConfig {
    return this.$store.getters['FormModule/findFieldByUuid'](this.uuid)
  }

  get label (): string {
    return this.config.settings['label']['value']
  }

  get required (): boolean {
    if (this.config.settings) {
      return this.config.settings['required']['value']
    }
    return false
  }

  @Watch('required')
  onRequiredChanged (current: boolean, previous: boolean) {
    this.$store.dispatch('FormModule/updateFieldValidationRules', {
      uuid: this.uuid,
      rules: Object.assign({}, this.config.validation.rules, {required: current && !previous})
    })
      .catch(error => {
        console.error(error)
      })
  }
}
