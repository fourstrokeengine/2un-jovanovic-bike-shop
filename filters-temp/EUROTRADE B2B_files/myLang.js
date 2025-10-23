// ********************************************
// **** $(document).ready(function  BEGINS ****
// ********************************************
$(document).ready(function () {
	$( ".popClass" ).popover({ trigger: "hover" }); 
	// *** Drop Down with CSS and jQuery ***

	// http://www.jankoatwarpspeed.com/reinventing-a-drop-down-with-css-and-jquery/
	
	// Demo HTML structure
	// DL : Definition List element.
	// DT : Definition Term
	// DD : Definition Definition
	/*
	 <dl class="dropdown">
	    <dt><a href="#"><span>Please select the country</span></a></dt>
		    <dd>
		        <ul>
		            <li><a href="#">Brazil</a></li>
		        </ul>
	        </dd>
    </dl>
    */
    
	// Each click on DT (actually link inside DT) will toggle nested UL.
	$(".dropdown dt a").click(function() {
	    $(".dropdown dd ul").toggle();
	});
	
	// When you choose an option from the list (UL) it become selected option and is shown inside the link in DT.
	// The function below replaces the HTML of currently selected item with the inner HTML of clicked link. 
	// At the end, it hides nested UL.
	$(".dropdown dd ul li a").click(function() {
	    var text = $(this).html();
	    $(".dropdown dt a span").html(text);
	    $(".dropdown dd ul").hide();
	    //thanos
	    var text1 = $(".dropdown dt a p.value").text();
//	    alert("you clicked : " + text1);
	    window.location.replace("/i18n.html?locale=" + text1);

	}); 

	// checks each click on a page 
	// and if click occurred on some elements outside the dropdown 
	// it hides nested UL
	$(document).bind('click', function(e) {
	    var $clicked = $(e.target);
	    if (! $clicked.parents().hasClass("dropdown"))
	        $(".dropdown dd ul").hide();
	});
	
/*	function getSelectedValue(id) {
	    return $("#" + id).find("dt a span.value").html();
	}*/

	$(".fadeOutbox").click(function () {
	   $(this).fadeOut('slow');
	});

	$(".fadeInbox").click(function () {
	   $(this).hide().fadeIn(2000);
	});

	$(".fadeTobox").click(function () {
	   $(this).fadeTo('fast',0.2);
	});

//	select items
	$(".js-basic-single").select2({
		  theme: "classic"
	});
	
	$(".js-basic-multiple").select2();
	
//	===========================================================================================
	
//	Select2 in Tabs of Bootstap Modal doing AJAX Call , not working as expected
//	https://github.com/select2/select2/issues/1436
	$.fn.modal.Constructor.prototype.enforceFocus = function() {};

// ============================================================================================
	
	$('.add-to-cart').click(function() {
		   var shoppingCart = document.getElementById("shopping-cart-icon");
		    if (shoppingCart) {
		        $(shoppingCart).animate({
		            opacity: '0.1'            
		        });
		        $(shoppingCart).animate({
		            opacity: '1'	            
		        });
		    }
		    return true;
		});
//  email validator
	function isValidEmailAddress(emailAddress) {
	    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	    return pattern.test(emailAddress);
	};
	
	cursor_wait = function()
	{
	    // switch to cursor wait for the current element over
	    var elements = $(':hover');
	    if (elements.length)
	    {
	        // get the last element which is the one on top
	        elements.last().addClass('cursor-wait');
	    }
	    // use .off() and a unique event name to avoid duplicates
	    $('html').
	    off('mouseover.cursorwait').
	    on('mouseover.cursorwait', function(e)
	    {
	        // switch to cursor wait for all elements you'll be over
	        $(e.target).addClass('cursor-wait');
	    });
	};

	remove_cursor_wait = function()
	{
	    $('html').off('mouseover.cursorwait'); // remove event handler
	    $('.cursor-wait').removeClass('cursor-wait'); // get back to default
	};
	
	$(".triState").click(function(event) {
//	 	alert("got it! : " + event.target.id);
//		var cb = document.getElementById(event.target.id);
		var cb = event.target;
		if (cb.readOnly) cb.checked=cb.readOnly=false;
		else if (!cb.checked) cb.readOnly=cb.indeterminate=true;

	});
	
});

//********************************************
// **** $(document).ready(function  ENDS ****
//********************************************

//Validates that the input string is a valid date formatted as "dd-mm-yyyy"
function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)){
//         alert("test 1");
    	return false;   	
    }
 
    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12) {
//         alert("test 2");
    	return false;   	
    }
 
    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

/*function isValidTime(timeString)
{
	// regular expression to match required time format
	re = /^(\d{1,2}):(\d{2})([ap]m)?$/;
	
	if(timeString != '') {
		  if(regs = timeString.match(re)) {
			if(regs[3]) {
									  // 12-hour value between 1 and 12
									  if(regs[1] < 1 || regs[1] > 12) {
									    alert("Invalid value for hours: " + regs[1]);
									    return false;
									  }
			} else {
									  // 24-hour value between 0 and 23
									  if(regs[1] > 23) {
									    alert("Invalid value for hours: " + regs[1]);
									    return false;
									  }
			}
			// minute value between 0 and 59
			if(regs[2] > 59) {
			  alert("Invalid value for minutes: " + regs[2]);
			  return false;
			}
			  } else {
			    alert("Invalid time format: " + timeString);
			    return false;
			  }
	} 
	
	return true;
}*/

function isFutureDate(dateText) {
	// date is dd/mm/yyyy
//	alert("date to split : [" + dateText + "]")
    var inputDate = dateText.split("/");
    var today = new Date();
    inputDate = new Date(inputDate[2], inputDate[1] - 1, inputDate[0], 0, 0, 0, 0);
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    return inputDate > today;
};

function compareToday(dateText) {
	// date is dd/mm/yyyy
//	alert("date to split : [" + dateText + "]")
	var retVal = 0;
    var inputDate = dateText.split("/");
    var today = new Date();
    inputDate = new Date(inputDate[2], inputDate[1] - 1, inputDate[0], 0, 0, 0, 0);
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    if (inputDate > today) {
    	retVal = 1;
    } else if (inputDate < today) {
    	retVal = -1;
    } else {
    	retVal = 0;
   }
    return retVal;
};

function toDate(dateText) {
	// date is dd/mm/yyyy
	alert("date to split : [" + dateText + "]")
    var inputDate = dateText.split("/");
    inputDate = new Date(inputDate[2], inputDate[1] - 1, inputDate[0], 0, 0, 0, 0);
    return inputDate;
};

function isValidTime(timeString)
{
  var errorMsg = "";

  // regular expression to match required time format
  re = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

  if(timeString != '') {
    if(regs = timeString.match(re)) {
      if(regs[4]) {
        // 12-hour time format with am/pm
        if(regs[1] < 1 || regs[1] > 12) {
          errorMsg = "Invalid value for hours: " + regs[1];
        }
      } else {
        // 24-hour time format
        if(regs[1] > 23) {
          errorMsg = "Invalid value for hours: " + regs[1];
        }
      }
      if(!errorMsg && regs[2] > 59) {
        errorMsg = "Invalid value for minutes: " + regs[2];
      }
    } else {
      errorMsg = "Invalid time format: " + timeString;
    }
  }

  if(errorMsg != "") {
    alert(errorMsg);
    return false;
  }

  return true;
};

function validatePhone(txtPhone) {
//	  alert("in validatePhone");
	  var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
	    if (txtPhone == "") {
	    	return true;
	    } else if (filter.test(txtPhone)) {
	        return true;
	    }
	    else {
	        return false;
	    }
};

function MyCopyVariableToCliboard(varToCopy) {
	  // Create a dummy input to copy the string array inside it
	  var dummy = document.createElement("input");

	  // Add it to the document
	  document.body.appendChild(dummy);

	  // Set its ID
	  dummy.setAttribute("id", "dummy_id");

	  // Output the variable value into it
	  document.getElementById("dummy_id").value = varToCopy;

	  // Select it
	  dummy.select();

	  // Copy its contents
	  document.execCommand("copy");

	  // Remove it as its not needed anymore
	  document.body.removeChild(dummy);
};
