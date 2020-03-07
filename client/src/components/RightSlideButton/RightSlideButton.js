import React, { Component } from 'react';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
// import 'react-sliding-pane/dist/react-sliding-pane.css';
import "./style.css";


class Sidebutton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            isPaneOpenLeft: false
        };
    }

    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    render() {
        return (
        <div ref={ref => this.el = ref}>
            <button onClick={() => this.setState({ isPaneOpen: true })}>Click me to open right pane!</button>
            <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={this.state.isPaneOpen}
                title='(Title)'
                subtitle='(Subtitle)'
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isPaneOpen: false });
                }}>
                <div>(Text Content)</div>
            </SlidingPane>
        </div>
        );
    }
}

export default Sidebutton;