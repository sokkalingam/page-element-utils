// Execute idSniffer on Ctrl + Space
$(document).keydown(function(e) {
    var evtobj = window.event? event : e;
    if (evtobj.ctrlKey && evtobj.keyCode == 32)
        idSniffer();
});

/* Fetches elements on page
 * Scans for ids within element or within parent
 * Highlights elements with missing or duplicate ids
 */
function idSniffer() {

    console.log("Running id sniffer");
	
	var attr = "id"; // attribute to look for
	var elements = $(":input, a, button, p, toggle2, toggle3"); 	// elements to look for

	var ids    	 = []; 	// store ids to track duplicate ids
	var missingCss   = {"border-style": "solid", "border-width": "5px", "border-color" : "red" }; // border in red
	var duplicateCss = {"border-style": "solid", "border-width": "5px", "border-color" : "blue"}; // border in blue

    for (var i = 0; i < elements.length; i++) {
    	
    	var element 	  = elements[i];
    	var eleAttr       = elements[i].getAttribute(attr);
    	var parentElement = element.parentNode;
    	var parentEleAttr = parentElement.getAttribute(attr);
    	
    	if (eleAttr) {
    		if (ids.indexOf(eleAttr) < 0) {
    			ids.push(eleAttr);
    		} else {
    			$(element).css(duplicateCss);
    		}
    	}
    	else if (parentEleAttr) {
    		if (ids.indexOf(parentEleAttr) < 0) {
    			ids.push(parentEleAttr);
    		} else {
    			$(element).css(duplicateCss);
    		}
    	}
    	else {
    		$(element).css(missingCss);
    	}
    }

}

/*  This method runs on page load
 *  Injects Jquery
 *  Once Jquery is loaded, calls idSniffer
 */
function injectJquery() {
    var script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
    script.onload = script.onreadystatechange = function(){ idSniffer(); };
    document.body.appendChild( script );
}