<template>
    <div id="score-panel">
        Score: {{ score }} / 10
    </div>
</template>
<script>
export default {
    computed : {
        score(){
            return this.$store.getters.getScore;
        }
    }
}
</script>

<style scoped>
    #score-panel{
        padding:1rem;
        background:#fff;
        max-width:40rem;
        border-radius:1rem;
        margin:2rem auto;
        text-align:center;
        font-size:2rem;
    }
</style>