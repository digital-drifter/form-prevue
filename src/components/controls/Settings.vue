<template>
    <v-menu :close-on-content-click="false" :position-x="x" :position-y="y" offset-y absolute v-model="menu">
        <v-card>
            <v-card-text>
                <v-text-field name="test" label="Label" v-model="config.label"></v-text-field>
                <v-switch label="Required" v-model="config.required"></v-switch>
                <!--<v-list>-->
                    <!--<v-list-tile>-->
                        <!--<v-list-tile-content>-->
                            <!--<v-text-field name="test" label="Label" v-model="config.label"></v-text-field>-->
                        <!--</v-list-tile-content>-->
                    <!--</v-list-tile>-->
                    <!--<v-list-tile>-->
                        <!--<v-list-tile-content>-->
                            <!--<v-switch label="Required" v-model="config.required"></v-switch>-->
                        <!--</v-list-tile-content>-->
                    <!--</v-list-tile>-->
                <!--</v-list>-->
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="$emit('update:menu', false)">Cancel</v-btn>
                <v-btn color="primary" flat @click="onSaveClicked">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script lang="ts">
  import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
  import { FormControlConfig } from '@/components/controls/FormControlConfig'

  @Component
  export default class Settings extends Vue {
    name: string = 'Settings'

    @Prop() menu: boolean

    @Prop() x: number

    @Prop() y: number

    @Inject('config') config: FormControlConfig

    mounted (): void {
      // console.log(this.config.required)
      // this.options = Object.keys(this.config)
    }

    onSaveClicked (): void {
      this.$emit('update:menu', false)
    }
  }
</script>
