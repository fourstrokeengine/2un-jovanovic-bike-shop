
function initMultiSelect(targetId, buttonClass, nonSelectedText, searchText, numDisplay, marginTop, minHeight, maxHeight, minWidth, enableHideList, clickOnInit) {
//	alert("targetId: [" + targetId + "], buttonClass: [" + buttonClass + "], nonSelectedText: [" + nonSelectedText + "], searchText: [" + searchText + 
//			"], numDisplay: [" + numDisplay + ", marginTo: [" + marginTop + "], minHeight:  [" + minHeight + "], maxHeight: [" + maxHeight + 
//			"], minWidth: [" + minWidth + "], enableHideList: [" + enableHideList + "], clickOnInit: [" + clickOnInit + "]");
//	targetId: current object id
//	buttonClass: The buton classes
//	nonSelectedText: Text shwon when no data exist
//	searchText: Text placeholder on search field 
//	numDisplay: Rows displayed
//	marginTop: margin-top of list container
//	minHeight: mi-height of list container
//	maxHeight: max-height of list container
//	minWidth: min-width of list container
//	enableHideList: Enable hide list
//	clickOnInit: Click on init
	
//	to set the list permantely open, set enableHideList = false , clickOnInit = true
	
	$(targetId).multiselect({
		numberDisplayed: numDisplay,
        buttonTitle: function(options, select) {
	        var selected = '';
	        options.each(function () {
	          selected += $(this).text() + ', ';
	        });
	        return selected.substr(0, selected.length - 2);
	    },
	    
		buttonText: function(options, select) {
		    if (options.length == 0) {
		      return nonSelectedText;
		    }
		    else {
		      if (options.length > this.numberDisplayed) {
		        return options.length + ' ' + this.nSelectedText;
		      }
		      else {
		        var selected = '';
		        options.each(function() {
// 			      var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).text();
// 				  I changed $(this).html() to $(this).text() to dispaly & and other chars as is
		          var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).text();
		
		          selected += label + ', ';
		        });
		        return selected.substr(0, selected.length - 2);
		      }
		    }
		  },
		onDropdownHide: function(event) {
			return enableHideList;
		},
  
        onDropdownShow: function(event) {
        	this.$filter.find('.multiselect-search').focus();
        },

        onInitialized:function($select, $container) {
        	if (clickOnInit) {	
        		$('.dropdown-toggle').trigger('click');
//        		this.find('.dropdown-toggle').trigger('click');
//        		$(targetId).find('.dropdown-toggle').trigger('click');
        	}
        	if (marginTop != 0) {
        		$('.multiselect-container').css({'margin-top': marginTop});
        	}
        	if (minHeight > 0) {
        		$('.multiselect-container').css({'min-height': minHeight});
//        		$(targetId).children('.multiselect-container').css({'min-height': minHeight});
        	}
        	if (minWidth > 0) {
        		$('.multiselect-container').css({'min-width': minWidth});
//        		$(targetId).children('.multiselect-container').css({'min-width': minWidth});
        	}
        },
        
        buttonClass: buttonClass,
	    maxHeight: maxHeight,
	    includeSelectAllOption: true,
	    enableFiltering: true,
	    filterPlaceholder: searchText,
	    enableCaseInsensitiveFiltering: true,
	    enableClickableOptGroups: true
	});

};