import { Component } from "react";
/**
 * @date Jan 07, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */

class DisplaySentence extends Component {
    render(){
        return (
            <div id="scrambled-word" style={{marginTop: '60px'}}>
                {this.props.querySentence}
            </div>
        );
    }
};
export default DisplaySentence