/** @jsx React.DOM */
var React = require("react");
var LoadingImage = require("./LoadingImage.js");

module.exports = React.createClass({ displayName: "CroppingImage",
  getInitialState: function() {
    return {displayWidth: 500};
  },

  componentDidMount: function() {
    console.log("CroppingImage componentDidMount");

  },

  attachJcropAndInitialSelect: function(imgNode, displayRadio, aspectRatio) {
    var jc = $.Jcrop(imgNode, {
      aspectRatio: aspectRatio,
      onChange: this.onUpdateCoords,
      onSelect: this.onUpdateCoords
    });
    var image = this.props.image;
    if (image.cropWidth > 0 && image.cropHeight > 0){
      jc.setSelect([
        image.cropX * displayRadio,
        image.cropY * displayRadio,
        (image.cropX + image.cropWidth) * displayRadio,
        (image.cropY + image.cropHeight) * displayRadio
      ]);
    };
  },

  onUpdateCoords: function(coords) {
    console.log("this.state.displayRadio = ", this.state.displayRadio)
    this.props.onUpdateCoords.apply(null, [{
      x: Math.round(coords.x/this.state.displayRadio),
      y: Math.round(coords.y/this.state.displayRadio),
      x2: Math.round(coords.x2/this.state.displayRadio),
      y2: Math.round(coords.y2/this.state.displayRadio),
      w: Math.round(coords.w/this.state.displayRadio),
      h: Math.round(coords.h/this.state.displayRadio)
    }]);
  },

  didLoadWithImage: function(imgNode) {
    var self = this;
    var displayWidth = this.props.displayWidth || 500;

    // Create new offscreen image to test
    var theImage = new Image();
    theImage.src = $(imgNode).attr("src");

    // Get accurate measurements from that.
    var originalImageWidth = theImage.width;
    var originalImageHeight = theImage.height;

    var displayHeight = Math.round((displayWidth / originalImageWidth) * originalImageHeight);

    // Smaller image don't stretch bigger.
    if (originalImageWidth < displayWidth) {
      displayWidth = originalImageWidth;
      displayHeight = originalImageHeight;
    }

    // console.log("displayWidth: ", displayWidth, ", displayHeight: ", displayHeight);
    // console.log("originalImageWidth: ", originalImageWidth, ", originalImageHeight: ", originalImageHeight);

    var displayRadio = displayWidth/originalImageWidth;
    this.setState({displayWidth: displayWidth, displayHeight: displayHeight, displayRadio: displayRadio});
    var aspectRatio = 1;

    // console.log("this.props.image = ", this.props.image);

    if (this.props.image.targetWidth && this.props.image.targetHeight) {
      aspectRatio = this.props.image.targetWidth / this.props.image.targetHeight;
    }

    setTimeout(function(){
      self.attachJcropAndInitialSelect(imgNode, displayRadio, aspectRatio);
    }, 300);
  },

  render: function() {
    return (
      <div className="cropping-image-container" ref="container">
        <i className='icon-spinner icon-spin icon-large'></i>
        <LoadingImage src={this.props.image.src} ref="image" didLoadWithImage={this.didLoadWithImage} displayWidth={this.state.displayWidth}></LoadingImage>
      </div>

    );
  }
});
