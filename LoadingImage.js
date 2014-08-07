/** @jsx React.DOM */
var React = require("react");

module.exports = React.createClass({ displayName: "LoadingImage",
  getInitialState: function() {
    return {loadingClass: "when-loading"};
  },
  componentDidMount: function() {
    var self = this;
    var imgNode = self.refs.image.getDOMNode();
    $(imgNode).load(function(){
      self.setState({loadingClass: ""})
      if(self.props.didLoadWithImage) {
        self.props.didLoadWithImage.apply(null, [imgNode, self]);
      }
    });
  },
  render: function() {
    console.log("Rendering LoadingImage");
    var divStyles = {
      width: (this.props.displayWidth || 32) + "px",
    }

    if(this.props.displayWidth == null) {
      divStyles.height = "32px";
    }

    if(this.state.loadingClass == "" && this.props.displayWidth == null) {
      divStyles = {}
    }

    console.log("divStyles = ", divStyles, ", this.state.loadingClass = ", this.state.loadingClass, ", this.props.width = ", this.props.width);

    return (
      React.DOM.div({className: "loading-image " + this.state.loadingClass, style: divStyles}, 
        this.transferPropsTo(React.DOM.img({ref: "image"}))
      )
    );
  }
});
