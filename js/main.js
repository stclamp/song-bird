async function getData() {
  let res = await fetch("./js/birdsData.json");

  if (!res) {
    throw new Error(`Could not fetch ${url}. Status: ${url.status}.`);
  }

  return await res.json();
}

const audioSong = document.querySelector(".question__audio");

const randomNumber = Math.floor(Math.random() * 6 + 1);

getData().then((res) => {
  res[0].map((item, i) => {
    if (item.id === randomNumber) {
      audioSong.src = item.audio;
    }
  });
});
