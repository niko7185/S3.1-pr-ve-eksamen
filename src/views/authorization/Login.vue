
<template>
    <LoadingAnimation :enable="loading" />

    <h2>Log in</h2>
    <form @submit.prevent="submitLogin">
        <BaseInput label="Gmail:"
                   name="gmail"
                   :errorLabel="errorLabels[0]"
                   @input-changed="getInput"
                   placeholderText="example@gmail.com..."/>
        <BaseInput label="Password:"
                   name="password"
                   :errorLabel="errorLabels[1]"
                   @input-changed="getInput"
                   placeholderText="Pa$$w0rd..."
                   inputType="password" />
        
        <green-button>Log in</green-button>
    </form>
</template>

<script>
import BaseInput from '../../components/UI/BaseInput.vue';
import GreenButton from '../../components/UI/GreenButton.vue';
import LoadingAnimation from '../../components/animated/LoadingAnimation.vue';

export default {
    components: {
        BaseInput,
        GreenButton,
        LoadingAnimation,
    },
    inject: ["logInUser"],
    data() {
        return {
            account: {
                gmail: "",
                password: "",
            },
            errorLabels: [
                "",
                "",
            ],
            loading: false,
        };
    },
    methods: {
        submitLogin() {

            let valid = true;
            this.loading = true;

            fetch("https://mood-app-storage-default-rtdb.firebaseio.com/users.json")
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        else{
                            this.loading = false;
                        }
                    }).then(data => {

                        const users = [];

                        for (const id in data) {
                            const userActivities = !data[id].activities ? [] : data[id].activities;
                            users.push({
                                id,
                                name: data[id].userName,
                                password: data[id].password,
                                gmail: data[id].gmail,
                                activities: userActivities,
                            });
                        }

                        let i = 0;
                        let user = {};

                        for (const input in this.account) {
                                
                            if (!this.account[input]) {
                                this.errorLabels[i] = "Input må ikke være tomt. Udfyld dette felt";
                                valid = false;
                            }
                            else {
                                this.errorLabels[i] = "";
                            }

                            i++;
                        }

                        if (valid) {

                            valid = users.some(u => {

                                let correct = true;
                                
                                if (u.gmail !== this.account.gmail) {
                                    this.errorLabels[0] = "Gmail er forkert";
                                    correct = false;
                                } 
                                else{
                                    this.errorLabels[0] = "";
                                }

                                if (u.password !== this.account.password) {
                                    this.errorLabels[1] = "Password er forkert";
                                    correct = false;
                                }  
                                else{
                                    this.errorLabels[1] = "";
                                }

                                if(correct) {
                                    user = u;
                                }
                                return correct;
                            });
                        }
                        this.loading = false;

                        if (!valid) {
                            return;
                        }

                        this.logInUser(user);

                        this.$router.push("/home");

                    });
            
            

        },
        getInput(value, name) {
            this.account[name] = value;
        }
    }
}
</script>
