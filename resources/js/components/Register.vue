<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <div class="error" v-if="errors.length">
                            <span v-for="err in errors">
                                {{ err }}
                            </span>
                            <hr>
                        </div>
                        <form @submit.prevent="createUser">
                            <div class="form-group">
                                <input type="text" v-model="user.name" class="form-control" placeholder="Name">
                            </div>
                            <div class="form-group">
                                <input type="email" v-model="user.email" class="form-control" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <input type="password" v-model="user.password" class="form-control"
                                       placeholder="Password">
                            </div>
                            <div class="form-group">
                                <input type="password" v-model="user.password_confir" class="form-control"
                                       placeholder="Password_Confirmation">
                            </div>
                            <div class="form-group">

                                <button class="btn btn-success">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    password_confir: '',
                },
                errors: [],
            }
        },
        methods: {
            createUser() {
                axios.post('/api/auth/signup', {
                    name: this.user.name, email: this.user.email,
                    password: this.user.password, password_confirmation: this.user.password_confir
                })
                    .then(response => {
                        this.$router.push({path:'/login'});
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
