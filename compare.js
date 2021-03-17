//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  // console.log(`Test:************ + ${allEpisodes}`);

  let container = document.querySelector(".container");
  for (eachEpisode of allEpisodes) {
    let episodesName = document.createElement("h1");
    let episodesSeason = document.createElement("h1");
    // console.log("Episode Name:" + eachEpisode.name);
    // console.log("Season: " + eachEpisode.season);
    // console.log("Episode: " + eachEpisode.number);
    // console.log(`Image Address: ${eachEpisode.image.medium}`);
    // console.log(`Summery: ${eachEpisode.summary}`);
    episodesName.innerHTML = eachEpisode.name;
    episodesSeason.innerHTML = eachEpisode.season;
    container.append(episodesName, episodesSeason);
  }
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerText = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
