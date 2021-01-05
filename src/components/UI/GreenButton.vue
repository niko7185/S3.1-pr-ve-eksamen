
<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
    button {
        background-color:#175739;
        color: white;
        padding: 1em;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        position: relative;
        box-shadow: -3px 4px 0 1px #0a2519;
        left: 3px;
        bottom: 4px;
        transition: background-color 0.4s, box-shadow 0.2s, left 0.2s, bottom 0.2s;
    }

    button:hover {
        background-color: #217e53;
    }

    button:active {
        box-shadow: 0 0 0 0 #0a2519;
        left: 0px;
        bottom: 0px;
        border: none;
    }

</style>
