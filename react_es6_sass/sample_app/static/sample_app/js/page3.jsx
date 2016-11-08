import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';


var NotificationFrequency = {
  UNBUNDLED: {
    value: 0,
    name: "Unbundled",
    description: "Send notification as soon as it is available"
  },
  DAILY: {
    value: 1,
    name: "Daily",
    description: "Bundle notifications up into a daily message"
  },
  WEEKLY: {
    value: 2,
    name: "Weekly",
    description: "Bundle notifications up into a weekly message"
  },
  MONTHLY: {
    value: 3,
    name: "Monthly",
    description: "Bundle notifications up into a monthly message"
  },
  NEVER: {
    value: 4,
    name: "Never",
    description: "Never send me this type of notification"
  },
};

var notificationList = [
  NotificationFrequency.UNBUNDLED,
  NotificationFrequency.DAILY,
  NotificationFrequency.WEEKLY,
  NotificationFrequency.MONTHLY,
  NotificationFrequency.NEVER
];

var notificationTypes = [
  {
    id: 28,
    name: "Service Disruption",
    description: "Notice that we are not able to process additions and changes " +
      "for a period of time, usually affecting only a single distributor.",
    maximumAllowedDelay: NotificationFrequency.DAILY,
    currentValue: NotificationFrequency.UNBUNDLED
  },
  {
    id: 120,
    name: "Content Review",
    description: "Notice that a book had an issue raised during Content Review " +
    "that needs to be resolved before it can be published",
    maximumAllowedDelay: NotificationFrequency.DAILY,
    currentValue: NotificationFrequency.UNBUNDLED
  },
  {
    id: 50,
    name: "Payment Return Notice",
    description: "A payment made to you was returned by the bank as undeliverable",
    maximumAllowedDelay: NotificationFrequency.UNBUNDLED,
    currentValue: NotificationFrequency.UNBUNDLED
  },
  {
    id: 51,
    name: "Book Live",
    description: "Notice that a book has gone live",
    maximumAllowedDelay: NotificationFrequency.NEVER,
    currentValue: NotificationFrequency.UNBUNDLED
  },
  {
    id: 44,
    name: "New Distributor",
    description: "Notice that a new distributor is now available",
    maximumAllowedDelay: NotificationFrequency.NEVER,
    currentValue: NotificationFrequency.UNBUNDLED
  },
  {
    id: 33,
    name: "Royalty Statement",
    description: "Your royalties for a particular distributor for a particular month",
    maximumAllowedDelay: NotificationFrequency.MONTHLY,
    currentValue: NotificationFrequency.UNBUNDLED
  }
];

class SelectionPoint extends React.Component {
    render(){
        let selectionPoint = {
            width: "4px",
            height: "100%",
            backgroundColor: "black",
            position: "absolute",
            left: `${this.props.value}%`,
            margin: "0",
            padding: "0"
        };
        return (
            <div style={selectionPoint}></div>
        );
    }
}

class HorizontalChoice extends React.Component {
    static propTypes = {
        id: React.PropTypes.string.isRequired,
        maximumAllowedDelay: React.PropTypes.number,
        currentValue: React.PropTypes.number,
        onSelectionChange: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        currentValue: NotificationFrequency.UNBUNDLED.value,
        maximumAllowedDelay: NotificationFrequency.NEVER.value
    };

    state = {
        mouseDown: false
    };

    handleSelection = (e) => {
        if (e.buttons === 1) {
            let clientRect = e.target.getClientRects()[0];
            let index = this.convertClickToSelectionIndex(
                e.clientX, clientRect.width, clientRect.left, notificationList.length
            );

            if(this.props.currentValue != index){
                console.log(`Updating value to ${index}`);
                this.props.onSelectionChange(index);
            }
        }
    };

    handleMouseDown = (e) => {
        this.setState({mouseDown: true});
        this.handleSelection(e);
    };

    handleMouseDone = (e) => {
        this.setState({mouseDown: false});
    };

    convertClickToSelectionIndex = (mouseX, lineWidth, lineLeft, numSelections=5) => {
        let location = Math.max(0, Math.min(mouseX - lineLeft, lineWidth));
        let index = Math.round((numSelections - 1) * location / lineWidth);
        return index;
    };

    render() {
        let hcStyle = {
            width: "100%",
            height: "16px",
            cursor: "pointer",
            border: "solid red",
            position: "relative"
        };

        let lineStyle = {
            backgroundColor: "blue",
            height: "2px",
            position: "absolute",
            top: "50%",
            marginTop: "-1px",
            padding: "0",
            width: "100%"
        };

        return (
            <div id={this.props.id} style={hcStyle} onMouseMove={this.handleSelection}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseDone}
                onMouseLeave={this.handleMouseDone}>
                <div style={lineStyle}></div>
                <SelectionPoint value={this.props.currentValue * 25}/>
            </div>
        );
    }
}

class NotificationPreference extends React.Component {
    static propTypes = {
        notificationType: React.PropTypes.object.isRequired,
        onSelectionChange: React.PropTypes.func.isRequired,
        currentValue: React.PropTypes.number
    };

    static defaultTypes = {
        currentValue: NotificationFrequency.UNBUNDLED.value
    };

    render (){
        let id = `np_${this.props.notificationType.id}`;
        return (
            <div>
                <label title={this.props.notificationType.description}
                       htmlFor={id}>{this.props.notificationType.name}</label>
                <span>{notificationList[this.props.currentValue].description}</span>
                <HorizontalChoice id={id} currentValue={this.props.currentValue}
                    onSelectionChange={(value) => this.props.onSelectionChange(this.props.notificationType.id, value)}/>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = notificationTypes.reduce((state, notificationType) => {
             state[notificationType.id] = NotificationFrequency.UNBUNDLED.value;
             return state;
        }, {});
    }

    handleSelectionValue = (notificationId, value) => {
        this.setState({[notificationId]: value});
        console.log(`handleSelectionValue value: ${value}`);
        console.log(`handleSelectionValue notificationId: ${notificationId}`);
    };

    render(){
        return (
            <div>
                {notificationTypes.map((notificationType) =>
                    <NotificationPreference notificationType={notificationType}
                                            key={notificationType.id}
                                            currentValue={this.state[notificationType.id]}
                                            onSelectionChange={this.handleSelectionValue}/>
                )}
            </div>
        );
    }
}

function main() {
    ReactDOM.render(<App/>, document.getElementById('app'));
}

jQuery(document).ready(() => main());
