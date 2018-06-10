<template>
    <v-text-field data-input
                  type="text"
                  ref="flatpickr"
                  v-model="model"
                  v-validate="rules"
                  :error-messages="errors.collect(name)"
                  :data-vv-name="name"
                  :data-vv-as="as"
                  :name="name"
                  :label="label"
                  :required="required"
                  prepend-icon="event"
                  @change="$emit('change', $event)"
                  @update="$emit('update', $event)">
    </v-text-field>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Flatpickr from 'flatpickr'
  import { FlatpickrFn } from 'flatpickr/dist/types/instance'
  import BaseControl from '@/components/controls/base'

  @Component
  export default class DateField extends BaseControl {
    fp: FlatpickrFn

    model: string = (new Date()).toISOString().substring(0, 10)

    mounted () {
      let component: Vue = this.$refs.flatpickr as Vue
      
      this.fp = new Flatpickr(component.$el, {
        enableTime: false,
        defaultDate: this.model,
        onChange: (selectedDates, dateStr: string) => {
          this.model = dateStr
        }
      })
    }
  }
</script>

<style type="text/scss" lang="scss">
    @import "~flatpickr/dist/flatpickr.min";
    @import "~flatpickr/dist/themes/airbnb.css";
</style>
