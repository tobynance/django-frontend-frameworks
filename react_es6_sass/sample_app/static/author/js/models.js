import AuthorDispatcher from './dispatcher.js';
import {get_config} from './shared.jsx';

//**********************************************************************
export class AuthorModel extends Backbone.Model {
    //******************************************************************
    defaults() {
        return {
            id: null,
            first_name: '',
            last_name: '',
            description: ''
        };
    }

    //******************************************************************
    getDisplayName() {
        return this.get('first_name') + " " + this.get('last_name');
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
                console.log("Adding Author: " + payload.author);
                this.create(payload.item); // TODO - Add callback methods
                break;
            case "delete-author":
                console.log("deleting author: " + payload.authorId);
                authorId = payload.authorId;
                let author = this.findWhere({id: payload.authorId});
                if (author) {
                    this.remove(author); // TODO - I don't think this will remove it on the server, but need to verify
                }
                break;
        }
    };
}

export const AuthorStore = new AuthorCollection();
AuthorStore.dispatchToken = AuthorDispatcher.register(AuthorStore.dispatchCallback);
