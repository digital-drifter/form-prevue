<template>
    <v-flex>
        <v-text-field data-input
                      type="text"
                      :ref="name"
                      v-model="model"
                      v-validate="rules"
                      :error-messages="errors.collect(name)"
                      :data-vv-name="name"
                      :data-vv-as="as"
                      :name="name"
                      :label="label"
                      :required="required"
                      prepend-icon="settings"
                      @change="$emit('change', $event)"
                      @update="$emit('update', $event)">
        </v-text-field>
        <settings :menu.sync="menu" :x="x" :y="y"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
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

    get flatpickr (): Vue {
      return this.$refs[this.name]['$el']
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

<style type="text/scss" lang="scss">

</style>
