<template>
    <div class="loader-container">
        <img src="@/assets/loading.svg" width="125px" height="125px" class="spinner">

        <img src="@/assets/2.png" width="80px" height="80px" class="abs-center blink">
    </div>
</template>

<style lang="css">
        .loader-container {
            width: 110px;
            height: 110px;
            position: relative;
            border-radius: 50%;
        }

        @keyframes blink {
            from {opacity: .4;}
            to {opacity: 1;}
        }

        .abs-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(calc(-50% + 8px), calc(-50% + 8px));
        }

        .blink {
            animation: blink 1.5s ease-in-out infinite;
        }

        .spinner {
            padding: 5px;
        }
</style>