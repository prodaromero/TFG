
function PointShortlist() {
  this.source = new Object();
  this.firtsMicro = new Object();
  this.secondMicro = new Object();
  this.thirdMicro = new Object();
  this.fourthMicro = new Object();
}

function SuggestedPoints() {
  this.firstSuggestedPoint = new PointShortlist();
  this.secondSuggestedPoint = new PointShortlist();
  this.thirdSuggestedPoint = new PointShortlist();
  this.fourthSuggestedPoint = new PointShortlist();
}
