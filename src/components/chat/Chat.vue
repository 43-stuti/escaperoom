<template>
  <v-card class=" main">
      <div class="chatscreen">
           <div>
                <div ref="messageView" class="chats">
                    <div class="messages" v-for="(msg, index) in messages" :key="index">
                        <div>
                            <chatb :message="msg"></chatb>
                        </div>
                    </div>
                </div>
            </div>
            <div class="separatorChat"></div>
            <div class="message">
                <v-form v-on:submit.prevent="sendMessage">
                    <v-text-field
                        v-model="message"
                        ></v-text-field>
                </v-form>
            </div>
        </div>
  </v-card>
</template>

<script>
import chatb from './chatb.vue'
export default {
    data() {
        return {
            user: '',
            message: '',
            messages: [],
            onlineUsers: [],
            labelState: 0,
            showchat:true
        }
    },
    name:'Chat',
    components: {
        chatb
    },
    props:['character','name','topic'],
    computed: {
        characterName() {
            return 'lala'//get from socket
        },
        socket() {
            return this.$store.state.socket.socket;
        }, 
    },
    watch: {
        messages: function() {
            this.$refs.messageView.scrollTop = this.$refs.messageView.scrollHeight - this.$refs.messageView.clientHeight;
        },
        onlineUsers: function() {
            console.log(this.onlineUsers.length)
        },
        socket() {
            this.$store.state.socket.socket.on('new_message',(data) => {
                this.messages.push(data);
            })
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();
            let msgObj = {
                character: this.characterName,
                user: this.name,
                message: this.message
            }
            this.$store.state.socket.socket.emit('send_message', msgObj);
            //this.messages = [...this.messages, msgObj];
            this.message = '';
            this.labelState = 1;
        },
        minimise(e) {
            console.log(e);
            this.showchat = !this.showchat;
        }
    }
}
</script>

<style scoped>
    @font-face {
        font-family: 'Roboto Mono';
        src: url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100&display=swap');
        font-weight: thin;
        font-style: thin;
    }
    @font-face {
        font-family: 'montserrat';
        src: url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
        font-weight: normal;
        font-style: normal;
    }
    .top {
        height: 20px;
        background-color: rgb(43, 43, 43);
    }
    .chatscreen {
        font-family: "montserrat";
        font-weight: 400;
        font-size: 14px;
        display: inline-block;
        width: 100%;
        height: 100%;
        color: rgb(32, 32, 32);
        background-color: rgb(231, 231, 231);
        vertical-align: top;
        overflow: hidden;
    }
    .heading {
        height: 10%;
    }
    .headingText {
        text-align: center;
         
    }
    .separatorChat {
        height: 0.9px;
        width: 100%;
        background-color: rgb(170, 169, 169);
        margin-bottom: 5px;
    }
    .chats {
        margin-top: 20px;
        margin-left: 10px;
        height: 40vh;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }
    .chats::-webkit-scrollbar {
        display: none;
    }
    .message {
        padding-left: 30px;
        padding-right: 30px;
    }
    .displayprompt {
        font-size: 14px;
        font-weight: 100;
    }
    .heading {
    }
    #custom {
        border: none;
        background: transparent;
        border:0.1px solid;
        border-radius: '100px';
    }
    .separator {
        height: 5px;
        display: block;
        margin-bottom: 40px;
    }
</style>