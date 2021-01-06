
<template>
    <label for="input">{{ label }}</label>
    <p class="error">{{ errorLabel }}</p>
    <base-wrapper>
        <textarea :name="name" :id="name" rows="10" v-if="inputType === 'textarea'" style="width: 100%" 
                    :placeholder="placeholderText" :class="isError" 
                    v-model.trim="value"></textarea>

        <input :type="inputType" :placeholder="placeholderText" 
                :class="isError" :id="name" v-model.trim="value" v-else />
    </base-wrapper>
</template>

<script>
import BaseWrapper from './BaseWrapper.vue'

export default {
    components: {
        BaseWrapper,
    },
    props: {
        label: {
            type: String,
            default: "Input text below"
        },
        name: {
            type: String,
            required: true,
        },
        baseValue: {
            required: false,
        },
        errorLabel: {
            type: String,
            required: false,
        },
        placeholderText: {
            type: String,
            default: "Input text here"
        },
        inputType: {
            type: String,
            default: "text"
        },
    },
    emits: [
        "input-changed",
    ],
    data() {
        return {
            value: null,
        };
    },
    computed: {
        isError() {
            return {
                error: this.errorLabel,
            };
        }
    },
    watch: {
        value(value) {
            this.$emit("input-changed", value, this.name);
        }
    },
    created() {
        if (this.baseValue) {
            this.value = this.baseValue;
        }
    }

}
</script>

<style scoped>

    section {
        padding: 0px 5px;
    }

    input {
        background: none;
        width: 100%;
        border: none;
        padding: 10px 5px;
    }

    textarea {
        background: none;
        border: none;
        resize: vertical;
    }

    label {
        margin-bottom: 0.5rem;
        display: block;
    }

    p.error {
        color: red;
        margin: 0.5em 0;
    }

    input.error {
        box-shadow: 0 0 5px 0 red;
    }

</style>
