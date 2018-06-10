<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-form>
                    <v-flex v-for="(control, index) in controls" :key="`control${index}`">
                        <dynamic-control :control="control" :key="`control${index}`"></dynamic-control>
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
                    </v-flex>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import DynamicControl from '@/components/controls/DynamicControl.vue'


  @Component({
    components: {DynamicControl}
  })
  export default class FormPreview extends Vue {

    @Prop(Array) controls: Object[]

    // controls: Object[] = [
    //   {
    //     type: 'text',
    //     name: 'first_name',
    //     label: 'First Name',
    //     required: true,
    //     model: null,
    //     validation: {
    //       rules: 'required',
    //       name: 'first_name',
    //       as: 'First Name'
    //     },
    //     attributes: {
    //       counter: 20
    //     }
    //   },
    //   {
    //     type: 'text',
    //     name: 'last_name',
    //     label: 'Last Name',
    //     required: true,
    //     model: null,
    //     validation: {
    //       rules: 'required',
    //       name: 'last_name',
    //       as: 'Last Name'
    //     },
    //     attributes: {
    //       counter: 20
    //     }
    //   }
    // ]

    created () {
      // this.controls.push({
      //   type: 'text',
      //   name: 'first_name',
      //   label: 'First Name',
      //   required: true,
      //   model: null,
      //   validation: new FieldValidation('first_name', 'first_name', 'required'),
      //   attributes: {
      //     counter: 20
      //   }
      // })
    }
  }
</script>
