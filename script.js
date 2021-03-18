let rootElem = document.getElementById("root");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  for (let episode of episodeList) {
    let episodeContainer = document.createElement("section");
    episodeContainer.className = " col-4";

    let title = document.createElement("h4");
    let seasonEpisodeNumber= document.createElement("h5")
    if (episode.season.length > 1) {
      let seasonNumber = `S${episode.season}`;
    } else {
      seasonNumber = `S0${episode.season}`;
    }
    if (episode.number.length > 1) {
      let episodeNumber = `E${episode.number}`;
    } else {
      episodeNumber = `E0${episode.number}`;
    }

    title.innerText = `${episode.name}`;
    seasonEpisodeNumber.innerText = `${seasonNumber}${episodeNumber}`;

    let div = document.createElement("div");
    let image = document.createElement("img");
    image.src = episode.image.medium;
    div.appendChild(image);

    let episodeSummary = document.createElement("section");
    episodeSummary.innerHTML = `${episode.summary}`;
    episodeContainer.append(title,seasonEpisodeNumber, image, episodeSummary);
    rootElem.append(episodeContainer);
  }
}

window.onload = setup;
