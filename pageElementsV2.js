/*
 *  Generator for Geb Spock
 *
 *	Fetches ids of desired elements on page
 *	Generates element definitions
 *	Generates filling inputs
 *	Generates assertions
 */
(function() {
	var elements = $("p, :input, a"); // elements to look for
	var attr = "id";       // elements attribute to be used

	var newLines = "\n\n";
	var output = newLines;

    var pageObjects = "";
    var fillInputs = "";
    var assertions = "";

	// store attributes of all elements in an array
	for (var i = 0; i < elements.length; i++) {
        
        var element = elements[i];
    	var eleAttr = element.getAttribute(attr);
    	
        if (eleAttr) {
            
            // page objects
            pageObjects += eleAttr + ucFirstChar($(element).prop("tagName").toLowerCase()) + " { $(\"#" + eleAttr + "\") }\n";

            // fill inputs
            if (eleAttr.toLowerCase().indexOf('select') > -1)
                fillInputs += "select(" + eleAttr + ", model.get" + ucFirstChar(eleAttr)+ "())\n";
            else if (eleAttr.toLowerCase().indexOf('date') > -1)
                fillInputs += "type(" + eleAttr + ", AHPHelper.formatDate(model.get" + ucFirstChar(eleAttr)+ "()))\n";
            else
                fillInputs += "type(" + eleAttr + ", model.get" + ucFirstChar(eleAttr)+ "())\n";

            // assertions
            if (eleAttr.toLowerCase().indexOf('date') > -1)
                assertions += "assertThat(\""+ eleAttr +" did not match\", " + eleAttr + ".text(), equalTo(AHPHelper.formatDate(model.get" + ucFirstChar(eleAttr) +"())))\n";
            else
                assertions += "assertThat(\""+ eleAttr + " did not match\", " + eleAttr + ".text(), equalTo(model.get" + ucFirstChar(eleAttr) +"()))\n";
        }
    }

    output += pageObjects + newLines + fillInputs + newLines + assertions;
    console.log(output);
})();

/*
 * Method to convert First alphabet of String to uppercase
 */
function ucFirstChar(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}