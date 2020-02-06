<template>
    <nav class="navbar navbar-light bg-color border justify-content-between">
        <router-link to="/"><a class="navbar-brand">Calendar</a></router-link>
        <div class="form-inline">
                <button v-if="checklogin" @click="checkLogout"class="btn btn-outline-success">Logout</button>
            <router-link to="/login">
                <button v-if="!checklogin" class="btn btn-outline-success">Login</button>
            </router-link>
        </div>
    </nav>
</template>

<script>
    import { mapGetters} from 'vuex'
    export default {
        name: "Header",

        computed: {
            ...mapGetters(["checklogin"])
        },
        methods: {

            checkLogout(){
                window.token = localStorage.getItem('token');
                axios.get("/api/auth/logout", {headers: {Authorization: "Bearer " + token}})
                    .then(response => {
                        localStorage.removeItem('token');
                        this.$router.push({path: '/login'});
                        this.$store.commit("setchecklogin");
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>
    .navbar {
        margin-bottom: 1em;
    }
</style>
