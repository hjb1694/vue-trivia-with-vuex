<template>
    <div id="question-box">
        <p id="question">{{triviaItem.question}}</p>
        <ul id="answer-list">
            <li 
            v-for="(answer, index) of triviaItem.possibleAnswers" 
            :key="answer" 
            @click="selectQuestion(index)"
            :class="[
            isSubmitted && index == triviaItem.correctAnswer ? 'correctAnswer' : '',
            isSelected && selectedAnswer == index ? 'selectedAnswer' : ''
            ]">{{answer}}</li>
        </ul>
        <div id="btn-group">
            <button id="subbut" @click="submitQuestion()" :disabled="isSubmitted">Submit</button>
            <button id="nextbutton" @click="nextQuestion()" :disabled="!isSubmitted">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    name : 'questionBox', 
    data(){
        return {
            isSelected : false, 
            isSubmitted : false,
            selectedAnswer : null
        }
    },
    computed : {
        triviaItem() {
            return this.$store.getters.getItem;
        }
    }, 
    methods : {
        selectQuestion(index){
            if(!this.isSubmitted){

                this.isSelected = true;
                this.selectedAnswer = index;

            }

        }, 
        submitQuestion(){
            if(!this.isSubmitted){

                this.isSubmitted = true;

                if(this.selectedAnswer == this.triviaItem.correctAnswer){
                    this.$store.commit('addPoint');
                }


            }
        }, 
        nextQuestion(){
            this.isSelected = false;
            this.isSubmitted = false;
            this.selectedAnswer = null;

            this.$store.commit('goToNextItem');

        }
    }
}
</script>

<style scoped>
    #question-box{
        max-width:40rem;
        margin:0 auto;
        background:#fff;
        padding:2rem;
        box-shadow:0 0 1rem rgba(0,0,0,.24);
        border-radius:1rem;
    }

    #question{
        font-size:1.6rem;
    }

    #answer-list{
        border:1px solid #ccc;
        list-style:none;
        margin-top:1rem;
        border-radius:1rem;
    }

    #answer-list > li{
        padding:1rem;
        text-align:center;
        font-size:2rem;
        cursor:pointer;
    }

    #answer-list > li:not(:last-child){
        border-bottom:1px solid #ccc;
    }

    .selectedAnswer{
        background-color:aliceblue;
    }

    .correctAnswer{
        background:lightgreen;
    }

    #btn-group{
        margin:1rem 0;
    }

    #subbut, #nextbutton{
        padding:.8rem 1rem;
        border:0;
        background:#42aaf5;
        color:#fff;
        font-family:inherit;
        cursor:pointer;
    }

    #nextbutton{
        margin-left:1rem;
    }


</style>