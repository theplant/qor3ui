
var React = require("react");

var ButtonCheckboxGroup = require("../ButtonCheckboxGroup.js");
var ImagesWithCropper = require("../ImagesWithCropper.js");
var LoadingImage = require("../LoadingImage.js");
var Select2 = require("../Select2.js");

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

    <h3> Select2 with tags</h3>
    <Select2 tags={["red", "green", "blue"]} width="80%"></Select2>

    <h3> Select2 with remote ajax call </h3>
    <Select2 placeholder="Select a github repository" ajax={{
      url: "https://api.github.com/search/repositories",
      dataType: "jsonp",
      data: function(term, page){
        return {
          q: term,
          sort: "stars",
          order: "desc"
        };
      },
      results: function(r, page) {
        if(r.data.message) {
          alert(r.data.message);
          return{results: []};
        }
        return {results: r.data.items};
      },
      }} formatResult={function(d) {
        return d.full_name;
      }} formatSelection={function(d){
        return d.full_name;
      }} width="80%"></Select2>

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




