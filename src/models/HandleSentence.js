/**
 * @date Jan 07, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */
import {
    FIRST_SENTENCE_INDEX,
    MAX_CHARACTERS,
    MAX_WORDS,
    MIN_WORDS
} from '../store/sentence';

/**============= PART 01 =========== */
//get sentence from reducer (store). And then store the sentence in the state
export const handleSentence  = async (dataSentence, stateSentence)=>{
    try{
        var self=stateSentence;
        if(self.state.number===FIRST_SENTENCE_INDEX){
            await dataSentence.getSentence1.then((res)=>{    
                self.setState({
                    sen:res.data.sentence,
                    number: self.state.number   
                })
                const sentence = self.state;
                const lastWord = sentence.sen?.split(" ").length-1;
                sentence.sen?.split(" ").forEach((word,count) => {
                    const letters = word?.split("");
                    const lettersWithSpace = (word+" ")?.split("");
                    const arrayWords = sentence.arrWords;
                    const stateWords = sentence.statusWords;
                    const statusWord = [];
                    count===(lastWord) ? arrayWords?.push(letters) : arrayWords?.push(lettersWithSpace);
                    count===(lastWord) ? letters.forEach(e => statusWord.push(false)) : lettersWithSpace.forEach(e => statusWord.push(false));
                    stateWords?.push(statusWord);
                });
            })
            return self.state
        }
        else{
            if (typeof(dataSentence.data?.sentence) != "undefined"){
                self.state.sen = dataSentence.data?.sentence
                self.state.arrWords = []
                self.state.statusWords=[]
                self.state.number=stateSentence.state.number
                const sentence = self.state;
                const lastWord = sentence.sen?.split(" ").length-1;
                sentence.sen?.split(" ").forEach((word,count) => {
                    const letters = word?.split("");
                    const lettersWithSpace = (word+" ")?.split("");
                    const arrayWords = sentence.arrWords;
                    const stateWords = sentence.statusWords;
                    const statusWord = [];
                    count===(lastWord) ? arrayWords.push(letters) : arrayWords.push(lettersWithSpace);
                    count===(lastWord) ? letters.forEach(e => statusWord.push(false)) : lettersWithSpace.forEach(e => statusWord.push(false));
                    stateWords.push(statusWord);
                });
                return self.state
            }
        }
    } catch(err){
        console.error(err);
    }
}

/**============= PART 02 =========== */
//handling Scramble for an array, random the letter
//input: an original array
//output: a randomed array
const randomArrayShuffle = (array) =>{
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//handling Scramble for this sentence
//input: this sentence
//output: a randomed array of this sentence 
//  (retain the position of the first and last letter, and the middle letters will be scrambled.)
export const arrScramble = (sentence)=>{
    if(sentence===null) return "";
    const arrayWords = sentence.split(' ');
    const scrambleWords = arrayWords.map(word => {
        if(word.length<=MIN_WORDS) return word  //If the word is only one or two characters, it remains unchanged
        else{
            const arrayLetters = word.split('');
            let scrambleLetters = arrayLetters.map((letter, index) =>{
                //At most, each word will have 15 characters
                var maxLengthOfWord = arrayLetters.length>MAX_CHARACTERS ? MAX_CHARACTERS : arrayLetters.length;
                if(index===0 || index===(maxLengthOfWord-1)) return "";
                else return letter;
            })
            scrambleLetters = randomArrayShuffle(scrambleLetters)
            let newLetter = arrayLetters[0];
            scrambleLetters.forEach(element =>  newLetter+=element );
            return newLetter+arrayLetters[arrayLetters.length-1];
        }
    })
    if (scrambleWords.length>0)
        return scrambleWords;
}
//handling Scramble for this sentence
//input: this sentence
//output: a sentence (with the positions of the first and last letter are remained unchanged , and the middle letters will be scrambled)
export const scramble = (sentence)=>{
    let newWords = "";
    if(arrScramble(sentence).length>0)
        arrScramble(sentence).forEach((element,index) => {
            if(index<MAX_WORDS)        //At most, each sentence will have 5 words
                newWords+=element+" ";  //There will never be more than one space in between each word
        });
    newWords = newWords.trim();
    return newWords;
}

/**============= PART 03 =========== */
export const lengthWord = (word) => (word.split('').length)
const lastIndexOfWord = (word) => (lengthWord(word)-1)
const lengthWordIncludesSpace = (word) => (lengthWord(word)+1)
const lengthLetterIncludesSpace = (word) => (Math.floor(12/lengthWordIncludesSpace(word)));
const lengthFirstLetterWithSpace = (word) => (Math.floor((12-(lastIndexOfWord(word)*lengthLetterIncludesSpace(word)))/2))
const lengthLetterWithoutSpace =  (word) => (Math.floor(12/lengthWord(word)));
const lengthFirstLetterNoSpace =  (word) => (Math.floor(12-(lastIndexOfWord(word)*lengthLetterWithoutSpace(word))))
export const lengthFirstLetter = (condition, word) => (condition ? lengthFirstLetterWithSpace(word) : lengthFirstLetterNoSpace(word))
export const lengthLetter = (condition, word) => (condition ? lengthLetterIncludesSpace(word) : lengthLetterWithoutSpace(word))
export const lengthOfSpace = (word) => (12-lengthFirstLetterWithSpace(word)-lengthLetterIncludesSpace(word)*lastIndexOfWord(word))

export const gameCanvas= (sentence, number)=>{
    return (
        <div className="row mt-1 pt-1 bg-dark-light">
            <div className="col-sm-12 mt-4 pt-4 ml-3 pl-3 mr-5 pr-5 bg-white game-canvas-top">
                <h1 id="scrambled-word " className="headerGame">{scramble(sentence)}</h1>
            </div>
            <div className="col-sm-12 ml-3 pl-3 mr-5 pr-5 bg-white">
                <h4 className="mt-3 headerGame text-dark">Guess the sentence! Start typing</h4>
            </div>
            <div className="col-sm-12 ml-3 pl-3 mr-5 pr-5 bg-white">
                <h4 className="mt-2 pt-1 headerGame text-dark">The yellow blocks are meant for spaces</h4>
            </div>
            <div className="col-sm-12 ml-3 pl-3 mr-5 pr-5 bg-white">
                <h2 className="headerGame text-dark mt-2 pt-1">Score: {number===1 ? number-1 : number-2}</h2>
            </div>
        </div>
    );
}


/**============= PART 04 =========== */
export let handleState={
    sen:null,
    arrWords: [],
    statusWords: [],
    number: FIRST_SENTENCE_INDEX,
    inputValue: ""
}
//handling for typing in each input
export const isChange=(event, countWord, countLetter, letter, isChangeStatus)=>{
    handleState = isChangeStatus;
    const { maxLength, value } = event.target;
    const lastRowLength = handleState.statusWords.length-1;
    const lastColumnLength = handleState.statusWords[handleState.statusWords.length-1].length-1
    // Check if they hit the max character length
    if (value.length >= maxLength) {
        // Check if it's not the last input field
        if (parseInt(countWord, 10) < lastRowLength || parseInt(countLetter, 10) < lastColumnLength) {
            // Get the next input field
            const nextSibling = letter==null ?
                document.querySelector(`input[name=input${parseInt(countWord, 10)+1}0]`)
                : document.querySelector(`input[name=input${parseInt(countWord, 10)}${parseInt(countLetter, 10) + 1}]`);
            // If found, focus the next field
            if (nextSibling !== null && ((letter!=null && value.toUpperCase()===letter.toUpperCase()) || (letter==null && value===" ")))
                nextSibling.focus();
        }

        const arrWs = []
        handleState.statusWords.forEach((statusWord,indexWord) => {
            if (countWord===indexWord) {
                const arrLs = []
                statusWord.forEach((statusLetter, indexLetter) => 
                    ((indexLetter===countLetter)
                    ? (letter===null ? arrLs.push(event.target.value===" ") :arrLs.push((letter.toUpperCase()===event.target.value.toUpperCase())) )
                    : arrLs.push(statusLetter)) );
                arrWs.push(arrLs);
            }
            else arrWs.push(statusWord)
        });
        handleState.statusWords=arrWs;
        
        if(parseInt(countWord, 10) === lastRowLength && parseInt(countLetter, 10) === lastColumnLength){
            const nextSibling = document.querySelector(`button[name="btnNext"]`);
            if (nextSibling !== null && value===letter) {
                nextSibling.focus();
            }
        }
    }
}

