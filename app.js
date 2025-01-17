import fetchFollowers from "./fetchFollower.js";
import displayFollowers from "./displayFollowers.js";
import paginate from "./pagination.js";
import displayButtons from "./displayButtons.js";

// select elements
const title = document.querySelector(".section-title h1");
const btnContainer = document.querySelector(".btn-container");
console.log(btnContainer);

// displaybutton
let index = 0;
let pages = [];

const setupUI = () => {
  displayFollowers(pages[index]);
  displayButtons(btnContainer, pages, index);
};

// fetch-followers
const init = async () => {
  const followers = await fetchFollowers();
  // displayFollowers(paginate(followers)[0]);
  title.textContent = "pagination";

  pages = paginate(followers);
  console.log(pages);
  setupUI();
};

// clicking btn for pagination
btnContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-container")) return;
  if (e.target.classList.contains("page-btn")) {
    index = parseInt(e.target.dataset.index);
    console.log(index);
  }
  if (e.target.classList.contains("next-btn")) {
    index++;
    if (index > pages.length - 1) {
      index = 0;
    }
  }
  if (e.target.classList.contains("prev-btn")) {
    index--;
    if (index < 0) {
      index = pages.length - 1;
    }
  }
  setupUI();
});

window.addEventListener("load", init);
