// Gør Logoet til en hjemknap

document.getElementById("logo");

addEventListener("click", Home);

function Home() {
  window.location.href = "index.html";
  console.log("home")
}
