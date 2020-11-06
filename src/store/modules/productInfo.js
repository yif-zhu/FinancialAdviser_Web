// 产品信息模块
export default {
  state: {
    // 产品ID
    trustId: 0,
    ConcernTrust:[],
    productDetail:{}
  },
  mutations: {
    setTrustId(state, id) {
      state.trustId = id;
    },
    setConcernTrust(state, index) {
      state.ConcernTrust = index;
    },
    setProductDetail(state, value) {
      state.productDetail = value
    }
  },
};
