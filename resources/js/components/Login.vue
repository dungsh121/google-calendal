<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <div class="form-group">
                            <input type="email" v-model="user.email" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input type="password" v-model="user.password" class="form-control" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <button @click="checkLogin" class="btn btn-success">Login</button>
                            <router-link to="/register"><button class="btn btn-success">Register</button></router-link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },
                errors: [],
            }
        },

        methods: {
            checkLogin() {
                axios.post('/api/auth/login', {email: this.user.email, password: this.user.password})
                    .then(response => {
                        let accessToken = response.data.access_token;
                        localStorage.setItem('token',accessToken);
                        this.$router.push({path:'/'});
                        this.$store.commit("setchecklogin");
                    })
                    .catch(error => {
                         this.errors = error.response.data.errors.name
                    })
            }
        }
    }
</script>

<style scoped>

</style>
