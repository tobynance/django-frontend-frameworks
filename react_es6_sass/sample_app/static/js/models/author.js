import AuthorDispatcher from '../author-dispatcher.js';

//**********************************************************************
export class AuthorModel extends Backbone.Model {
    //******************************************************************
    defaults() {
        return {
            firstName: '',
            lastName: '',
            description: ''
        };
    };

    //******************************************************************
    getDisplayName() {
        return this.get('firstName') + " " + this.get('lastName');
    }
}

//**********************************************************************
class AuthorCollection extends Backbone.Collection {
    model = AuthorModel;
    dispatchToken = null;

    //******************************************************************
    dispatchCallback = (payload) => {
        switch (payload.actionType) {
            case "add-new-author":
                console.log("Adding item!!!");
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
