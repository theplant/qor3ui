
var React = require("react");

var ButtonCheckboxGroup = require("../ButtonCheckboxGroup.js");
var ImagesWithCropper = require("../ImagesWithCropper.js");
var LoadingImage = require("../LoadingImage.js");

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
  <div>
    <h3>Alignment 1</h3>
    <ButtonCheckboxGroup options={options1} onChange={buttonCheckedGroupChange}></ButtonCheckboxGroup>

    <h3> Images with cropper </h3>
    <ImagesWithCropper images={[
      {title: "Laptop", cropX: 10, cropY: 20, cropWidth: 50, cropHeight: 30, src: "https://qortex.cn/public/img/home/new-2014/banner-image-laptop-EN.png"},
      {title: "iPad", src: "https://qortex.cn/public/img/home/new-2014/content-team-communication-EN.png"},
      {title: "Nike Free Swift", cropX: 10, cropY: 5, cropWidth: 300, cropHeight: 80,  src: "http://www.dunkhome.com/upload/image/2014-06/2014-06-137702.jpg"},
      {title: "Smaller", cropX: 10, cropY: 5, cropWidth: 300, cropHeight: 80, targetWidth: 300, targetHeight: 200, src: "https://d13yacurqjgara.cloudfront.net/users/44585/screenshots/1660283/hey-you-boys-dribbble.png"},
    ]}></ImagesWithCropper>

    <h3> Loading Image </h3>
    <LoadingImage width={400} height={300} src="https://d13yacurqjgara.cloudfront.net/users/44585/screenshots/1660283/hey-you-boys-dribbble.png"></LoadingImage>

  </div>
  ,


  document.getElementById('theApp')
);




