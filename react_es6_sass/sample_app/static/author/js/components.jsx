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
        };
    }

    //******************************************************************
    render() {
        let styles = AuthorItem.getStyles();
        return (
            <div className="author-item">
                <img style={styles.img} src={django.static("images/person-icon.png")}/>
                {this.props.author.getDisplayName()}
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
        AuthorDispatcher.dispatch({actionType: "add-new-author", item: this.state.author});
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
                    <input onChange={this.linkState('author', 'firstName')} value={this.state.author.get('firstName')} placeholder="First Name" style={styles.firstName} type="text" />
                    <input onChange={this.linkState('author', 'lastName')} value={this.state.author.get('lastName')} placeholder="Last Name" style={styles.lastName} type="text" />
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
