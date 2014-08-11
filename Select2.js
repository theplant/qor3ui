/** @jsx React.DOM */
var React = require("react");

module.exports = React.createClass({ displayName: "Select2",
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    var n = this.getDOMNode();
    $(n).select2(this.props);
  },

  render: function() {
    return (
      React.DOM.div(null)
    );
  }
});
