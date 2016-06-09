/*
 *  Generator for Geb Spock
 *
 *	Fetches ids of desired elements on page
 *	Generates element definitions
 *	Generates filling inputs
 *	Generates assertions
 */
(function() {
	var elements = $("p"); // elements to look for
	var attr = "id";       // elements attribute to be used
	var ids = [];          // array to store all element attributes

	var newLines = "\n\n";
	var output = newLines;

	// store attributes of all elements in an array
	for (var i = 0; i < elements.length; i++) {
    	var eleAttr = elements[i].getAttribute(attr);
    	if (eleAttr)
    		ids.push(eleAttr);
    }

    // generate element definitions
    for (var i = 0; i < ids.length; i++)
    	output += ids[i] + " { $(\"#" + ids[i] + "\") }\n";
    
    output += newLines;
    
    // generate filling input fields
    for (var i = 0; i < ids.length; i++)
    	if (ids[i].toLowerCase().indexOf('select') > -1)
    		output += "select(" + ids[i] + ", model.get" + ucFirstChar(ids[i])+ "())\n";
    	else
    	if (ids[i].toLowerCase().indexOf('date') > -1)
    		output += "type(" + ids[i] + ", AHPHelper.formatDate(model.get" + ucFirstChar(ids[i])+ "()))\n";
    	else
    		output += "type(" + ids[i] + ", model.get" + ucFirstChar(ids[i])+ "())\n";
    
    output += newLines;
    
    // generate assertion statements
    for (var i = 0; i < ids.length; i++) {
    	if (ids[i].toLowerCase().indexOf('date') > -1)
    		output += "assertThat(\""+ ids[i] +" did not match\", " + ids[i] + ".text(), equalTo(AHPHelper.formatDate(model.get" + ucFirstChar(ids[i]) +"())))\n";
    	else
    		output += "assertThat(\""+ ids[i] + " did not match\", " + ids[i] + ".text(), equalTo(model.get" + ucFirstChar(ids[i]) +"()))\n";
    }

    console.log(output);
})();

/*
 * Method to convert First alphabet of String to uppercase
 */
function ucFirstChar(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}