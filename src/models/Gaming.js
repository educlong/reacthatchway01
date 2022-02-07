/**
 * @date Jan 07, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */
import React, { Component } from 'react';
import {
    handleSentence,
    arrScramble, 
    lengthWord,
    lengthFirstLetter,
    lengthLetter,
    lengthOfSpace,
    gameCanvas,
    handleState,
    isChange
} from './HandleSentence';
import { connect } from "react-redux";
import { searchSentences } from '../store/thunkCreators';
import DisplayGame from './DisplayGame';
import {
    FIRST_SENTENCE_INDEX,
    MAX_CHARACTER,
    MAX_SENTENCE_INDEX
} from '../store/sentence';

class Gaming extends Component {
    constructor(props){
        super(props);
        this.state={
            sen:null,
            arrWords: [],
            statusWords: [],
            number: FIRST_SENTENCE_INDEX,
            inputValue: ""
        }
    }
    //handling for each letter in a word
    aLetter = (count, countI, letter) => ( 
        <input type="text"  maxLength={MAX_CHARACTER} name={(count===0 && countI===0) ? "firstLetter" :"input"+count+""+countI} 
            autoFocus={(count===0 && countI===0)}
            value={this.state.statusWords[count][countI] ? letter : this.state.inputValue}
            disabled={this.state.statusWords[count][countI]} tabbable={letter.length ? "true" : "false"}
            className={"btn btn-secondary bg-dark-light btn-lg btn-block btn-height d-inline-block "
                +(this.state.statusWords[count][countI] ? "btn-correct" : "")}
            onChange={(event) => {
                isChange(event,count,countI,letter,this.state)
                this.setState(handleState)
            }}
        ></input>
    )
    //handling for each letter in a word
    aSpace = (word,count)=>(
        <input type="text"   maxLength={MAX_CHARACTER}  name={"input"+count+""+lengthWord(word)} 
            value={this.state.inputValue}
            disabled={this.state.statusWords[count][lengthWord(word)]} tabbable={word.length ? "true" : "false"}
            className={"btn btn-warning btn-lg btn-block h-100 btn-space d-inline-block "
                        +(this.state.statusWords[count][lengthWord(word)] ? "btn-correct" : "")}
            onChange={(event) => {
                isChange(event,count,lengthWord(word),null,this.state)
                this.setState(handleState)
            }}
            ></input>
    )

    listWords = ()=>{
        if(arrScramble(this.state.sen).length>0 && (this.state.arrWords.length===arrScramble(this.state.sen).length && this.state.statusWords.length===arrScramble(this.state.sen).length))
            return(
            <div className="row ml-4 pl-4 mr-4 pr-4 ">{arrScramble(this.state.sen)?.map((word, count)=>{ return(
                <div className="col-sm-12 mt-1 mb-2 " key={count}>
                    <div className='container-fluid'>
                        <div className="row d-flex justify-content-center ">
                            {this.state.sen.split(' ')[count].split('').map((letter,countI)=>{ return (
                                <div className={(lengthWord(word)<=12 ? "col-sm-" : "ml-2 mr-2 btn-multi-letters ")+(countI===0 
                                    ? lengthFirstLetter((count!==(arrScramble(this.state.sen).length-1)), word)
                                    : lengthLetter((count!==(arrScramble(this.state.sen).length-1)), word))} key={countI}>
                                        {this.aLetter(count, countI, letter)}
                                </div>)
                            })}
                            {(count!==(arrScramble(this.state.sen).length-1))?
                                <div  className={" col-sm-"+lengthOfSpace(word)}>
                                    {this.aSpace(word,count)}
                                </div> : ""
                            }
                            
                        </div>
                    </div>
                </div>)})}
                <div className="col-sm-12 mt-3 mb-2 "> 
                    {(this.state.statusWords[this.state.statusWords.length-1][this.state.statusWords[this.state.statusWords.length-1].length-2]===false ? "" : 
                        <button className='btn btn-secondary bg-dark-light btn-lg btn-height d-inline-block btn-correct ml-3 mr-3 pl-3 pr-3 btn-next '
                            name="btnNext"
                            onClick={async()=>{
                                this.setState({number: this.state.number+1})
                                if(this.state.number>MAX_SENTENCE_INDEX) return
                                await this.props.searchSentences(this.state.number===MAX_SENTENCE_INDEX ? this.state.number : this.state.number+1)
                                this.handleSentence()
                                if(this.state.number>2){
                                    this.setState({inputValue: ""})
                                    document.querySelector(`input[name=firstLetter]`).focus()
                                }
                            }}> NEXT </button> 
                    )}
                </div>
            </div>)
    }
    
    handleSentence=async()=>await handleSentence(this.props.sentenceObject,this).then((res)=> this.setState(res))
    componentDidMount(){
        this.handleSentence()
    }
    
    render(){
        return (
            <DisplayGame gameCanvas={gameCanvas(this.state.sen, this.state.number)} listWords={this.listWords()} active={this.state.number}/>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        sentenceObject: state.sentenceObject
    };
};
const mapDispatchToProps = (dispatch) => {
    return{
        searchSentences: (number) => {
            dispatch(searchSentences(number));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Gaming)