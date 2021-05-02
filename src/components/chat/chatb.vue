<template>
    <v-container>
        <v-row class="bubble">
            <v-col 
            :cols = 11
            :style ="!this.message.gm ? {'backgroundColor':'#cbd4cd','paddingTop':'3px','paddingBottom':'3px','paddingLeft':'5px','paddingRight':'5px','borderRadius':'6px'} : {'backgroundColor':'#58cc72','paddingTop':'3px','paddingBottom':'3px','paddingLeft':'5px','paddingRight':'5px','borderRadius':'6px'}">
                {{message.message}}
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    name:'chatb',
    props:['message'],
    components: {
    }
}
</script>
<style scoped>
    .bubble {
        margin-left: 7px;
        margin-right: 7px;
        margin-top: 7px;
    }
</style>