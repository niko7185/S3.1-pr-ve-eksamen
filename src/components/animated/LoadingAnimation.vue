
<template>
    <teleport to="body">
        <div class="backdrop" v-if="enable">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        </div>
    </teleport>
</template>

<script>
export default {
    props: {
        enable: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style scoped>
    .backdrop {
        background-color: rgba(0, 0, 0, 0.6);
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
        text-align: center;
    }

    svg {
        max-width: 25%;
        margin-top: 20vh;
        color: white;
        animation: loading 1s linear 0s infinite normal none;
    }

    @keyframes loading {
        0% {transform: rotate(0deg);}
        100% {transform: rotate(-360deg);}
    }

</style>
