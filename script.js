let container = document.getElementById("root");
let searchContainer = document.getElementById("search-container");

console.log(container);
console.log(searchContainer);

function setup() {
  addSearch();
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  let rowMainElem = document.createElement("section");
  rowMainElem.classList.add("row");

  for (let episode of episodeList) {
    let episodeContainer = document.createElement("div");
    episodeContainer.classList.add("col-4");

    let title = document.createElement("h4");
    let seasonEpisodeNumber = document.createElement("h5");

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

    let imageDiv = document.createElement("div");
    let image = document.createElement("img");
    image.src = episode.image.medium;
    imageDiv.appendChild(image);

    let episodeSummary = document.createElement("div");
    episodeSummary.innerHTML = `${episode.summary}`;
    episodeContainer.append(title, seasonEpisodeNumber, image, episodeSummary);
    rowMainElem.appendChild(episodeContainer);
  }
  container.appendChild(rowMainElem);
}

function addSearch() {
  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.placeholder = "Search";

  searchContainer.appendChild(searchInput);
  let searchResult = document.createElement("div");
  searchResult.classList.add("search-result");

  searchInput.addEventListener("keyup", (event) => {
    let searchString = event.target.value.toLowerCase();
    const allEpisodes = getAllEpisodes();
    let filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(searchString) ||
        episode.summary.toLowerCase().includes(searchString)
      );
    });
    searchResult.innerHTML = `Displaying ${filteredEpisodes.length}/${allEpisodes.length}`;
    searchContainer.appendChild(searchResult);

    let rowMainElem = document.querySelector("section");
    rowMainElem.remove();
    makePageForEpisodes(filteredEpisodes);
  });
}

window.onload = setup;
