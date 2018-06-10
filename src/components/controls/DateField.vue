<template>
    <v-flex>
        <v-text-field data-input
                      type="text"
                      :ref="config.name"
                      v-model="model"
                      v-validate="config.validation.rules"
                      :error-messages="errors.collect(config.validation.name)"
                      :data-vv-name="config.validation.name"
                      :data-vv-as="config.validation.as"
                      :name="config.name"
                      :label="label"
                      :required="required"
                      @change="$emit('change', $event)"
                      @update="$emit('update', $event)">
        </v-text-field>
        <settings :config="config"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import Flatpickr from 'flatpickr'
  import BaseControl from '@/components/controls/base'
  import Settings from '@/components/controls/Settings.vue'

  @Component({
    components: {
      Settings
    }
  })
  export default class DateField extends BaseControl {
    model: string = (new Date()).toISOString().substring(0, 10)

    get flatpickr (): HTMLElement {
      return this.$refs[this.uuid]['$el']
    }

    get label (): string {
      return this.config.settings['label']['value']
    }

    get required (): boolean {
      return this.config.settings['required']['value']
    }

    mounted () {
      new Flatpickr(this.flatpickr, {
        enableTime: false,
        defaultDate: this.model,
        onChange: (selectedDates: Date[], dateStr: string) => {
          this.model = dateStr
        }
      })
    }
  }
</script>
