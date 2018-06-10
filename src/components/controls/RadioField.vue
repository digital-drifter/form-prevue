<template>
    <span>
        <v-radio-group v-model="model"
                       prepend-icon="settings"
                       :mandatory="false"
                       :ref="name"
                       row>
            <v-radio v-for="(radio, index) in options"
                     :key="index"
                     :label="radio.label"
                     :value="radio.value"
                     @change="$emit('change', $event)"
                     @update="$emit('update', $event)">
            </v-radio>
        </v-radio-group>
        <settings :menu.sync="menu" :x="x" :y="y"></settings>
    </span>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import Settings from '@/components/controls/Settings.vue'

  @Component({
    components: {
      Settings
    }
  })
  export default class RadioField extends BaseControl {
    model: string | number | boolean = null
    options: Object[] = []

    @Prop({default: undefined})
    name: string

    created (): void {
      this.options.push({
        label: 'Option 1',
        value: 'Value 1'
      })
    }
  }
</script>
