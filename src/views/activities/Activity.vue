
<template>
    <form @submit.prevent="submitActivity">
        <BaseInput label="Hvordan har du det?"
                   name="title"
                   :baseValue="activity.title"
                   :errorLabel="errorLabels[0]"
                   @input-changed="getInput"
                   placeholderText="Klarede opvasken 💪"/>
                   
        <EmojiInput :mood="activity.mood"
                    @mood-change="getInput" />

        <BaseInput label="Beskrivelse"
                   name="description"
                   :baseValue="activity.description"
                   inputType="textarea"
                   :errorLabel="errorLabels[1]"
                   @input-changed="getInput"
                   placeholderText="Kunne ikke overskue at vaske op i hele sidste uge...."/>

        <green-button>Gem</green-button>
    </form>
</template>

<script>
import GreenButton from '../../components/UI/GreenButton.vue';
import BaseInput from '../../components/UI/BaseInput.vue';
import EmojiInput from '../../components/UI/EmojiInput.vue';

export default {
    components: {
        GreenButton,
        BaseInput,
        EmojiInput,
    },
    inject: ["logInUser"],
    data() {
        return {
            errorLabels: ["", "", ""],
            user: null,
            activity: {
                title: "",
                description: "",
                mood: "ok",
            }
        };
    },
    methods: {
        submitActivity() {
            
            let i = 0;
            let valid = true;

            for (const input in this.activity) {
                    
                if (!this.activity[input]) {
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

            this.activity.time = Date.now();
            
            if (this.activity.id) {
                const index = this.user.activities.findIndex(a => a.id === this.activity.id)
                this.user.activities[index] = this.activity;
            } else {
                if (!this.user.activities.length) {
                    
                    this.activity.id = 1;
                    
                } else {
                    const highest = this.user.activities.reduce((acc, value) => {
                        return acc < value ? value : acc;
                    });
                    
                    this.activity.id = highest.id + 1;
                }

                this.user.activities.push(this.activity);
            }
            
            fetch("https://mood-app-storage-default-rtdb.firebaseio.com/users/" + this.user.id + ".json", {
                            method: "PATCH",
                            header: {
                                "Content-Type": "Application/json",
                            },
                            body: JSON.stringify({activities: this.user.activities}),
                        });

            localStorage.setItem("user", JSON.stringify(this.user));
            this.logInUser(this.user);    
            this.$router.push("/home");

        },
        getInput(value, name) {
            this.activity[name] = value;
        },
    },
    beforeRouteEnter(_, _2, next) {
        const user = localStorage.getItem("user");

        next(!!user);
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("user"));

        if (this.$route.query.activityId) {
            this.activity = this.user.activities.Find(a => a.id === this.$route.query.activityId);
        }
    }
}
</script>
