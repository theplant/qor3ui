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
      <div className="images-with-cropper">
        <ImageCropperPopup ref="cropperPopup"></ImageCropperPopup>
        <div className="well container-fluid">
          <div className="row">
          {this.props.images.map(function(image, i){
            return (
              <div className="col-xs-2">
                <a onClick={comp.clickImage.bind(comp, comp.props.images, i)} className="thumbnail">
                  <img src={image.src}></img>
                </a>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    );
  }
});
