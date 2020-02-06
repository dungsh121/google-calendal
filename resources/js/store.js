export default{
    state:{
        checklogin: false,
        events: [],
    },
    getters:{
        events(state){
            return state.events;
        },
        checklogin(state){
            return state.checklogin;
        },
        //lists: state => state.list_event
    },
    mutations: {
        ADD_EVENT: (state, event) =>{
            state.events = event
        },
        setchecklogin(state) {
            state.checklogin = !state.checklogin
        }

    }

}
