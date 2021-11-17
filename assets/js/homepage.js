var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user){

    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // Reformat response
    fetch(apiUrl).then(function(response) {
        if (response.ok) { // Error Handling
            response.json().then(function(data) {
                // Display repos
                displayRepos(data,user);
                
            });
            
        } else { // IF there is an error
            alert("Error: GitHub User Not Found");
        }      
    }).catch(function(error){ // Catching other error issues
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to Github")
    });
}


var formSubmitHandler = function(event){
    event.preventDefault();

    var username = nameInputEl.value.trim();
    if (username){
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a Github Username");
    }
    console.log(event);
}


var displayRepos = function(repos, searchTerm){

    // Clear old data from container and span
    repoSearchTerm.textContent = "";
    repoContainerEl.textContent = "";

    // Check if user has any repos
    if (repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // For each repo
    for(r of repos){ 
        // Repo Name
        var repoName = r.owner.login + "/" + r.name;

        // Create a container element
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName); // Relative path query parameters

        // Create span element
        var repoTitleEl = document.createElement("span");
        repoTitleEl.textContent = repoName;setInterval

        // Create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // Check if current repo has issues or not
        if (r.open_issues_count > 0){
            // Add Issues icon
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + r.open_issues_count + " issue(s)";
        } else {
            // add no issues icon
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // Add span to repo container and then to repo list container
        repoEl.append(repoTitleEl);
        repoEl.append(statusEl);
        repoContainerEl.append(repoEl);

    }
}
// Form submit Listener
userFormEl.addEventListener("submit", formSubmitHandler);

//testing
//getUserRepos("octocat");
//getUserRepos("fchoi1");
