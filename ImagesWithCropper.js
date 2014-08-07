/** @jsx React.DOM */
var React = require("react");
var ImageCropperPopup = require("./ImageCropperPopup.js");

module.exports = React.createClass({ displayName: "ImagesWithCropper",
  clickImage: function(images, i){
    var popup = this.refs.cropperPopup;
    popup.show(images[i]);
  },
  render: function() {
    var comp = this;
    return (
      React.DOM.div({className: "images-with-cropper"}, 
        ImageCropperPopup({ref: "cropperPopup"}), 
        React.DOM.div({className: "well container-fluid"}, 
          React.DOM.div({className: "row"}, 
          this.props.images.map(function(image, i){
            return (
              React.DOM.div({className: "col-xs-2"}, 
                React.DOM.a({onClick: comp.clickImage.bind(comp, comp.props.images, i), className: "thumbnail"}, 
                  React.DOM.img({src: image.src})
                )
              )
            )
          })
          )
        )
      )
    );
  }
});
