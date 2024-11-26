<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMediator } from 'src/stores/mediator'
import { AppMediator } from 'src/modules/handlerApp/Mediator'
import { MenuHandler, ButtonHandler, FilterHandler, InitialSetup, StaticRouteHandler } from 'src/modules/handlerApp/Components'
import { Director } from 'src/modules/handlerApp/Director'

export default defineComponent({
  name: 'App',
  setup() {
    const mediator = useMediator()
    /* Instanciar los Componentes */
    const menuHandler = new MenuHandler()
    const buttonHandler = new ButtonHandler()
    const filterHandler = new FilterHandler()
    const initialSetup = new InitialSetup()
    const staticRouteHandler = new StaticRouteHandler()
    /* Instanciar el Director */
    const director = new Director()
    /* Instanciar el Mediador */
    const appMediator = new AppMediator()
    /* Setear los componentes y director en el mediador */
    appMediator.setComponent(menuHandler)
    appMediator.setComponent(buttonHandler)
    appMediator.setComponent(filterHandler)
    appMediator.setComponent(initialSetup)
    appMediator.setComponent(staticRouteHandler)
    appMediator.setDirector(director)

    /* Setear en Store el mediador y los componentes */
    mediator.menuHandler = menuHandler
    mediator.buttonHandler = buttonHandler
    mediator.filterHandler = filterHandler
    mediator.initialSetup = initialSetup
    mediator.staticRouteHandler = staticRouteHandler
    mediator.mediator = appMediator
    return {
    }
  }
});
</script>
