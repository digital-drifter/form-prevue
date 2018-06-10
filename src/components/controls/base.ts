import { Component, Prop, Vue } from 'vue-property-decorator'
import FormControlConfig from '@/components/controls/FormControlConfig'
import Settings from '@/components/controls/Settings.vue'

@Component({
  components: {
    Settings
  }
})
export default class BaseControl extends Vue {
  @Prop() type: string

  @Prop() uuid: string

  get config (): FormControlConfig {
    return this.$store.getters['FormModule/findFieldByUuid'](this.uuid)
  }

  get label (): string {
    return this.config.settings['label']['value']
  }

  get required (): boolean {
    return this.config.settings['required']['value']
  }
}
