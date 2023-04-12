/**
 * Get users
 */
function getUsers(){
  let request = new XMLHttpRequest()
  request.open("GET","https://jsonplaceholder.typicode.com/users");
  request.send();
  request.responseType = "json";
  request.onload = ()=>{
    if(request.readyState == 4 && request.status>=200 && request.status < 300){
      let users = request.response;
      for(user of users){
        let content = `
        <!-- USER -->
          <div onclick="activateUser(this)" class="user ${user.id==1?"active":""}" data-id = "${user.id}">
            <h3 class="user-name">${user.name}</h3>
            <span class="user-email">${user.email}</span>
          </div>
        <!-- // USER // -->
        `
        document.querySelector(".users").innerHTML+=content;
      }
    }
  }
}
getUsers();

/**
 * ON click user
*/
function activateUser(event){
  let users = document.querySelectorAll(".user");
  console.log(event);
  users.forEach((user)=>{
    user.classList.remove("active");
  })
  event.classList.add("active")
  let id = event.getAttribute("data-id");
  console.log(id)
  getUserPosts(id);
}

function getUserPosts(id){
  let request = new XMLHttpRequest();
request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${id}`);
request.send();
request.responseType = "json";
request.onload = ()=>{
  if(request.readyState == 4 && request.status >=200 && request.status < 300){
      let posts = request.response;
      document.querySelector(".posts").innerHTML = ""
      for(post of posts)
      {
        let content = `
      <!-- POST -->
      <div class="post ">
        <h3 class="post-title">${post.title}</h3>
        <p class="post-content">
          ${post.body}
        </p>
      </div>
      <!-- // POST //  -->
      `
        document.querySelector(".posts").innerHTML+=content;
        
      }
      
  }else{
    alert(request.status);
  }
}
}
getUserPosts(1)