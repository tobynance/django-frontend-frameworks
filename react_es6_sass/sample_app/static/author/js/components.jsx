import React from 'react';
import {BaseReactComponent} from './shared.jsx';
import {AuthorModel} from './models.js';
import AuthorDispatcher from './dispatcher.js';

//**********************************************************************
export class AuthorList extends BaseReactComponent {
    //******************************************************************
    getBackboneCollections() {
        return [this.props.authors];
    }
    refresh() {
        AuthorDispatcher.dispatch({actionType: "refresh-authors"});
    }

    //******************************************************************
    render() {
        return (
            <div>
                <ul className="authors collection">
                    {this.props.authors.map((author, index) => {
                        return (
                            <AuthorItem
                                author={author}
                                key={index}
                                expanded={author === this.props.authors.expanded}
                            />
                        );
                    })}
                </ul>
                <a className="waves-effect btn" onClick={this.refresh}>Refresh</a>
            </div>
        );
    }
}

//**********************************************************************
class AuthorItem extends React.Component {
    //******************************************************************
    static getStyles() {
        return {
            img: {
                paddingLeft: '5px',
                paddingRight: '10px'
            },
            authorItem: {
                // border: 'solid'
            },
            deleteButton: {
                backgroundColor: 'red',
                color: 'blue'
            },
            expandedAuthor: {
                display: 'inline-block'
            }
        };
    }

    //******************************************************************
    handleDeleteAuthor = () => {
        AuthorDispatcher.dispatch({actionType: "delete-author", authorId: this.props.author.id});
    };

    //******************************************************************
    handleExpandAuthor = () => {
        console.log("handleExpandAuthor");
        AuthorDispatcher.dispatch({actionType: "expand-author", author: this.props.author});
    };

    //******************************************************************
    render() {
        let styles = AuthorItem.getStyles();
        let innerChunk = null;
        if (this.props.expanded) {
            innerChunk = (
                <ul className="collection" style={styles.expandedAuthor}>
                    <li className="collection-item"><strong>ID:</strong>{this.props.author.get('id')}</li>
                    <li className="collection-item"><strong>First Name:</strong>{this.props.author.get('first_name')}</li>
                    <li className="collection-item"><strong>Last Name:</strong>{this.props.author.get('last_name')}</li>
                    <li className="collection-item"><strong>Description:</strong>{this.props.author.get('description')}</li>
                </ul>
            );
        }
        else {
            innerChunk = (
                <span>
                    <i className="material-icons left">account_circle</i>
                    {this.props.author.getDisplayName()}
                </span>
            );
        }
        return (
            <li className="collection-item author-item" style={styles.authorItem} onClick={this.handleExpandAuthor}>
                {innerChunk}
                <i onClick={this.handleDeleteAuthor} className="material-icons small right">delete</i>
            </li>
        );
    }
}

//**********************************************************************
export class AddNewAuthor extends BaseReactComponent {
    //******************************************************************
    constructor(props) {
        super(props);
        this.state = AddNewAuthor.initialState();
    }

    //******************************************************************
    static initialState() {
        return {
            isFormDisplayed: false,
            author: new AuthorModel()
        };
    };

    //******************************************************************
    displayForm = () => {
        var state = this.state;
        state.isFormDisplayed = true;
        this.setState(state);
    };

    //******************************************************************
    handleNewAuthor = () => {
        AuthorDispatcher.dispatch({actionType: "add-new-author", author: this.state.author});
        this.setState(AddNewAuthor.initialState());
    };

    //******************************************************************
    static getStyles() {
        return {
            firstName: {},
            lastName: {},
            description: {},
            submitButton: {}
        };
    }

    //******************************************************************
    render() {
        if (this.state.isFormDisplayed) {
            let styles = AddNewAuthor.getStyles();
            return (
                <div>
                    <input onChange={this.linkState('author', 'first_name')} value={this.state.author.get('first_name')} placeholder="First Name" style={styles.firstName} type="text" />
                    <input onChange={this.linkState('author', 'last_name')} value={this.state.author.get('last_name')} placeholder="Last Name" style={styles.lastName} type="text" />
                    <input onChange={this.linkState('author', 'description')} value={this.state.author.get('description')} placeholder="Description Name" style={styles.description} type="text" />
                    <button style={styles.submitButton} type="button" onClick={this.handleNewAuthor}>Create</button>
                </div>
            );
        }
        else {
            return (
                <a className="waves-effect btn" onClick={this.displayForm}>Add New Author</a>
            );
        }
    }
}
