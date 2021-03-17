let rootElem = document.getElementById("root");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  for (let episode of episodeList) {
    let episodeContainer = document.createElement("section");
    episodeContainer.className = "offset-md-1 col-md-3 ";

    let title = document.createElement("h4");
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

    title.innerText = `${episode.name} - ${seasonNumber}${episodeNumber}`;

    let image = document.createElement("img");
    image.src = episode.image.medium;

    let episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = `${episode.summary}`;
    episodeContainer.append(title, episodeSummary, image);
    rootElem.append(episodeContainer);
  }
  console.log(rootElem)
}

window.onload = setup;
