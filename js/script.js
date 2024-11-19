const overview = document.querySelector(".overview");  //profile information
const username = "AnnaVN";
const repoList = document.querySelector(".repo-list");

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



const fetchRepos = async function (){
  const responce = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const dataR = await responce.json();
  repoInfoDisplay(dataR);
};



const repoInfoDisplay = function (repos){
  for (const repo of repos){
    const item = document.createElement("li");
    item.classList.add("repo");
    item.innerHTML = `<h3>${repo.name} </h3>`;
    repoList.append(item);
  }
};