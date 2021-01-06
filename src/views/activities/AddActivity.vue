
<template>
    <form>
        <BaseInput label="Hvordan har du det?"
                   name="title"
                   :errorLabel="errorLabels[0]"
                   @input-changed="getInput"
                   placeholderText="Klarede opvasken 💪"/>

        <BaseInput label="Beskrivelse"
                   name="description"
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
        };
    },
    methods: {
        getInput() {

        }
    },
    beforeRouteEnter(_, _2, next) {
        const user = localStorage.getItem("user");

        next(!!user);
    },
    created() {
        this.user = localStorage.getItem("user");
    }
}
</script>
