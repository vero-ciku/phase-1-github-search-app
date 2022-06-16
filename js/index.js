document.addEventListener("DOMContentLoaded", () => {
    logInput()
  });
  
  
  function logInput(){
    document.querySelector("#github-form").addEventListener("submit", (event) => {
        event.preventDefault()
        userName = document.querySelector("#search").value
  
        getUser(userName)
    });
  }
  
  
  function getUser(userName){
    fetch(`https://api.github.com/users/${userName}`)
        .then(resp => resp.json())
        .then(json => getInfo(json))
  }
  
  function getInfo(json){
    const div = document.querySelector("#user-list")
  
    const h2 = document.createElement("h2")
    h2.innerText = `${json.login}`
  
    const img = document.createElement("img")
    img.setAttribute("src", `${json.avatar_url}`)
  
    const a = document.createElement("a");
    a.setAttribute("target", "_blank")
    a.setAttribute("href", `https://github.com/${json.login}`)
    a.innerText = img
  
    const p = document.createElement("p")
    p.innerText = "Click the Repository button to access the Repositories."
  
    const p2 = document.createElement("p")
    p2.innerText = `https://api.github.com/users/${userName}/repos`
  
    const btn = document.createElement("button")
    btn.setAttribute("id", `${json.login}`)
    btn.innerText = "Repository"
  
    btn.addEventListener("click", () => {
      fetch(`https://api.github.com/users/${json.login}/repos`)
        .then(resp => resp.json())
        .then(json => getRepos(json))
  })
  
  const card = document.createElement("div");
  card.append(h2, img, p, p2, btn);
  
  div.appendChild(card);
  }
  
  
  function getRepos(json){
    const div2 = document.querySelector("#repos-list")
    repositoryNames = []
    for (const info of json) {
      const p = document.createElement("p")
      p.innerText = (info.name)
      div2.append(p)
    }
  }