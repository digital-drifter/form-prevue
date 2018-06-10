import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
import { FormControlConfig } from '@/components/controls/FormControlConfig'

@Component
export default class BaseControl extends Vue {
  x: number = 0
  y: number = 0
  menu: boolean = false
  @Prop() type: string
  @Prop() name: string
  @Prop() as: string
  @Prop([Object, String]) rules: (object | string)
  @Prop({required: false}) label: string
  @Prop({required: false, default: true}) required: boolean

  @Provide() config: FormControlConfig

  get settingsIcon(): Node {
    let component: Vue = this.$refs[this.name] as Vue

    return component.$el.childNodes[0].childNodes[0]
  }

  beforeCreate () {
    this.config = new FormControlConfig()
  }

  mounted (): void {
    this.settingsIcon.addEventListener('click', (event: Event) => {
      event.preventDefault()
      this.menu = false
      this.x = (event as MouseEvent).clientX
      this.y = (event as MouseEvent).clientY
      this.$nextTick(() => {
        this.menu = true
      })
    })
  }
}
