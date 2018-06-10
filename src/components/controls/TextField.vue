<template>
    <v-flex>
        <v-text-field v-validate="rules"
                      :error-messages="errors.collect(name)"
                      :data-vv-name="name"
                      :data-vv-as="as"
                      :name="name"
                      :label="label"
                      :required="required"
                      v-model="model"
                      prepend-icon="settings"
                      :ref="name"
                      @change="$emit('change', $event)"
                      @update="$emit('update', $event)">
        </v-text-field>
        <settings :menu.sync="menu" :x="x" :y="y"></settings>
    </v-flex>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import BaseControl from '@/components/controls/base'
  import Settings from '@/components/controls/Settings.vue'

  @Component({
    components: {
      Settings
    }
  })
  export default class TextField extends BaseControl {
    model: string | null = null
  }
</script>
