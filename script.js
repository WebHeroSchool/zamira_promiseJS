window.setTimeout(function(){
  const body = document.body;
  let url = "https://api.github.com/users/zamira-r";

  const date = new Date();
  let currentDate = `0${date.getDate()}.`.slice(-3)+`.0${date.getMonth()+1}`.slice(-2)+`.${date.getFullYear()}`;
  const getDate = new Promise((resolve, reject) => {
    setTimeout(() => currentDate ? resolve(currentDate) : reject("Ошибка"), 100)
  })
  const getUrl = new Promise((resolve, reject) => {
    setTimeout(() => url ? resolve(url) : reject("Ошибка URL"), 100)
  })

  Promise.all([getDate, getUrl])
    .then(([currentDate, url]) => fetch(url))
    .then(res => res.json())
    .then(json => {

      let photo = new Image();
      photo.src = json.avatar_url;
      body.append(photo);

      let wrapper = document.createElement("div");
      body.append(wrapper);

      let name = document.createElement('h1');
      if (json.name != null){
        name.innerHTML = json.name;
      } else {
        name.innerHTML = "Имя не указано"
      }
      wrapper.append(name);
      name.addEventListener("click", () => window.location = json.html_url);

      let bio = document.createElement('p');
      if (json.bio!=null){
        bio.innerHTML = json.bio;
      } else {
        bio.innerHTML = "Информация о пользователе недоступна";
      }
      wrapper.append(bio);
      wrapper.append(currentDate);
    })

    .catch(err => console.log("Информация о пользователе недоступна"));
    let preloader = document.getElementById("preloader");
    preloader.style.display = "none";
}, 3000)
