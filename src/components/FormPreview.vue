<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-form>
                    <draggable v-model="controls" :options="dragOptions" v-bind="{xs3: true}" @end="onDragEnd">
                        <transition-group name="list-complete">
                            <dynamic-control v-for="control in controls" :key="control.uuid" :control="control" class="list-complete-item"></dynamic-control>
                        </transition-group>
                    </draggable>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import uuidv4 from 'uuid'
  import { DynamicControlConfigInterface } from '@/types/controls'

  @Component({
    components: {
      'draggable': () => import('vuedraggable/dist/vuedraggable.js'),
      'dynamic-control': () => import('@/components/controls/DynamicControl.vue')
    }
  })
  export default class FormPreview extends Vue {
    controls: DynamicControlConfigInterface[] = []

    dragOptions: Object = {
      handle: '.btn__handle'
    }

    created (): void {
      this.$root.$on('field:add', (field: string) => {
        this.$set(this.controls, this.controls.length, {
          field,
          uuid: uuidv4()
        })
      })
      this.$root.$on('field:remove', ({index, uuid}: { index: number, uuid: string }) => {
        this.controls.splice(index, 1)
        this.$store.dispatch('FormModule/removeField', uuid)
          .catch(error => {
            // console.error(error)
            return error
          })
      })
      this.$root.$on('form:clear', () => {
        this.controls.splice(0, this.controls.length)
      })
      this.$store.dispatch('FormModule/create')
        .catch(error => {
          // console.error(error)
          return error
        })
    }

    onDragEnd ({newIndex, oldIndex}: { newIndex: number, oldIndex: number }): void {
      this.$emit('reorder', {newIndex, oldIndex})
      // console.log(newIndex)
      // console.log(oldIndex)
    }
  }
</script>
