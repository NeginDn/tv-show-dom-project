let container = document.getElementById("root");
let searchContainer = document.getElementById("search-container");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  episodeSelector(allEpisodes);
  searchBar();
}

function makePageForEpisodes(episodeList) {
  let rowMainElem = document.createElement("section");
  rowMainElem.classList.add("row");

  for (let episode of episodeList) {
    let episodeContainer = document.createElement("div");
    episodeContainer.classList.add("col-4");

    let title = document.createElement("h4");
    let seasonEpisodeNumber = document.createElement("h5");

    let imageDiv = document.createElement("div");
    let image = document.createElement("img");

    let episodeSummary = document.createElement("div");

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

    image.src = episode.image.medium;
    imageDiv.appendChild(image);

    episodeSummary.innerHTML = `${episode.summary}`;
    episodeContainer.append(title, seasonEpisodeNumber, image, episodeSummary);
    rowMainElem.appendChild(episodeContainer);
  }
  container.appendChild(rowMainElem);
}

function searchBar() {
  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.placeholder = "Search for Episode";

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

function episodeSelector() {
  let episodeList = getAllEpisodes();
  let select = document.createElement("select");
  select.id = "selectEpisode";
  let defaultOption = document.createElement("option");
  defaultOption.innerHTML = "Choose Episode";
  select.appendChild(defaultOption);
  select.innerHTML = "";

  for (let episode of episodeList) {
    let option = document.createElement("option");
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
    let seasonEpisodeNumber = `${seasonNumber}${episodeNumber}`;
    option.innerHTML = `${seasonEpisodeNumber}- ${episode.name}`;
    option.value = episode.id;
    select.appendChild(option);
  }
  searchContainer.appendChild(select);

  let searchResult = document.createElement("div");
  searchResult.classList.add("search-result");

  select.addEventListener("change", (event) => {
    let filteredEpisodes = episodeList.filter((episode) => {
      return episode.id == event.currentTarget.value;
    });
    searchResult.innerHTML = `Displaying ${filteredEpisodes.length}/${episodeList.length}`;
    searchContainer.appendChild(searchResult);

    let rowMainElem = document.querySelector("section");
    rowMainElem.remove();
    makePageForEpisodes(filteredEpisodes);
  });
}

window.onload = setup;
