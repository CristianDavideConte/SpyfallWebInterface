const language = self.location.toString().split("?lan=")[1];												//Uses the worker script's location to get the language's folder prefix
const rolesAndScenariesFolderUrl = "../text files/languageDependents/" + language + "/";					//Build the path for the folder which contains the correct roles.txt and scenaries.txt files

var roles;																									//An array of strings which are formatted like "id:role"
var scenaries;																								//An array of strings which are formatted like "id:scenary"

fetch(rolesAndScenariesFolderUrl + "roles/roles.txt")
.then(response => response.text())
.then(text => {
	roles = text.toString().split("\n");
	roles[roles.length] = "roles";
	postMessage(roles);
})
.catch(error => {
	console.error("An error occurred while fetching roles: ", error);
});

fetch(rolesAndScenariesFolderUrl + "scenaries/scenaries.txt")
.then(response => response.text())
.then(text => {
	scenaries = text.toString().split("\n");
	scenaries[scenaries.length] = "scenaries";
	postMessage(scenaries);
})
.catch(error => {
	console.error("An error occurred while fetching scenaries: ", error);
});