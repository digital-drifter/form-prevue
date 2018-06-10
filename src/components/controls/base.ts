import { Component, Prop, Vue } from 'vue-property-decorator'
import FormControlConfig from '@/components/controls/FormControlConfig'
import { FormControlSettingInterface } from '@/types/controls'

@Component
export default class BaseControl extends Vue {
  @Prop() type: string

  @Prop() uuid: string

  get config (): FormControlConfig {
    return this.$store.getters['FormModule/findFieldByUuid'](this.uuid)
  }
}
