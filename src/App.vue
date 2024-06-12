<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMediator } from 'src/stores/mediator'
import { AppMediator } from 'src/modules/handlerApp/Mediator'
import { MenuHandler, ButtonHandler } from 'src/modules/handlerApp/Components'
import { Director } from 'src/modules/handlerApp/Director'


export default defineComponent({
  name: 'App',
  setup() {
    const mediator = useMediator()
    /* Instanciar los Componentes */
    const menuHandler = new MenuHandler()
    const buttonHandler = new ButtonHandler()
    /* Instanciar el Director */
    const director = new Director()
    /* Instanciar el Mediador */
    const appMediator = new AppMediator()
    /* Setear los componentes y director en el mediador */
    appMediator.setComponent(menuHandler)
    appMediator.setComponent(buttonHandler)
    appMediator.setDirector(director)

    /* Setear en Store el mediador y los componentes */
    mediator.menuHandler = menuHandler
    mediator.buttonHandler = buttonHandler
    mediator.mediator = appMediator
    return {
    }
  }
});
</script>
