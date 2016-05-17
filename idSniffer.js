function idSniffer() {
	
	var attr = "id"; // attribute to look for
	var elements = $(":input, a, button"); 	// search in elements

	var ids    	 = []; 	// store ids to track duplicate ids
	var missingCss   = {"border-style": "solid", "border-width": "5px", "border-color" : "red" }; // missing
	var duplicateCss = {"border-style": "solid", "border-width": "5px", "border-color" : "blue"}; // duplicate

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

(function() {
    var script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
    script.onload = script.onreadystatechange = function(){ idSniffer(); };
    document.body.appendChild( script );
})();