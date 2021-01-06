
<template>
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

export default {
    components: {
        BaseInput,
        GreenButton,
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
            
            localStorage.setItem("user", JSON.stringify(newUser));
            this.logInUser(newUser);
            this.$router.push("/home");

        },
        getInput(value, name) {
            this.account[name] = value;
        }
    }
}
</script>
