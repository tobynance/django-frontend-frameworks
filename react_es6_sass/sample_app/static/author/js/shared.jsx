console.log("shared_a");

//**********************************************************************
export function get_config(identifier='#config') {
    var config = $('#config');
    return JSON.parse(config.text());
}

//**********************************************************************
export function make_change() {
    console.log("shared_b");
    $("#content2").text("Dynamically changed in shared.");
}

//**********************************************************************
// based on https://blog.rescale.com/addressing-valuelink-deprecation-in-react-15/
function createHandler(component, key, field=null) {
    return (e) => {
        const elem = e.target;
        const value = elem.type === 'checkbox' ? elem.checked : elem.value;
        if (field) {
            component.state[key].set(field, value);
        }
        else {
            component.state[key] = value;
        }
        component.setState(component.state);
    };
}

//**********************************************************************
export function linkState(component, key, field=null) {
    let cache_key = [key, field];
    const cache = component.__linkStateHandlers || (component.__linkStateHandlers = {});
    return cache[cache_key] || (cache[cache_key] = createHandler(component, key, field));
}

//**********************************************************************
export class BaseReactComponent extends React.Component {
    //******************************************************************
    linkState = (key, field=null) => {
        return linkState(this, key, field);
    };

    //******************************************************************
    getBackboneCollections() {
        return [];
    };

    //******************************************************************
    componentDidMount() {
		// Whenever there may be a change in the Backbone data, trigger a
        // reconcile.
        this.getBackboneCollections().forEach((collection) => {
            // explicitly bind `null` to `forceUpdate`, as it demands a callback and
            // React validates that it's a function. `collection` events passes
            // additional arguments that are not functions
            collection.on('add remove change unshift', this.forceUpdate.bind(this, null));
        });
    };

    //******************************************************************
    componentWillUnmount() {
        // Ensure that we clean up any dangling references when the component is
        // destroyed.
        this.getBackboneCollections().forEach((collection) => {
            collection.off(null, null, this);
        });
    }
}
