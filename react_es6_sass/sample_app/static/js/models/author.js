'use strict';

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
    };
}

//**********************************************************************
export class AuthorCollection extends Backbone.Collection {
    model = AuthorModel;
}
