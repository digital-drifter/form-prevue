<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-form>
                    <!--<template v-for="(control, index) in controls">-->
                    <dynamic-control v-for="(control, index) in controls" :control="control" :key="`control${index}`"></dynamic-control>
                    <!--<v-text-field v-validate="control.validation.rules"-->
                    <!--:error-messages="errors.collect(control.name)"-->
                    <!--:data-vv-name="control.validation.name"-->
                    <!--:data-vv-as="control.validation.as"-->
                    <!--:name="control.name"-->
                    <!--v-model="control.model"-->
                    <!--:counter="10"-->
                    <!--:label="control.label"-->
                    <!--:required="control.required">-->
                    <!--</v-text-field>-->
                    <!--</template>-->
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import DynamicControl from '@/components/controls/DynamicControl.vue'

  @Component({
    components: {
      DynamicControl
    }
  })
  export default class FormPreview extends Vue {
    @Prop(Array) controls: string[]

    created (): void {
      this.$store.dispatch('FormModule/create')
        .catch(error => {
          console.error(error)
        })
    }
  }
</script>
