import React, { Component } from 'react';
/**
 * @date Jan 07, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */
class Footer extends Component {
    render() {
        return (    /**Footer */
            <footer className="bg-dark py-4 mt-auto fixed-bottom">
                <div className="container px-5">
                <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                    <div className="col-auto"><div className="small m-0 text-white">Copyright © My assignment 2022</div></div>
                    <div className="col-auto text-right">
                        <div className='row text-white'>
                            <div className="link-light small">LongND</div>
                            <span className="text-white mx-1">·</span>
                            <div className="link-light small" href="#!">Paul</div>
                        </div>
                    </div>
                </div>
                </div>
            </footer>
        );
    }
}

export default Footer;