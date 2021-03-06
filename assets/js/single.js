var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoIssues = function(repo){
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; // Sort in ascending order
    
    fetch(apiURL).then(function(response){
        
        if(response.ok){
            // check if api has paginated issues
            if (response.headers.get("Link")) {
                displayWarning(repo); // See more issues on github if 30+
            }
            return response.json(); // Return then call the then function again
        }else{
            document.location.replace("./index.html"); // redirect to main page
        }

    }).then(function(data){
        // Create elements
        displayIssues(data);
    }).catch(function(error){
        document.location.replace("./index.html"); // redirect to main page
    });
}

var displayIssues = function(issues){
    // Check for empty issues
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    // Create issue element
    for (issue of issues){
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issue.html_url); // set links to html
        issueEl.setAttribute("target", "_blank"); // ??

        // Issue Title element
        var titleEl = document.createElement("span");
        titleEl.textContent = issue.title;


        // Create a type element
        var typeEl = document.createElement("span");

        // Check if issue is a pull request
        if (issue.pull_request){
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        //Append to issue element
        issueEl.appendChild(titleEl);
        issueEl.appendChild(typeEl);
        // Append to container
        issueContainerEl.appendChild(issueEl);
    }
}

var displayWarning = function(repo){
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
}

var getRepoName = function(){
    var queryString = document.location.search; // Query parameter
    var repoName = queryString.split("=")[1]; // Get the second index in the split string
    if(repoName) { // Check valid repo name, if not redirect to main page
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    } else {
        document.location.replace("./index.html"); // redirect to main page
    }
    
}

getRepoName();

//getRepoIssues("facebook/react");
//getRepoIssues("fchoi1/git-it-done");
//getRepoIssues("angular/angular");
