<template>
    <q-page class="q-pa-md q-gutter-sm">
        <div>
            <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <div>
                    <q-space />
                </div>
            </transition>
            <q-inner-loading :showing="visible">
                <q-spinner-pie color="primary" size="70px" />
            </q-inner-loading>
        </div>
        <q-card class="col-md-12">
            <q-linear-progress :value="10" color="blue" />
            <q-card-section>
                <div class="text-h6 text-center">Encuesta larvaria</div>
            </q-card-section>
            <q-separator inside></q-separator>
            <q-banner class="bg-grey-3">
                <template v-slot:avatar>
                    <q-icon name="warning" color="warning" />
                </template>
                Los campos marcados con (*) son obligatorios
            </q-banner>
            <q-card-section>
                <q-form ref="myForm" @submit.prevent="">
                    <div class="row justify-around">
                        <div class="col-12">
                            <q-input white color="blue" v-model="code" label="Código *" lazy-rules
                                :rules="[val => !!val || 'El campo es obligatorio']" />
                        </div>
                        <div class="col-12">
                            <q-input white color="blue" v-model="description" label="Descripción *" lazy-rules
                                :rules="[val => !!val || 'El campo es obligatorio']" />
                        </div>
                        <div class="col-12">
                            <q-toggle v-model="active" label="Estado" />
                        </div>
                    </div>
                </q-form>
            </q-card-section>
            <div class="row justify-between">
                <q-card-actions align="left" class="bg-white text-teal">
                </q-card-actions>
                <q-card-actions align="right" class="bg-white text-teal">
                    <div>
                        <q-btn round icon="save" @click.prevent="onSubmit" color="primary" />
                        <q-tooltip>Guardar datos</q-tooltip>
                    </div>
                    <div>
                        <q-btn round icon="cancel" to="/" color="negative" />
                        <q-tooltip>Cancelar</q-tooltip>
                    </div>
                </q-card-actions>
            </div>
        </q-card>
    </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
    name: 'EncuestaPage',
    setup() {
        const path = '/hiring/categoriescupss'
        const visible = ref(false)
        const code = ref(null)
        const description = ref(null)
        const active = ref(false)
        const myForm = ref(null)
        const $q = useQuasar()


        return {
            active,
            myForm,
            visible,
            code,
            description,
        }
    }
})
</script>
