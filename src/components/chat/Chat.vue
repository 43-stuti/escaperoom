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
                <form @submit.prevent="sendMessage">
                    <div class="gorm-group pb-3">
                        <input type="text" autocomplete="off" v-model="message" class="form-control" id="custom">
                    </div>
                </form>
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
            labelState: 0
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
                console.log('IS THERE ??',data)
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
         chatBubbleStyle(index) {
            let margin = '0px';
            if(this.messages[index-1] && this.messages[index-1].user == this.messages[index].user) {
                margin = '1px'
            } else {
                margin = '10px'
            }
            if(this.messages[index].user == this.characterName)   {
                return {
                    'display': 'block',
                    'position': 'relative',
                    'float':'right',
                    'clear': 'both',
                    'margin-top':margin
                };
            } else {
                return {
                    'display': 'block',
                    'position': 'relative',
                    'float':'left',
                    'clear': 'both',
                    'margin-top':margin
                };
            }
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
    #text {
        color: rgb(42, 139, 23);
    }
    .chatscreen {
        font-family: "Roboto Mono";
        font-weight: 200;
        font-size: 14px;
        display: inline-block;
        width: 100%;
        height: 100%;
        color: rgb(42, 139, 23);
        background-color: black;
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
        background-color: rgb(42, 139, 23);
        margin-bottom: 15px;
    }
    .chats {
        height: 40vh;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }
    .chats::-webkit-scrollbar {
        display: none;
    }
    .message {
        color: rgb(42, 139, 23);
        padding-left: 30px;
        padding-right: 30px;
        height: 5vh;
        vertical-align: end;
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
        color: rgb(42, 139, 23);
        border-color: rgb(42, 139, 23);
    }
    .separator {
        background-color: rgb(42, 139, 23);
        height: 5px;
        display: block;
        margin-bottom: 40px;
    }
</style>