<template>
    <v-app>
        <v-content transition="scroll-y-transition">
            <router-view></router-view>
            <AppNavigation></AppNavigation>
            <v-card class="chatcard"
            >
                <Chat></Chat>
            </v-card>
        </v-content>
    </v-app>
</template>

<script>
import AppNavigation from './components/AppNavigation'
import Chat from './components/chat/Chat.vue'
import io from 'socket.io-client';
export default {
    name: 'App',
    data() {
        return {
            sockObj:{
                socket:null,
                clients:{},
                id:null,
                dialog:true
            }
        }
    },
    components : {
        'AppNavigation' : AppNavigation,
        'Chat':Chat
    },
    mounted() {
        //this.$store.dispatch('connect');
        this.sockObj.socket = io('https://immense-citadel-10641.herokuapp.com',{
            "rejectUnauthorized" : false
        })
        this.sockObj.socket.on('gameStateUpdate',(data) => {
            this.$store.commit('gameStateUpdate',data)
        })
        this.sockObj.socket.on("introduction", (_id, _clientNum, _ids, _iceServers) => {
            // keep local copy of ice servers:
            console.log("Received ICE server credentials from server.");
            this.sockObj.iceServerList = _iceServers;

            // keep a local copy of my ID:
            console.log("My socket ID is: " + _id);
            this.sockObj.id = _id;
            //this.sockObj.clients[_id] = {};
            //connect : dispatch to store
            this.$store.commit('connect',this.sockObj)

            // for each existing user, add them as a client and add tracks to their peer connection
            for (let i = 0; i < _ids.length; i++) {
                if (_ids[i] != this.sockObj.id) {
                    this.sockObj.clients[_ids[i]] = {};
                    //addclient : dispatch to store
                    this.$store.commit('addclient',{
                        socketData:this.sockObj,
                        id:_id
                    })
                }
            }
        });

        // when a new user has entered the server
        this.sockObj.socket.on("newUserConnected", (clientCount, _id, _ids) => {
            console.log(clientCount + " clients connected");
            console.log(_ids);
            let alreadyHasUser = false;
            for (let i = 0; i < Object.keys(this.sockObj.clients).length; i++) {
            if (Object.keys(this.sockObj.clients)[i] == _id) {
                alreadyHasUser = true;
                break;
                }
            }

            if (_id != this.sockObj.id && !alreadyHasUser) {
                console.log("A new user connected with the id: " + _id,this.sockObj.id);
                this.sockObj.clients[_id] = {};
                this.$store.commit('addclient',{
                    socketData:this.sockObj,
                    id:_id
                })
                //addclient : dispatch to store
            }
        });

        this.sockObj.socket.on("userDisconnected", (clientCount, _id, _ids) => {
            // Update the data from the server
                console.log(_ids);
                if (_id != this.sockObj.id) {
                console.log("A user disconnected with the id: " + _id);
                delete this.sockObj.clients[_id];
                //removeclient : dispatch to store
            }
        });

    }
}
</script>

<style>
   .chatcard {
       position: fixed;
        top: 75vh;
  z-index: 1;
  /* centering */
  right: -60px !important;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);  
   }
    #chat {
        height: 100%;
        width: 100%;
        z-index:10;
    }
</style>