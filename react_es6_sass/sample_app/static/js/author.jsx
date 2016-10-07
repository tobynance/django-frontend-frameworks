'use strict';

import {ButtonModalDialog} from "./modal.jsx";

var FIXTURE = [
  {author_display_name: 'Such task', completed:true},
  {author_display_name: 'Much productivity', completed: true},
  {author_display_name: 'So business', completed: false},
  {author_display_name: 'Wow', completed: false},
  {author_display_name: 'To the moon!', completed: true}
];

//**********************************************************************
export class AuthorList extends React.Component {
    //******************************************************************
    constructor(props) {
        super(props);
        this.state = {authors: FIXTURE};
    }

    //******************************************************************
    render() {
        return (
            <div className="authors">
                {this.state.authors.map(function(item, index) {
                    return (
                        <AuthorItem
                            author_display_name={item.author_display_name}
                            index={index}
                        />
                    );
                }.bind(this))}
            </div>
        );
    }
}

//**********************************************************************
class AuthorItem extends React.Component {
    //******************************************************************
    render() {
        return (
            <div className="author-item">
                <img src={django.static("images/person-icon.png")}/>
                {this.props.author_display_name}
            </div>
        );
    }
}

//**********************************************************************
export class AddNewAuthor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isModalOpen: false};
    }

    //******************************************************************
    toggleOpen = () => {
        var state = this.state;
        state.isModalOpen = !state.isModalOpen;
        this.setState(state);
    };

    //******************************************************************
    handleSubmit = () => {

    };
    //******************************************************************
    render() {
        return (
            <ButtonModalDialog
                renderOpen={this.renderOpen}
                buttonText="Add New Author"
            />
        );
    }
    //******************************************************************
    renderOpen() {
        return (
            <div>Surprise!</div>
        );
    }

}