/** @jsx React.DOM */
var React = require("react");
var CroppingImage = require("./CroppingImage.js");

module.exports = React.createClass({ displayName: "ImageCropperPopup",
  getInitialState: function() {
    return {visiable: false};
  },
  close: function() {
    this.setState({visiable: false});
  },
  crop: function(coords) {
    console.log("crop: ");
    this.close();
  },
  updateCoords: function(coords) {
    console.log("coords = ", coords);
  },
  show: function(image) {
    this.setState({visiable: true, image: image});
  },
  render: function() {
    if(!this.state.visiable) {
      return null;
    }
    return (
      React.DOM.div(null, 
      React.DOM.div({className: "modal fade in", style: this.state.visiable ? {display: "block"}: {display:"none"}}, 
        React.DOM.div({className: "modal-dialog"}, 
          React.DOM.div({className: "modal-content"}, 
            React.DOM.div({className: "modal-header"}, 
              React.DOM.button({type: "button", className: "close", onClick: this.close}, React.DOM.span({'aria-hidden': "true"}, "×"), React.DOM.span({className: "sr-only"}, "Close")), 
              React.DOM.h4({className: "modal-title"}, this.state.image.title)
            ), 
            React.DOM.div({className: "modal-body"}, 
              React.DOM.div({className: "row"}, 
                CroppingImage({image: this.state.image, onUpdateCoords: this.updateCoords}), 
                React.DOM.div({className: "col-xs-2"})
              )
            ), 
            React.DOM.div({className: "modal-footer"}, 
              React.DOM.button({type: "button", className: "btn btn-default", onClick: this.close}, "Cancel"), 
              React.DOM.button({type: "button", className: "btn btn-primary", onClick: this.crop}, "OK")
            )
          )
        )
      ), 
      React.DOM.div({className: "modal-backdrop fade in"})
      )
    );
  }
});
