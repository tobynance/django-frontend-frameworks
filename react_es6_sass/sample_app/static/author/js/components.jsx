import {BaseReactComponent} from './shared.jsx';
import {AuthorModel} from './models.js';
import AuthorDispatcher from './dispatcher.js';

//**********************************************************************
export class AuthorList extends BaseReactComponent {
    //******************************************************************
    getBackboneCollections() {
        return [this.props.authors];
    }

    //******************************************************************
    render() {
        return (
            <div className="authors">
                {this.props.authors.map((item, index) => {
                    return (
                        <AuthorItem
                            author={item}
                            key={index}
                        />
                    );
                })}
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
                border: 'solid'
            },
            deleteButton: {
                backgroundColor: 'red',
                color: 'blue'
            },
        };
    }

    //******************************************************************
    handleDeleteAuthor = () => {
        AuthorDispatcher.dispatch({actionType: "delete-author", authorId: this.props.author.id});
    };

    //******************************************************************
    render() {
        let styles = AuthorItem.getStyles();
        return (
            <div className="author-item" style={styles.authorItem}>
                <img style={styles.img} src={django.static("images/person-icon.png")}/>
                {this.props.author.getDisplayName()}
                <button style={styles.deleteButton} type="button" onClick={this.handleDeleteAuthor}>X</button>
            </div>
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
                <button onClick={this.displayForm}>Add New Author</button>
            );
        }
    }
}
