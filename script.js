let allEpisodes;
let searchResult = document.createElement("div");

function setup() {
  makePageForEpisodes(allEpisodes);
  makeDropdownForShows();
  makeDropdownForEpisodes();
  searchForEpisode();
}

function makePageForEpisodes(allEpisodes) {
  let container = document.getElementById("root");
  let rowMainElem = document.createElement("section");
  rowMainElem.id = "episode-container";
  rowMainElem.classList.add("row");

  for (let episode of allEpisodes) {
    let episodeContainer = document.createElement("div");
    episodeContainer.classList.add("col-4");

    let title = document.createElement("h4");
    let seasonEpisodeNumber = document.createElement("h5");

    let imgContainer = document.createElement("div");
    let image = document.createElement("img");

    let episodeSummary = document.createElement("div");

    title.innerText = `${episode.name}`;

    seasonEpisodeNumber.innerText = makeIdForEpisodes(episode);

    image.src = episode.image.medium;
    imgContainer.appendChild(image);

    episodeSummary.innerHTML = `${episode.summary}`;
    episodeContainer.append(title, seasonEpisodeNumber, image, episodeSummary);
    rowMainElem.appendChild(episodeContainer);
  }
  container.appendChild(rowMainElem);
}

function searchForEpisode() {
  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.placeholder = "Search for Episode";

  let searchContainer = document.getElementById("search-container");
  searchContainer.appendChild(searchInput);
  searchResult.classList.add("search-result");

  searchInput.addEventListener("keyup", (event) => {
    let searchString = event.target.value.toLowerCase();

    let filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(searchString) ||
        episode.summary.toLowerCase().includes(searchString)
      );
    });
    searchResult.innerHTML = `Displaying ${filteredEpisodes.length}/${allEpisodes.length}`;
    searchContainer.appendChild(searchResult);

    clearPageContent();
    makePageForEpisodes(filteredEpisodes);
  });
}

function makeDropdownForEpisodes() {
  let select = document.createElement("select");
  select.id = "select-episode-element";

  let defaultOption = document.createElement("option");
  defaultOption.innerHTML = "All Episodes";
  defaultOption.value = 1;
  select.appendChild(defaultOption);

  // if (event.currentTarget.value === 1) {
  //   makePageForEpisodes(allEpisodes);
  // }
  for (let episode of allEpisodes) {
    let option = document.createElement("option");
    let seasonEpisodeNumber = makeIdForEpisodes(episode);

    option.innerHTML = `${seasonEpisodeNumber}- ${episode.name}`;
    option.value = episode.id;
    select.appendChild(option);
  }
  let searchContainer = document.getElementById("search-container");
  searchContainer.appendChild(select);

  searchResult.classList.add("search-result");

  select.addEventListener("change", (event) => {
 
    let filteredEpisodes = allEpisodes.filter((episode) => {
      return episode.id == event.currentTarget.value;
    });
    if (event.currentTarget.value == 1) {
      filteredEpisodes = allEpisodes;
    }
    searchResult.innerHTML = `Displaying ${filteredEpisodes.length}/${allEpisodes.length}`;
    searchContainer.appendChild(searchResult);

    clearPageContent();
    makePageForEpisodes(filteredEpisodes);
  });
}

function makeDropdownForShows() {
  const allShows = getAllShows();
  sortShowsByName(allShows);

  let select = document.createElement("select");

  let defaultOption = document.createElement("option");
  defaultOption.innerHTML = "Choose Shows";
  select.appendChild(defaultOption);
  let option;
  for (let show of allShows) {
    option = document.createElement("option");

    option.innerHTML = `${show.name}`;
    option.value = show.id;
    console.log(option.value);
    select.appendChild(option);
  }
  let searchContainer = document.getElementById("search-container");
  searchContainer.appendChild(select);
  searchResult.classList.add("search-result");

  select.addEventListener("change", (event) => {
    clearPageContent();
    document.getElementById("select-episode-element").remove();
    fetchUrl(event.currentTarget.value);
  });
}

function fetchUrlForStart() {
  const urlAddress = "https://api.tvmaze.com/shows/82/episodes";
  fetch(urlAddress)
    .then((response) => {
      if (!response.ok) {
        throw response.statusText;
      }
      return response.json();
    })
    .then((episodeList) => {
      allEpisodes = episodeList;
      setup();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function sortShowsByName(allShows) {
  return allShows.sort((firstShow, secondShow) =>
    firstShow.name > secondShow.name ? 1 : -1
  );
}

function fetchUrl(showId) {
  const urlAddress = `https://api.tvmaze.com/shows/${showId}/episodes`;
  fetch(urlAddress)
    .then((response) => {
      if (!response.ok) {
        throw response.statusText;
      }
      return response.json();
    })
    .then((episodeList) => {
      allEpisodes = episodeList;
      makeDropdownForEpisodes();
      makePageForEpisodes(allEpisodes);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function sortShowsByName(allShows) {
  return allShows.sort((firstShow, secondShow) =>
    firstShow.name > secondShow.name ? 1 : -1
  );
}
function makeIdForEpisodes(episode) {
  let seasonNumber;
  let episodeNumber;
  if (episode.season.length > 1) {
    seasonNumber = `S${episode.season}`;
  } else {
    seasonNumber = `S0${episode.season}`;
  }
  if (episode.number.length > 1) {
    episodeNumber = `E${episode.number}`;
  } else {
    episodeNumber = `E0${episode.number}`;
  }
  let seasonEpisodeNumber = `${seasonNumber}${episodeNumber}`;
  return seasonEpisodeNumber;
}

function clearPageContent() {
  let pageContent = document.getElementById("episode-container");
  pageContent.remove();
}

window.onload = fetchUrlForStart;
