/**
 * @date Jan 07, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */
const axios=require('axios');
const GET_SENTENCE = "GET_SENTENCE";
export const FIRST_SENTENCE_INDEX = 1
export const MAX_CHARACTERS = 15;
export const MAX_WORDS = 5;
export const MIN_WORDS = 2;
export const MAX_SENTENCE_INDEX = 10;
export const MAX_CHARACTER = 1
// ACTION CREATORS
export const getSentence = (fetchSentence) => {
    return{
        type: GET_SENTENCE,
        fetchSentence
    }
}
const sentence={
    getSentence1: axios.get(`https://api.hatchways.io/assessment/sentences/${FIRST_SENTENCE_INDEX}`).then((response)=>(response.data))
}
// REDUCER
const reducerSentence = (state = sentence, action) =>{
    switch(action.type){
        case GET_SENTENCE:
            return action.fetchSentence;
        default:
            return state;
    }
}
export default reducerSentence;
