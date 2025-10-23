
$(document).ready(function () {
//    ***** !!! ATTENTION !!! *****
//    THE STATEMENT BELOW DOES NOT WORK HERE,
//    BECAUSE THIS FILE (ajax.js) IS NOT DYNAMIC,
//    SO CAN NOT EVALUATE THIS : pageContext.request.contextPath
//	var appPath='${pageContext.request.contextPath}';
	
	var appPath = "/eltd-b2b";

	
	$(".modal-dialog").draggable({
	  cursor: "move",
	  handle: ".dragable_touch",
	});
	
    $("#moveFileBtn").click(function() {
//    	alert( "ooooo");
        $.get(appPath + "/application/ajax/movefile.html",function(data){

        });
    });

    $("#importCustomeraction").click(function(e){
//		alert( "ooooo");
        $.get(appPath + "/application/ajax/importCustomerAjax.html",function(data){
            $("#viewWs1Text").html(data);
        });
	});
	
	
/*    $("#importCustomerBtn").click(function() {
//    	alert( "ooooo");
        $.get(appPath + "/application/ajax/importCustomerAjax.html",function(data){
            $("#viewWs1Text").html(data);
        });
    });*/
    
    $("#doScheduledWorkBtn").click(function() {
//    	alert( "ooooo");
        $.get(appPath + "/application/ajax/doScheduledWorkAjax.html",function(data){
            $("#viewWs1Text").html(data);
        });
    });

    $("#FTP_TESTBtn").click(function() {
//    	alert( "ooooo");
        $.get("/upload/test.txt/file.html",function(data){
            $("#viewWs1Text").html(data);
        });
    });

    // claimPretitAdd.jsp : when select brand, show its category pairs 
	// *********** BEGIN ***********
	$( "#claimBrandId" ).change(function() {
	  	// clear fields
  	  	// $( "#claimProductCode" ).val('')
  	    // $( "#claimProductDescr" ).val('')
  	  	// $( "#claimModel" ).val('')
  	  	// $( "#claimModelDescr" ).val('')    	
    });
    // *********** END ***********
    
    //==========


});
  