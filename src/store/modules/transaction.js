import { txList, txOver, deleteTx, getchannel, postchannel, deletechannel } from '@/api/transaction';
const transaction = {
  state: {
    txList: {},
    overList: {},
    channelList: {}
  },
  mutations: {
    SET_TX_LIST: (state, payload) => {
      state.txList = payload
    },
    SET_OVER_LIST: (state, payload) => {
      state.overList = payload
    },
    SET_CHANNEL_LIST: (state, payload) => {
      state.channelList = payload
    },
  },
  actions: {
    getTxList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        txList(payload).then((res) => {
          commit('SET_TX_LIST', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getChannelList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        getchannel(payload).then((res) => {
          commit('SET_CHANNEL_LIST', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    postChannelList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        postchannel(payload).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteChannelList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        deletechannel(payload).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getOverList({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        txOver(payload).then((res) => {
          commit('SET_OVER_LIST', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    deletePending({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        deleteTx(payload).then((res) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default transaction;
