<template>
  <span>
    <v-navigation-drawer 
      app 
      v-model="drawer"
      disable-resize-watcher
    >
            <v-list
            dense
            nav
          >
            <v-list-item
              v-for="routes in links"
              :key="routes.title"
              :to="`${routes.page}`"
            >
    
              <v-list-item-content>
                <v-list-item-title>{{routes.text}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar
      flat
      absolute
      collapse-on-scroll
      color="#FFFFFF"
    >
        
        <v-container>
          <v-row justify = "end" align="center">
              <v-toolbar-side-icon >
                <router-link to="/">
                </router-link>
              </v-toolbar-side-icon>
              <v-toolbar-title class="subtitle-2 font-weight-regular green--text text--darken-2 hidden-sm-and-down mt-2">
                Sal's logo
              </v-toolbar-title>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-app-bar-nav-icon class="hidden-md-and-up ml-12" @click="drawer = !drawer">

            </v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <span class = "spacing subtitle-2 font-weight-regular hidden-sm-and-down mt-2" v-for="routes in links" 
              v-bind:key="routes.id">
                <router-link :class="[currentPage === routes.text ? activeClass : '', 'spacing']"
                :to="`${routes.page}`">{{routes.text}}</router-link>
            </span>
          </v-row>
        </v-container>
    </v-app-bar>
  </span>
</template>

<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      appTitle: "Pizza",
      drawer: false,
      links: [
        {
          id: 0,
          text: 'HOME',
          page:'/'
        },
        {
          id: 1,
          text: 'ABOUT',
          page:'/About'
        },
        {
          id: 2,
          text: 'CHURCH',
          page:'/Church'
        },
        {
          id: 3,
          text: 'DIARY',
          page:'/Diary'
        }
      ],
      activeClass : 'font-weight-bold grey--text text--darken-3'
    };
  },
  computed: {
    currentPage() {
      return this.$route.name;
    }
  }
};
</script>

<style scoped>
  a {
    color: white;
    text-decoration: none;
  }
  .spacing { 
      Margin-left: 30px; 
      color: #757575;
  }
</style>
