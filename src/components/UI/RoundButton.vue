<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
    button {
        background-color:#175739;
        color: white;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        justify-content: center;
        align-content: center;
    }

    button:hover {
        background-color: #217e53;
    }

</style>