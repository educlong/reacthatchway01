import { Component } from "react";
/**
 * @date Jan 07, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */
 import {MAX_SENTENCE_INDEX} from '../store/sentence';

class DisplayGame extends Component {
    render(){
        return (
            <div className="bg-dark-light">
                <div className="container mt-3 pt-3 bg-dark-light ">{
                        parseInt(this.props.active) <= MAX_SENTENCE_INDEX+1 ? 
                            (<div className="container mt-3 pt-3 bg-dark-light ">
                                {this.props.gameCanvas}
                                <div className="row bg-dark-light ">
                                    <div className="col-sm-12 ml-3 pl-3 mr-5 pr-5 bg-white mb-5 pb-5 game-canvas-bottom">
                                        <div className="container ml-3 pl-3 mr-5 pr-5 mt-2 pt-2">
                                            {this.props.listWords}
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        : (<div className="container mt-5 pt-5 bg-dark-light ">
                                <div className="row bg-dark-light ">
                                    <div className="col-sm-12 ml-3 pl-3 mr-5 pr-5 bg-white mb-5 pb-5 game-canvas-bottom game-canvas-top">
                                        <div className="container ml-3 pl-3 mr-5 pr-5 mt-4 pt-4 h4 font-weight-bold">
                                            You win!
                                        </div>
                                    </div>
                                </div>
                            </div>)
                }</div>
            </div>
        );
    }
};
export default DisplayGame