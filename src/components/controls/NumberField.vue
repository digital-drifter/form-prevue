<template>
    <v-flex>
        <v-text-field :ref="config.uuid"
                      v-model="model"
                      v-validate="config.validation.rules"
                      :error-messages="errors.collect(config.validation.name)"
                      :data-vv-name="config.validation.name"
                      :data-vv-as="config.validation.as"
                      :name="config.name"
                      :label="label"
                      :required="required"
                      @input.capture="onInput($event)">
        </v-text-field>
        <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import { FieldSetting, FieldSettings } from '@/configs/FieldConfig'
  import maskInput from 'vanilla-text-mask/dist/vanillaTextMask.js'
  import createNumberMask from 'text-mask-addons/dist/createNumberMask'

  @Component
  export default class NumberField extends BaseControl {
    model: string | null = null
    maskedInput: Object = null

    get min (): number {
      return this.config.settings['min'].value
    }

    get max (): number {
      return this.config.settings['max'].value || Number.MAX_SAFE_INTEGER
    }

    get step (): number {
      return this.config.settings['step'].value
    }

    get allowDecimal (): boolean {
      return ('' + this.min).includes('.') || ('' + this.max).includes('.')
    }

    get allowNegative (): boolean {
      return (this.min < 0) || (this.max < 0)
    }

    get integerLimit (): number {
      let min: string = ('' + this.min).includes('.') ? ('' + this.min).split('.').shift() : ('' + this.min)
      let max: string = ('' + this.max).includes('.') ? ('' + this.max).split('.').shift() : ('' + this.max)
      let minLimit: number = min.replace(/-/g, '').length
      let maxLimit: number = max.replace(/-/g, '').length

      return minLimit >= maxLimit ? minLimit : maxLimit
    }

    get decimalLimit (): number {
      let minLimit: number = ('' + this.min).includes('.') ? ('' + this.min).split('.').pop().length : 0
      let maxLimit: number = ('' + this.max).includes('.') ? ('' + this.max).split('.').pop().length : 0

      return minLimit >= maxLimit ? minLimit : maxLimit
    }

    get rawNumericValue (): number {
      let value: string = this.maskedInput['textMaskInputElement']['state']['previousConformedValue']
      return value.includes('.') ? parseFloat(value.slice(0).replace(/,/g, '')) : parseInt(value.slice(0).replace(/,/g, ''), 10)
    }

    // get clampedValue (): string {
    //   try {
    //     let value: number = this.rawNumericValue
    //
    //     if (value > this.max) {
    //       return conformToMask(this.max, this.numberMask).conformedValue
    //     } else if (value < this.min) {
    //       return conformToMask(this.min, this.numberMask).conformedValue
    //     } else {
    //       return conformToMask(value, this.numberMask).conformedValue
    //     }
    //   } catch (e) {
    //     // do nothing...
    //     console.log(e)
    //   }
    // }

    get numberMask () {
      return createNumberMask({
        prefix: '',
        allowNegative: this.allowNegative,
        includeThousandsSeparator: this.integerLimit > 3,
        allowDecimal: this.allowDecimal,
        allowLeadingZeroes: false,
        decimalLimit: this.decimalLimit,
        integerLimit: this.integerLimit
      })
    }

    onInput (event: any): void {
      try {
        this.updateNumberMask(event.target)
      } catch (e) {
        // do nothing
      }
    }

    updateNumberMask (element: HTMLInputElement): void {
      try {
        this.maskedInput = maskInput({
          inputElement: element,
          mask: this.numberMask
        })
      } catch (e) {
        // do nothing...
      }
    }

    created (): void {
      this.$store.dispatch('FormModule/updateFieldSettings', {
        uuid: this.uuid,
        settings: new FieldSettings({
          label: new FieldSetting({
            label: 'Field Label',
            value: '',
            component: 'v-text-field'
          }),
          required: new FieldSetting({
            label: 'Required?',
            value: false,
            component: 'v-switch'
          }),
          min: new FieldSetting({
            label: 'Minimum Value',
            value: null,
            component: 'v-text-field',
            hint: 'Leave blank for no minimum value.'
          }),
          max: new FieldSetting({
            label: 'Maximum Value',
            value: null,
            component: 'v-text-field',
            hint: 'Leave blank for no maximum value.'
          }),
          step: new FieldSetting({
            label: 'Increment',
            value: null,
            component: 'v-text-field',
            hint: 'Leave blank for any value.'
          })
        })
      })
        .catch(() => {
          // do nothing...
        })
    }
  }
</script>
