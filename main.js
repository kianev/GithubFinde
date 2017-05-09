$(document).ready(function () {
    $("#searchUser").on("keyup", function (e) {
        let userName = e.target.value;

        $.ajax({
            url: "https://api.github.com/users/" + userName,
            data: {
                client_id: "5fe92ba5eef67470fc8b",
                client_secret: "6595bb5004f5ebc9e81af3bf8e665e51285c5088"
            }
        }).done(function (user) {
            $.ajax({
                url: "https://api.github.com/users/" + userName + "/repos",
                data: {
                    client_id: "5fe92ba5eef67470fc8b",
                    client_secret: "6595bb5004f5ebc9e81af3bf8e665e51285c5088",
                    sort: "created: asc",
                    per_page: 5
                }
            }).done(function (repos) {
                $.each(repos,function (index,repo) {
                    $("#repos").append(`
                             <div class="well">
                        <div class="row">
                            <div class="col-md-7">
                              <strong>${repo.name}</strong>: ${repo.description}
                            </div>
                            <div class="col-md-3">
                             <span class="label label-default">Forks: ${repo.forks_count}</span>
                             <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                             <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                            </div>
                            <br>
                            <div class="col-md-2">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                            </div>
                        </div>
                    </div>
                   `)
                })
            });
            $("#profile").html(`
             <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                </div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-md-3">
                        <img class="tumbnail avatar" src="${user.avatar_url}"><br><br>
                        <a target="_blank" class="btn btn-info btn-block" href="${user.html_url}">View Profile</a>
                    </div>
                    <br>
                    <div class="col-md-9">
                        <span class="label label-default">Public Repos: ${user.public_repos}</span>
                        <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                        <span class="label label-success">Followers: ${user.followers}</span>
                        <span class="label label-info">Following: ${user.following}</span>
                        <br><br>
                       <ul class="list-group">
                          <li class="list-group-item">Company: ${user.company}</li>
                          <li class="list-group-item">Website/Blog: ${user.blog}</li>
                          <li class="list-group-item">Location: ${user.location}</li>
                          <li class="list-group-item">Member since: ${user.created_at}</li>
                       </ul>
                    
                    </div> 
                   </div>
                </div>
            </div>
             <h3 class="page-header">Latest Repos</h3>
             <div id="repos"></div>
             `)
        })
    })
});

