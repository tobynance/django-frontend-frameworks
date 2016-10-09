import AuthorDispatcher from './dispatcher.js';
import {get_config} from './shared.jsx';

//**********************************************************************
export class AuthorModel extends Backbone.Model {
    //******************************************************************
    defaults() {
        return {
            firstName: '',
            lastName: '',
            description: ''
        };
    }

    //******************************************************************
    initialize(options) {
        this.options = options;
    }

    //******************************************************************
    load() {

    }

    //******************************************************************
    getDisplayName() {
        return this.get('firstName') + " " + this.get('lastName');
    }
}

var config = get_config();

//**********************************************************************
export class AuthorCollection extends Backbone.Collection {
    model = AuthorModel;
    url = config.authorsUrl;
    dispatchToken = null;

    //******************************************************************
    dispatchCallback = (payload) => {
        switch (payload.actionType) {
            case "add-new-author":
                console.log("Adding item!!!" + this.length);
                this.unshift(payload.item);
                break;
            case "delete-last-item":
                this.pop();
                break;
        }
    };
}

export const AuthorStore = new AuthorCollection();
AuthorStore.dispatchToken = AuthorDispatcher.register(AuthorStore.dispatchCallback);
