'use strict';

var FIXTURES = [
  {val: 'Such task', completed:true},
  {val: 'Much productivity', completed: true},
  {val: 'So business', completed: false},
  {val: 'Wow', completed: false},
  {val: 'To the moon!', completed: true}
];

//**********************************************************************
export class TodoApp extends React.Component {
    //******************************************************************
    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    //******************************************************************
    componentDidMount() {
        this.setState({todos: FIXTURES});
    }

    //******************************************************************
    createNewTodo = (newValue) => {
        var state = this.state;
        state.todos.unshift({ val: newValue, completed: false});
        this.setState(state);
    };

    //******************************************************************
    clearCompleted = () => {
        var newTodos = this.state.todos.filter(function(el, index) {
            return !el.completed;
        });
        this.setState({todos: newTodos});
    };

    //******************************************************************
    updateVal = (val, index) => {
        var state = this.state;
        state.todos[index].val = val;
        this.setState(state);
    };

    //******************************************************************
    toggleCompleted = (index) => {
        var state = this.state;
        state.todos[index].completed = !state.todos[index].completed;
        this.setState(state);
    };

    //******************************************************************
    deleteTodo = (index) => {
        var state = this.state;
        state.todos.splice(index, 1);
        this.setState(state);
    };

    //******************************************************************
    render() {
        return (
            <div className="todo-outer-container">
                <NewTodo createNewTodo={this.createNewTodo}/>
                <TodoList
                    todos={this.state.todos}
                    updateVal={this.updateVal}
                    toggleCompleted={this.toggleCompleted}
                    deleteTodo={this.deleteTodo}
                />
                <ClearCompleted clearCompleted={this.clearCompleted}/>
            </div>
        );
    }
}

//**********************************************************************
class NewTodo extends React.Component {
    //******************************************************************
    constructor(props) {
        super(props);
        this.state = {newValue: ""};
    }

    //******************************************************************
    handleNewTodo = () => {
        this.props.createNewTodo(this.state.newValue);
        this.setState({newValue: ""});
    };

    //******************************************************************
    handleChange = (e) => {
        var state = this.state;
        state.newValue = e.target.value;
        this.setState(state);
    };

    //******************************************************************
    render() {
        return (
            <div className="add-todo-group input-group input-group-lg">
              <span className="input-group-addon">
                <i className="glyphicon glyphicon-list-alt"/>
              </span>
              <input onChange={this.handleChange} value={this.state.newValue} placeholder="New Todo" className="form-control" type="text" />
              <span className="input-group-btn">
                <button className="btn btn-success" type="button" onClick={this.handleNewTodo}>
                  <i className="glyphicon glyphicon-plus"/>
                </button>
              </span>
            </div>
        );
    }
}

//**********************************************************************
class TodoList extends React.Component {
    //******************************************************************
    render() {
        return (
            <div className="todos">
                {this.props.todos.map(function(el, index) {
                    return (
                        <TodoItem
                            todo={el}
                            index={index}
                            updateVal={this.props.updateVal}
                            toggleCompleted={this.props.toggleCompleted}
                            deleteTodo={this.props.deleteTodo}
                        />
                    );
                }.bind(this))}
            </div>
        );
    }
}

//**********************************************************************
class TodoItem extends React.Component {
    //******************************************************************
    constructor(props) {
        super(props);
    }

    //******************************************************************
    handleVal = (e) => {
        this.props.updateVal(e.target.value, this.props.index);
    };

    //******************************************************************
    handleToggle = (e) => {
        this.props.toggleCompleted(this.props.index);
    };

    //******************************************************************
    handleDelete = (e) => {
        this.props.deleteTodo(this.props.index);
    };

    //******************************************************************
    render() {
        var inputClassName = "form-control";
        if (this.props.todo.completed) {
            inputClassName += " finished";
        }
        return (
            <div className="input-group input-group-lg">
                <span className="input-group-addon">
                    <input onChange={this.handleToggle} checked={this.props.todo.completed} type="checkbox"/>
                </span>
                <input onChange={this.handleVal} type="text" value={this.props.todo.val} className={inputClassName}/>
                <span className="input-group-btn">
                    <button onClick={this.handleDelete} className="btn btn-danger" type="button">
                        <i className="glyphicon glyphicon-remove"/>
                    </button>
                </span>
            </div>
        );
    }
}

//**********************************************************************
class ClearCompleted extends React.Component {
    //******************************************************************
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log("handleClick called");
        this.props.clearCompleted();
    }
    render() {
        return (
            <div className="btn-clear-group">
              <button onClick={this.handleClick} className="btn btn-primary btn-clear">Clear Completed</button>
            </div>
        );
    }
}
