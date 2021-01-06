
<template>
    <form @submit.prevent="submitActivity">
        <BaseInput label="Hvordan har du det?"
                   name="title"
                   :baseValue="activity.title"
                   :errorLabel="errorLabels[0]"
                   @input-changed="getInput"
                   placeholderText="Klarede opvasken 💪"/>


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

export default {
    components: {
        GreenButton,
        BaseInput,
    },
    data() {
        return {
            errorLabels: ["", ""],
            user: null,
            activity: {
                title: "",
                description: "",
                mood: "",
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
                const index = this.user.activities.FindIndex(a => a.id === this.activity.id)
                this.user.activities[index] = this.activity;
            } else {
                const highestId = this.user.activities.reduce((acc, value) => {
                    return acc < value ? value : acc;
                });
                
                this.activity.id = highestId + 1;

                this.user.activities.push(this.activity);
            }
            
            fetch("https://mood-app-storage-default-rtdb.firebaseio.com/users.json/" + this.user.id, {
                            method: "PATCH",
                            header: {
                                "Content-Type": "Application/json",
                            },
                            body: JSON.stringify({activities: this.user.activities}),
                        });

        },
        getInput(value, name) {
            this.activity[name] = value;
        }
    },
    beforeRouteEnter(_, _2, next) {
        const user = localStorage.getItem("user");

        next(!!user);
    },
    created() {
        this.user = localStorage.getItem("user");

        if (this.$route.params.activityId) {
            this.activity = this.user.activities.Find(a => a.id === this.$route.params.activityId);
        }
    }
}
</script>
