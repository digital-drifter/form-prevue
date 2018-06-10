<template>
    <v-flex>
        <v-text-field :ref="config.uuid"
                      v-model.number="model"
                      v-validate="config.validation.rules"
                      :error-messages="errors.collect(config.validation.name)"
                      :data-vv-name="config.validation.name"
                      :data-vv-as="config.validation.as"
                      :name="config.name"
                      :label="label"
                      :required="required"
                      :min="min"
                      :max="max"
                      :step="step"
                      :mask="mask"
                      @change="$emit('change', $event)"
                      @input="$emit('update', $event)">
        </v-text-field>
        <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import { FormControlSetting, FormControlSettings } from './FormControlConfig'

  @Component
  export default class NumberField extends BaseControl {
    model: number | null = null

    get min (): number {
      return this.config.settings['min'].value
    }

    get max (): number {
      return this.config.settings['max'].value
    }

    get step (): number {
      return this.config.settings['step'].value
    }

    get mask (): string {
      let minVal: string = '' + this.config.settings['min'].value
      let minValIsDecimal:boolean = minVal.includes('.')
      let minParts: string[] | string = minValIsDecimal ? minVal.split('.') : minVal
      let maxVal: string = '' + this.config.settings['max'].value
      let maxValIsDecimal:boolean = maxVal.includes('.')
      let maxParts: string[] | string = maxValIsDecimal ? maxVal.split('.') : maxVal

      let mantissa: number = (this.mantissa(minParts) > this.mantissa(maxParts)) ? this.mantissa(minParts) : this.mantissa(maxParts)
      let mask: string = Array(mantissa).fill('#').join('')

      if (minValIsDecimal || maxValIsDecimal) {
        let decimal: number = (this.decimal(minParts) > this.decimal(maxParts)) ? this.decimal(minParts) : this.decimal(maxParts)

        mask += '.' +  Array(decimal).fill('#').join('')
      }

      return mask
    }

    mantissa(value:string | string[]): number {
      let mantissa: string

      if (Array.isArray(value)) {
        mantissa = value[0] ? value[0] : ''
      } else {
        mantissa = value ? value : ''
      }

      return mantissa.charAt(0) === '-' ? mantissa.length - 1 : mantissa.length
    }

    decimal (value:string | string[]): number {
      if (Array.isArray(value)) {
        let decimal: string | undefined = value[1]
        return decimal ? decimal.length : 0
      }
      return 0
    }

    created (): void {
      this.$store.dispatch('FormModule/updateFieldSettings', {
        uuid: this.uuid,
        settings: new FormControlSettings({
          label: new FormControlSetting({
            label: 'Number Field Label',
            value: '',
            component: 'v-text-field'
          }),
          required: new FormControlSetting({
            label: 'Required?',
            value: false,
            component: 'v-switch'
          }),
          min: new FormControlSetting({
            label: 'Minimum Value',
            value: 0,
            component: 'v-text-field'
          }),
          max: new FormControlSetting({
            label: 'Maximum Value',
            value: 99999999999,
            component: 'v-text-field'
          }),
          step: new FormControlSetting({
            label: 'Increment',
            value: 0.1,
            component: 'v-text-field'
          })
        })
      })
        .catch(error => {
          console.error(error)
        })
    }
  }
</script>
