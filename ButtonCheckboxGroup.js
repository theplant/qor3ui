/** @jsx React.DOM */
var React = require("react");

module.exports = React.createClass({displayName: "ButtonCheckboxGroup",
  propTypes: {
    onChange: React.PropTypes.func
  },

  componentDidMount: function() {
    this.setState({options: this.props.options});
  },

  getInitialState: function() {
    return {options: []};
  },

  handleClick: function(i, evt) {
    opts = this.state.options;

    if (opts[i].selected === true){
      opts[i].selected = false;
    } else {
      opts[i].selected = true;
    }

    this.setState({options: opts});
    if(this.props.onChange) {
      this.props.onChange.apply(null, [i, opts, evt]);
    }
    return false;
  },

  render: function() {
    var comp = this;
    var checkboxes = this.state.options.map(function(option, i){
      return (
        React.DOM.label({className: "btn btn-default "+ (option.selected ? "active": ""), onClick: comp.handleClick.bind(comp, i)}, option.label)
      );
    })
    return (
      React.DOM.div({className: "btn-group", 'data-toggle': "buttons"}, 
        checkboxes
      )
    );
  }
});
