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
      <div>
      <div className="modal fade in" style={this.state.visiable ? {display: "block"}: {display:"none"}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.close}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
              <h4 className="modal-title">{this.state.image.title}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <CroppingImage image={this.state.image} onUpdateCoords={this.updateCoords}></CroppingImage>
                <div className="col-xs-2"></div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.close}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.crop}>OK</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade in"></div>
      </div>
    );
  }
});
