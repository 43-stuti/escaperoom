import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket:{
      socket:null,
      id:null,
      clients:{},
      iceServerList:null,
    },
    clientCount:0,
    lastAddedClient:null,
    gameState:5
  },
  mutations: {
    connect(state,socketObj) {
      state.socket.socket = socketObj.socket;
      state.socket.clients = socketObj.clients;
      state.socket.id = socketObj.id;
      state.socket.iceServerList = socketObj.iceServerList;
      state.clientCount = 1;
    },
    addclient(state,socketObj) {
      state.socket.clients[socketObj.id] = socketObj.socketData.clients[socketObj.id]
      state.clientCount = state.clientCount + 1;
      state.lastAddedClient = socketObj.id;
    },
    gameStateUpdate(state,gameState) {
      state.gameState = gameState;
    }
  },
  actions: {
  },
  modules: {
  }
})
