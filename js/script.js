const overview = document.querySelector(".overview");  //profile information
const username = "AnnaVN";
const repoList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const fetchUserInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  // console.log(data);
  displayUserInfo(data);
};

fetchUserInfo();

const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
  overview.append(div);
  fetchRepos();
};



const fetchRepos = async function () {
  const responce = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const dataR = await responce.json();
  repoInfoDisplay(dataR);
};



const repoInfoDisplay = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const item = document.createElement("li");
    item.classList.add("repo");
    item.innerHTML = `<h3>${repo.name} </h3>`;
    repoList.append(item);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const getInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await getInfo.json();

  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  const languages = [];
  for (const lang in languageData) {
    languages.push(lang);
  }

  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  viewReposButton.classList.remove("hide");
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  allRepos.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(div);
  
};

viewReposButton.addEventListener("click", function () {
  allRepos.classList.remove("hide");
  repoData.classList.add("hide");
  this.classList.add("hide");
});

filterInput.addEventListener("input", function (e){
  const valueSearchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowerValueSearchText = valueSearchText.toLowerCase();

  for (const item of repos){
    const lowercaseValue = item.innerText.toLowerCase();

    if (lowercaseValue.includes(lowerValueSearchText)){
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  }
});