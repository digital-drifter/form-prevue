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
  import { FieldSetting, FieldSettings } from '@/configs/SettingsConfig'
  import maskInput from 'vanilla-text-mask/dist/vanillaTextMask.js'
  import createNumberMask from 'text-mask-addons/dist/createNumberMask'
  import { FieldSettingsInterface } from '@/types/controls'

  @Component
  export default class NumberField extends BaseControl {
    model: string | null = null

    maskedInput: Object | null = null

    settings: FieldSettingsInterface = new FieldSettings({
      label: new FieldSetting({
        label: 'Field Label',
        value: '',
        component: 'v-text-field'
      }),
      required: new FieldSetting({
        label: 'Required',
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
      let minLimit: number = this.integerLength(this.min)
      let maxLimit: number = this.integerLength(this.max)

      return minLimit >= maxLimit ? minLimit : maxLimit
    }

    get decimalLimit (): number {
      let minLimit: number = this.decimalLength(this.min)
      let maxLimit: number = this.decimalLength(this.max)

      return minLimit >= maxLimit ? minLimit : maxLimit
    }

    // get rawNumericValue (): number {
    //   let value: string = <string>this.maskedInput['textMaskInputElement']['state']['previousConformedValue']
    //   return value.includes('.') ? parseFloat(value.slice(0).replace(/,/g, '')) : parseInt(value.slice(0).replace(/,/g, ''), 10)
    // }

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

    integerLength(value:number):number {
      if (this.isDecimal(value)) {
        let integer: string = this.splitDecimal(value).shift() || ''
        return integer.replace(/-/g, '').length
      }
      return value.toString(10).replace(/-/g, '').length || 0
    }

    decimalLength(value:number):number {
      if (this.isDecimal(value)) {
        let decimal: string = this.splitDecimal(value).pop() || ''
        return decimal.length
      }
      return 0
    }

    splitDecimal(value: number): string[] {
      return value.toString().split('.')
    }

    isDecimal(value: number):boolean {
      return value.toString().includes('.')
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
  }
</script>
