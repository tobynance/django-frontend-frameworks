'use strict';

// var Radium = require('radium');

//**********************************************************************
@Radium
export class ButtonModalDialog extends React.Component {
    static defaultProps = {
        startModalOpen: false,
        buttonClass: "",
        buttonText: "Open"
    };

    static propTypes = {
        startModalOpen: React.PropTypes.bool,
        buttonClass: React.PropTypes.string,
        buttonText: React.PropTypes.string,
        renderOpen: React.PropTypes.func.isRequired
    };
    state = {isModalOpen: false};

    //******************************************************************
    toggleOpen = () => {
        var state = this.state;
        state.isModalOpen = !state.isModalOpen;
        this.setState(state);
    };

    //******************************************************************
    render() {
        if (this.state.isModalOpen) {
            return this.renderClosed();
        }
        else {
            return this.renderOpen();
        }
    }
    //******************************************************************
    renderClosed() {
        return (
            <button onClick={this.toggleOpen}
                    className={this.props.buttonClass}>
                {this.props.buttonText}
            </button>
        );
    }
    //******************************************************************
    renderOpen() {
        return (
            <div className="modal-content">
                Open now!
            </div>
        );
    }

}