<template>
    <div>
        <div class="container">
            <div class="bubbleC"> 
                <div class="bubble">
                        <div>
                            <h6 v-if ="!this.message.self">{{message.user}}</h6>
                        </div>
                        <div>
                            {{message.message}}
                        </div>
                </div>
            </div>
        </div>
    </div>
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
    .container {
        margin-bottom:2px;
    }
    .bubbleC {
        color: rgb(42, 139, 23);;
    }
    .bubble {
        display: inline-block;
    }
</style>