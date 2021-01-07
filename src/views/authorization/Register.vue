
<template>
    <LoadingAnimation :enable="loading" />

    <h2>Opret en ny bruger</h2>
    <form @submit.prevent="submitAccount">
        <BaseInput label="Bruger navn:"
                   name="name"
                   :errorLabel="errorLabels[0]"
                   @input-changed="getInput"
                   placeholderText="John doe..." />
        <BaseInput label="Password:"
                   name="password"
                   :errorLabel="errorLabels[1]"
                   @input-changed="getInput"
                   placeholderText="Pa$$w0rd..."
                   inputType="password" />
        <BaseInput label="Gmail:"
                   name="gmail"
                   :errorLabel="errorLabels[2]"
                   @input-changed="getInput"
                   placeholderText="example@gmail.com..."/>
        
        <green-button>Submit</green-button>
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
                name: "",
                password: "",
                gmail: "",
            },
            errorLabels: [
                "",
                "",
                "",
            ],
            loading: false,
        };
    },
    methods: {
        submitAccount() {

            let valid = true;
            let i = 0;
            
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

            if (!valid) {
                return;
            }

            this.loading = true;

            const newUser = JSON.stringify({
                    userName: this.account.name,
                    password: this.account.password,
                    gmail: this.account.gmail,
                    activities: [],
                });

            fetch("https://mood-app-storage-default-rtdb.firebaseio.com/users.json", {
                method: "POST",
                header: {
                    "Content-Type": "Application/json",
                },
                body: newUser,
            });

            fetch("https://mood-app-storage-default-rtdb.firebaseio.com/users.json").then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else{
                    this.loading = false;
                }
            }).then(data => {

                const users = Object.keys(data);
                const createdUser = data[users[users.length - 1]];
                
                createdUser.id = users[users.length - 1];

                if (!createdUser.activities) {
                    createdUser.activities = [];
                }
                
                //localStorage.setItem("user", JSON.stringify(createdUser));
                
                this.loading = false;
                this.logInUser(createdUser);
                this.$router.push("/home");
            });
            

        },

        getInput(value, name) {
            this.account[name] = value;
        }
    },
    beforeRouteEnter(_, _2, next) {
        const user = localStorage.getItem("user");

        next(!user);
    },
}
</script>
