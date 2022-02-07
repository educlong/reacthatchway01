import React, { Component } from 'react';
import { Routes ,Route } from 'react-router-dom';
import { connect } from "react-redux";
import DisplaySentence from './DisplaySentence';
import {FIRST_SENTENCE_INDEX} from '../store/sentence';
import {
    handleSentence, 
    scramble,
} from './HandleSentence';
import Gaming from './Gaming';
/**
 * @date Jan 07, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */
class Routers extends Component {
    constructor(props){
        super(props);
        this.state={
            sen:null,
            number: FIRST_SENTENCE_INDEX,
        }
    }
    handleSentence=async()=>await handleSentence(this.props.sentenceObject,this).then((res)=> this.setState(res))
    componentDidMount(){
        this.handleSentence()
    }
    render() {
        return (    
            <div className='routers'>
                {/*
                A <Switch> looks through all its children <Route>
                elements and renders the first one whose path
                matches the current URL. Use a <Switch> any time
                you have multiple routes, but you want only one
                of them to render at a time
                */}
                <Routes>
                    <Route path='/' />
                    <Route path='/part01' element={<DisplaySentence querySentence={this.state.sen}/>} />
                    <Route path='/part02' element={<DisplaySentence querySentence={scramble(this.state.sen)}/>} />
                    <Route path='/part03-04-05' element={<Gaming/>} />
                </Routes>
            </div>  
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sentenceObject: state.sentenceObject
    };
};
export default connect(mapStateToProps)(Routers)
 