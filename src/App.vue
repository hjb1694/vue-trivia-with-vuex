<template>
  <div id="app">
    <h1 id="logo">Trivia!</h1>
    <template v-if="questionsLoaded">
    <ScorePanel/>
    <QuestionBox/>
    </template>
    <div v-else> 
        Loading...
    </div>
  </div>
</template>

<script>
import QuestionBox from '@/components/QuestionBox.vue';
import ScorePanel from '@/components/ScorePanel.vue';
export default {
  components : {
    QuestionBox, 
    ScorePanel
  },
  created(){
    this.$store.dispatch('getTriviaItems');
  }, 
  computed : {
    questionsLoaded(){
      return this.$store.state.questionsLoaded;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400&display=swap');

*,*::before,*::after{
  margin:0;
  padding:0;
  box-sizing:inherit;
}

html{
  box-sizing:border-box;
  font-size:62.5%;
}

body{
  background:#3b546b;
  font-family: 'Open Sans', sans-serif;
}

#logo{
  font-size:5rem;
  color:#81a6c7;
  letter-spacing:1rem;
  font-weight:300;
  text-align:center;
}


</style>