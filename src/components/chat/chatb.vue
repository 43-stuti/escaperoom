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
        margin-bottom:20px;
    }
    .bubbleC {
        color: blanchedalmond;
    }
    .bubble {
        display: inline-block;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
</style>