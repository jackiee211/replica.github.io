const userName = sessionStorage.getItem('userName');


if (userName) {
    let userDisplay = document.getElementById("welcome-message");
    let userIcon = document.getElementById("user-icon");
    let userIcon2 = document.getElementById("user-icon2");
    let userIcon3 = document.getElementById("user-icon3");
    userDisplay.innerHTML = `
    <img src="images/${userName}.png" alt="user" class="rounded-circle d-lg-block" width="24px" height="24px">
    <div class="dropdown">
              <button class="btn btn-light border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${userName}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">profile</a></li>
                <li><a class="dropdown-item" href="#" id="logoutBtn">Log out</a></li>
              </ul>
            </div>
    `;
    userIcon.innerHTML = `
    <img src="images/${userName}.png" alt="user" class="rounded-circle d-lg-block" width="24px" height="24px">
    `;
    userIcon2.innerHTML = `
    <img src="images/${userName}.png" alt="user" class="rounded-circle d-lg-block" width="64px" height="64px">
    `;
    userIcon3.innerHTML = `
    <img src="images/${userName}.png" alt="user" class="rounded-circle d-lg-block" width="64px" height="64px">
    `;
} else {
    location.href = "./index.html";
}

const logoutBtn = document.getElementById("logoutBtn");


logoutBtn.addEventListener('click', function() {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userPassword');
    sessionStorage.removeItem('userName');
    location.href = './index.html';
});

const container = document.querySelector(".posts-container");
const trigger = document.querySelector(".pagination-trigger");
let page = 1;
let limit = 1;



async function fetchItems(page, limit) {
  const skip = (page - 1) * limit;
  const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  const data = await response.json();
  return data.posts;
}

function renderItems(items) {
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "w-100";
    div.innerHTML = `
              <div class="card-body pt-4 border-bottom">
                  <div class="d-flex align-items-start mb-3">
                      <img src="images/${userName}.png" alt="Profile" class="rounded-circle" width="50" height="50">
                      <div class="ms-3">
                          <h6 class="mb-0 text-start">${userName}</h6>
                          <p class="text-muted small mb-0">Python Engineer at Google</p>
                      </div>
                      <div class="ms-auto">
                          <button class="btn btn-light border-0"><i class="fa-solid fa-ellipsis"></i></button>
                      </div>
                  </div>
      
                  <p class="mb-3 text-start">${item.body}</p>
                  
                  <img src="https://codetheweb.blog/assets/img/posts/css-advanced-background-images/mountains.jpg" alt="Post Image" class="img-fluid rounded mb-3">

                  <div class="d-flex row flex-wrap justify-content-between border-top pt-2">
                      <button class="btn btn-light d-flex align-items-center justify-content-center col-3">
                          <i class="fa-regular fa-thumbs-up me-2"></i> Like
                      </button>
                      <button class="btn btn-light  d-flex align-items-center justify-content-center col-3">
                          <i class="fa-regular fa-comment me-2"></i> Comment
                      </button>
                      <button class="btn btn-light  d-flex align-items-center justify-content-center col-3">
                          <i class="fa-solid fa-share me-2"></i> Share
                      </button>
                      <button class="btn btn-light  d-flex align-items-center justify-content-center col-3">
                          <i class="fa-solid fa-retweet me-2"></i> Repost
                      </button>
              </div>`;
    container.appendChild(div);
  });
}


async function loadMoreItems() {
  const items = await fetchItems(page, limit);
  renderItems(items);
  page++;
}

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadMoreItems();
  }
});

observer.observe(trigger);


loadMoreItems();

async function loadMoreItems() {
    trigger.textContent = "Loading...";
    const items = await fetchItems(page, limit);
    renderItems(items);
    page++;
    trigger.textContent = "";
  }