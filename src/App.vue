<template>
    <v-app>
        <v-content transition="scroll-y-transition">
            <router-view></router-view>
            <AppNavigation></AppNavigation>
        </v-content>
    </v-app>
</template>

<script>
import AppNavigation from './components/AppNavigation'
export default {
    name: 'App',
    components : {
        'AppNavigation' : AppNavigation
    }
}
</script>

<style>
</style>