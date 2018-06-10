<template>
    <component :is="control" :name="name" :as="as" :rules="rules"></component>
    <!--<component :is="control" v-validate="control.rules"-->
    <!--:error-messages="errors.collect(control.name)"-->
    <!--:data-vv-name="control.name"-->
    <!--:data-vv-as="control.as"-->
    <!--:name="control.name"-->
    <!--v-model="control.model"-->
    <!--:counter="10"-->
    <!--:label="control.label"-->
    <!--:required="control.required">-->
    <!--</component>-->
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import * as Controls from '@/components/controls'
  import uuidv4 from 'uuid'

  @Component({
    components: {
      ...Controls
    },
    name: 'DynamicControl'
  })
  export default class DynamicControl extends Vue {
    @Prop() control: string

    name: string

    as: string

    rules: string

    created () {
      this.rules = 'required'
      this.name = uuidv4()
      this.as = uuidv4()
    }
  }
</script>
