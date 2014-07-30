/** @jsx React.DOM */


var ButtonCheckboxGroup = React.createClass({displayName: 'ButtonCheckboxGroup',
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


var ImageUpload = React.createClass({displayName: 'ImageUpload',
	render: function(){
		return (
			React.DOM.div(null)
		)
	}
});


var LoadingImage = React.createClass({displayName: 'LoadingImage',
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
})


var CroppingImage = React.createClass({displayName: 'CroppingImage',
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
			React.DOM.div({className: "cropping-image-container", ref: "container"}, 
				React.DOM.i({className: "icon-spinner icon-spin icon-large"}), 
				LoadingImage({src: this.props.image.src, ref: "image", didLoadWithImage: this.didLoadWithImage, displayWidth: this.state.displayWidth})
			)

		);
	}
});

var ImageCropperPopup = React.createClass({displayName: 'ImageCropperPopup',
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

var ImagesWithCropper = React.createClass({displayName: 'ImagesWithCropper',
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



function buttonCheckedGroupChange(selectedIndex, options, evt) {
	console.log(selectedIndex, options)
}

var options1 = [
	{label: "Left", value: "left"},
	{label: "Center", value: "center", selected: true},
	{label: "Right", value: "right"},
	{label: "Right", value: "right"}
];


React.renderComponent(
	React.DOM.div(null, 
		React.DOM.h3(null, "Alignment 1"), 
		ButtonCheckboxGroup({options: options1, onChange: buttonCheckedGroupChange}), 

		React.DOM.h3(null, "Gender"), 
		ButtonCheckboxGroup({options: [
			{label: "Male", value: "male"},
			{label: "Female", value: "female", selected: true}
		], onChange: buttonCheckedGroupChange}), 

		React.DOM.h3(null, " Images with cropper "), 
		ImagesWithCropper({images: [
			{title: "Laptop", cropX: 10, cropY: 20, cropWidth: 50, cropHeight: 30, src: "https://qortex.cn/public/img/home/new-2014/banner-image-laptop-EN.png"},
			{title: "iPad", src: "https://qortex.cn/public/img/home/new-2014/content-team-communication-EN.png"},
			{title: "Nike Free Swift", cropX: 10, cropY: 5, cropWidth: 300, cropHeight: 80,  src: "http://www.dunkhome.com/upload/image/2014-06/2014-06-137702.jpg"},
			{title: "Smaller", cropX: 10, cropY: 5, cropWidth: 300, cropHeight: 80, targetWidth: 300, targetHeight: 200, src: "https://d13yacurqjgara.cloudfront.net/users/44585/screenshots/1660283/hey-you-boys-dribbble.png"},
		]}), 

		React.DOM.h3(null, " Loading Image "), 

		LoadingImage({width: 400, height: 300, src: "https://d13yacurqjgara.cloudfront.net/users/44585/screenshots/1660283/hey-you-boys-dribbble.png"})
	),
	document.getElementById('theApp')
);




