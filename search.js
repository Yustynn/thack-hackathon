var staticData = [{"name":"Hotel Pennsylvania","hotelRating":4.9,"foodRating":3.8,"starRating":2,"thumbnailUrl":"http://mobileimg.priceline.com/htlimg/3230/3230705/thumbnail-150-square.jpg","tourismRating":4,"transitRating":null,"url":"http://www.priceline.com/hotel/hotelOverviewGuide.do?numberOfRooms=1&from=rateSelectionDirect&propID=3230705&noDate=Y"},{"name":"Park Central","hotelRating":7.8,"foodRating":4,"starRating":4,"thumbnailUrl":"http://mobileimg.priceline.com/htlimg/40/40622/thumbnail-150-square.jpg","tourismRating":4,"transitRating":null,"url":"http://www.priceline.com/hotel/hotelOverviewGuide.do?numberOfRooms=1&from=rateSelectionDirect&propID=40622&noDate=Y"},{"name":"Wyndham New Yorker Hotel","hotelRating":6.9,"foodRating":3.6,"starRating":4,"thumbnailUrl":"http://mobileimg.priceline.com/htlimg/40/40730/thumbnail-150-square.jpg","tourismRating":4,"transitRating":null,"url":"http://www.priceline.com/hotel/hotelOverviewGuide.do?numberOfRooms=1&from=rateSelectionDirect&propID=40730&noDate=Y"},{"name":"Night Hotel Times Square","hotelRating":7.5,"foodRating":4,"starRating":4,"thumbnailUrl":"http://mobileimg.priceline.com/htlimg/42/42071/thumbnail-150-square.jpg","tourismRating":4,"transitRating":null,"url":"http://www.priceline.com/hotel/hotelOverviewGuide.do?numberOfRooms=1&from=rateSelectionDirect&propID=42071&noDate=Y"},{"name":"Crowne Plaza Times Square Manhattan","hotelRating":8.5,"foodRating":4,"starRating":4,"thumbnailUrl":"http://mobileimg.priceline.com/htlimg/40/40030/thumbnail-150-square.jpg","tourismRating":4,"transitRating":null,"url":"http://www.priceline.com/hotel/hotelOverviewGuide.do?numberOfRooms=1&from=rateSelectionDirect&propID=40030&noDate=Y"}];


function enter(){
	var input = $("#locationTextBox").val();
	$("#locationTextBox").val('');
	$("#locationTextBox").attr("placeholder","");

	
	var startPoint = $(".hotelInformation");
	var answer  = "";
	staticData.forEach(function(elem, index){
		console.log("here");
		var position = index % 2 === 0 ? 'even' : 'odd';
		answer = answer + "<div class="+ position+ ">";
		answer = answer + "<div class='col-md-2 "+ position +" listing hotelImage'>"+ "<a target='_blank' href='" + elem["url"] + "'><img class='theImg' src='" + elem["thumbnailUrl"] + "' /></a>"  + "</div>"
		answer = answer + "<div class='col-md-8 " + position +" listing hotelInfo'><h4>" + elem["name"] + "</h4>";
        answer = answer + "<div class='food'><img src='./static-assets/images/food.png' alt='food' style='width:40px;height:40px;'>" +"<span>    "+ elem["foodRating"]+"</span>"+"</div>";
        answer = answer + "<div class='transit'><img src='./static-assets/images/transport.png' alt='food' style='width:40px;height:40px;'>" +"<span>    "+ elem["transitRating"]+"</span>"+"</div>";
        answer = answer + "<div class='tourism'><img src='./static-assets/images/tourism.png' alt='food' style='width:40px;height:40px;'>" +"<span>    "+ elem["tourismRating"]+"</span>"+"</div>";
        answer = answer + "</div>"
        answer = answer + "<div class='col-md-2 even listing details'>" + "<a target='_blank'  href='" + elem["url"] + "'>Details</a>" + "</div>";
        answer = answer + "</div>"
	});
	startPoint.append(answer);


	//if (parseInt(input,10) === NaN){
		//assume a city input
		//do some loop to check
	//} else {
		//assume it is a zip
		//do some loop to check
		//assume we get back an array
		//manipulate dom to show the right information
	//}
}

$("#submissionButton").on("click", enter);
$(document).keypress(function(e) {
    if(e.which === 13 || e.keyCode === 13) {
    	e.preventDefault();
        enter();
    }
});
