import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _ from 'lodash';


Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        allItems : [], 
        currentItem : 0, 
        questionsLoaded : false,
        itemsLoadedError : false, 
        score : 0
    },
    getters : {
        getItem(state){
            return state.allItems[state.currentItem];
        }, 
        getScore(state){
            return state.score;
        }
    }, 
    mutations : {
        setItems(state, payload) {
            state.allItems = payload;
        }, 
        goToNextItem(state){
            state.currentItem += 1;
        }, 
        addPoint(state){
            state.score += 1;
        }
    }, 
    actions : {
        getTriviaItems({commit, state}){
            axios.get('https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple')
            .then(resp => {
                state.questionsLoaded = true;
                const { results } = resp.data;
                const editedResults = results.map(result => {
                    const correctAnswer = result.correct_answer;
                    const shuffledAnswers = _.shuffle([...result.incorrect_answers, correctAnswer]);
                    const indexCorrect = shuffledAnswers.indexOf(correctAnswer);

                    return {
                        question : result.question, 
                        possibleAnswers : shuffledAnswers, 
                        correctAnswer : indexCorrect
                    }
                });

                commit('setItems', editedResults);

            })
            .catch(() => {
                state.itemsLoadedError = true;
            })
        }
    }
});