async function getData() {
  let res = await fetch("./js/birdsData.json");

  if (!res) {
    throw new Error(`Could not fetch ${url}. Status: ${url.status}.`);
  }

  return await res.json();
}

const audioSong = document.querySelector(".question__audio");

const types = document.querySelectorAll(".types__list-item");
const scoreText = document.querySelector(".header__score-count");
const questionImage = document.querySelector(".question__image img");
const answerLists = document.querySelectorAll(".answers__list");
const nextButton = document.querySelector(".answers__next");
const aboutMistake = document.querySelector(".answers__about p");
const aboutCorrect = document.querySelector(".answers__about-full");
const aboutImage = document.querySelector(".answers__about-full--img img");
const aboutName = document.querySelector(".answers__about-full--name");
const aboutSubname = document.querySelector(".answers__about-full--subname");
const aboutAudio = document.querySelector(".answers__about-full--audio");
const aboutDescription = document.querySelector(".answers__about-full--long");
const correctImage = document.querySelector(".question__image img");
const correctName = document.querySelector(".question__bird-name");

let answerItems;
let currentCircle;

let score = 0;
let currentScore = 0;
let count = 0;

getData().then((res) => {
  renderQuestions(res);

  return true;
});

function renderQuestions(res) {
  const randomNumber = Math.floor(Math.random() * 6 + 1);
  answerItems = answerLists[count].querySelectorAll(".answers__item button");
  currentCircle = answerLists[count].querySelectorAll(".answers__btn span");
  res[count].map((item, i) => {
    if (item.id === randomNumber) {
      audioSong.src = item.audio;
      answerItems[i].addEventListener("click", () => {
        checkCurrentAnswer(item, answerItems[i], currentCircle[i]);
        switch (currentScore) {
          case 1:
            score = score + 5;
            break;
          case 2:
            score = score + 4;
            break;
          case 3:
            score = score + 3;
            break;
          case 4:
            score = score + 2;
            break;
          case 5:
            score = score + 1;
            break;
          case 6:
            score = score + 0;
            break;
          default:
            break;
        }
      });
    }
    if (item.id !== randomNumber) {
      answerItems[i].addEventListener("click", () => {
        currentScore++;
        currentCircle[i].classList.add("incorrect");
      });
    }
    answerItems[i].addEventListener("click", () => {
      showAbout(item);
    });
  });
}

function showAbout(item) {
  aboutImage.src = item.image;
  aboutName.textContent = item.name;
  aboutSubname.textContent = item.species;
  aboutAudio.src = item.audio;
  aboutDescription.textContent = item.description;
  aboutMistake.classList.add("hidden");
  aboutCorrect.classList.remove("hidden");
}

function resetAbout() {
  aboutMistake.classList.remove("hidden");
  aboutCorrect.classList.add("hidden");
  correctImage.src = "../img/shadow-bird.jpg";
  correctName.textContent = "******";
}

function checkCurrentAnswer(item, answer, correct) {
  if (item.name === answer.textContent) {
    correct.classList.add("correct");
    correctImage.src = item.image;
    correctName.textContent = item.name;

    nextButton.disabled = false;
  }
}

nextButton.addEventListener("click", () => {
  answerLists[count].classList.remove("active");
  types[count].classList.remove("active");
  count++;
  answerLists[count].classList.add("active");
  console.log(score);
  scoreText.textContent = score;
  currentScore = 1;
  getData().then((res) => {
    renderQuestions(res);

    return true;
  });
  types[count].classList.add("active");
  resetAbout();
  nextButton.disabled = true;
});
