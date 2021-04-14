let allEpisodes;
let searchResult = document.createElement("div");

function setup() {
  const allShows = getAllShows();
  makeDropdownForShows();
  makeSearchForShows();
  makePageForShows(allShows);
}

//Shows Functions
function makePageForShows(showsList) {
  sortShowsByName(showsList);

  let container = document.getElementById("root");

  let showsContainer = document.createElement("section");
  showsContainer.id = "container";
  showsContainer.classList.add("container-fluid");

  for (let show of showsList) {
    let eachShowContainer = document.createElement("section");
    eachShowContainer.classList.add(
      "row",
      "bg-dark",
      "text-white",
      "each-show"
    );

    let title = document.createElement("h4");
    title.innerText = `${show.name}`;
    title.classList.add("col-12", "title");

    let imgContainer = document.createElement("div");
    let image = document.createElement("img");
    imgContainer.classList.add("col-lg-2", "col-md-4");

    if (show.image != null) {
      image.src = show.image.medium;
      imgContainer.appendChild(image);
    } else {
      image.src = "./img/default-Show.jpeg";
      imgContainer.appendChild(image);
    }
    let summary = document.createElement("div");
    summary.innerHTML = show.summary;
    summary.classList.add(
      "offset-lg-1",
      "col-lg-6",
      "col-md-12",
      "mx-2",
      "my-2"
    );

    let genres = document.createElement("p");
    genres.innerHTML = `Genres: ${show.genres}`;

    let status = document.createElement("p");
    status.innerHTML = `Status: ${show.status}`;

    let rating = document.createElement("p");
    rating.innerHTML = `Rating: ${show.rating.average}`;

    let runTime = document.createElement("p");
    runTime.innerHTML = `Runtime: ${show.runtime} mins`;

    let infoBox = document.createElement("section");
    infoBox.classList.add("offset-lg-1", "col-lg-2", "col-md-4", "info-box");
    infoBox.append(genres, status, rating, runTime);

    eachShowContainer.append(title, imgContainer, summary, infoBox);
    showsContainer.appendChild(eachShowContainer);
  }
  container.appendChild(showsContainer);
}

function makeSearchForShows() {
  const allShows = getAllShows();
  let container = document.getElementById("root");

  let searchInput = document.createElement("input");
  searchInput.id = "show-searchbar";
  searchInput.classList.add("search-input", "form-control");
  searchInput.placeholder = "Search for your favorite show here";

  let searchBarContainer = document.createElement("section");
  searchBarContainer.id = "searchbar-container";
  searchBarContainer.classList.add("col-4", "my-2");
  searchBarContainer.appendChild(searchInput);

  let label = document.createElement("h6");
  label.id = "label-show";
  label.classList.add("col-2", "my-2", "mt-3");
  label.textContent = "Search here:";

  let searchContainer = document.getElementById("search-container");
  searchContainer.append(label, searchBarContainer);

  container.appendChild(searchContainer);
  searchResult.classList.add("search-result");

  searchInput.addEventListener("keyup", (event) => {
    let searchString = event.target.value.toLowerCase();

    let filteredShows = allShows.filter((show) => {
      return (
        show.name.toLowerCase().includes(searchString) ||
        show.summary.toLowerCase().includes(searchString)
      );
    });
    searchResult.innerHTML = `Displaying ${filteredShows.length}/${allShows.length}`;

    container.appendChild(searchResult);
    document.getElementById("container").remove();
    makePageForShows(filteredShows);
  });
}

function makeDropdownForShows() {
  let container = document.getElementById("root");

  const allShows = getAllShows();
  sortShowsByName(allShows);

  let select = document.createElement("select");
  select.textContent = "Test";
  select.classList.add("form-control");

  let defaultOption = document.createElement("option");
  defaultOption.innerHTML = "All Shows";
  defaultOption.value = 0;
  select.appendChild(defaultOption);

  let option;
  for (let show of allShows) {
    option = document.createElement("option");
    option.innerHTML = `${show.name}`;
    option.value = show.id;
    select.appendChild(option);
  }
  let dropMenuContainer = document.createElement("section");
  dropMenuContainer.classList.add("col-4", "my-2");
  dropMenuContainer.appendChild(select);

  let searchContainer = document.createElement("section");
  searchContainer.classList.add("row");
  searchContainer.id = "search-container";

  let label = document.createElement("h6");
  label.classList.add("col-2", "my-2", "mt-3");
  label.textContent = "Choose show:";

  searchContainer.append(label, dropMenuContainer);
  container.appendChild(searchContainer);

  select.addEventListener("change", (event) => {
    if (event.currentTarget.value == 0) {
      document.getElementById("select-episode-element").remove();
      document.getElementById("episode-searchbar").remove();
      makeSearchForShows();
      const allShows = getAllShows();
      makePageForShows(allShows);
      searchResult.innerHTML = `Displaying ${allShows.length}/${allShows.length}`;
    } else {
      showSearchBarExist = document.getElementById("searchbar-container");
      if (showSearchBarExist) {
        document.getElementById("searchbar-container").remove();
        document.getElementById("label-show").remove();
      }
    }

    document.getElementById("container").remove();
    fetchUrl(event.currentTarget.value);
  });
}

//Episodes Functions
function makePageForEpisodes(allEpisodes) {
  let container = document.getElementById("root");

  let episodesContainer = document.createElement("section");
  episodesContainer.id = "container";
  episodesContainer.classList.add("container-fluid");

  let rowElem = document.createElement("div");
  rowElem.classList.add("row");

  for (let episode of allEpisodes) {
    let eachEpisodeContainer = document.createElement("section");
    eachEpisodeContainer.classList.add(
      "bg-dark",
      "text-white",
      "each-episode",
      "m-1"
    );

    let title = document.createElement("h4");
    title.innerText = `${episode.name}`;
    title.classList.add("title");

    let seasonEpisodeNumber = document.createElement("h5");
    seasonEpisodeNumber.innerText = makeIdForEpisodes(episode);

    let imgContainer = document.createElement("div");
    let image = document.createElement("img");

    if (episode.image != null) {
      image.src = episode.image.medium;
      imgContainer.appendChild(image);
    } else {
      image.src = "./img/default-Episode.jpeg";
      imgContainer.appendChild(image);
    }
    let episodeSummary = document.createElement("div");

    if (episode.summary != null) {
      episodeSummary.innerHTML = `${episode.summary}`;
    } else {
      episodeSummary.innerHTML = `No description found`;
    }

    eachEpisodeContainer.append(
      title,
      seasonEpisodeNumber,
      imgContainer,
      episodeSummary
    );
    eachEpisodeContainer.classList.add("col-3");
    rowElem.appendChild(eachEpisodeContainer);
    episodesContainer.appendChild(rowElem);
  }
  searchResult.innerHTML = `Displaying ${allEpisodes.length}/${allEpisodes.length}`;

  container.appendChild(searchResult);
  container.appendChild(episodesContainer);
}

function sortShowsByName(allShows) {
  return allShows.sort((firstShow, secondShow) =>
    firstShow.name > secondShow.name ? 1 : -1
  );
}

function makeSearchForEpisodes() {
  let container = document.getElementById("root");

  let searchInput = document.createElement("input");
  searchInput.id = "episode-searchbar";
  searchInput.classList.add("search-input", "form-control");
  searchInput.placeholder = "Search for your favorite episode here ";

  let searchBarContainer = document.createElement("section");
  searchBarContainer.classList.add("offset-2", "col-8");
  searchBarContainer.appendChild(searchInput);

  let searchContainer = document.getElementById("search-container");
  searchContainer.appendChild(searchBarContainer);
  container.appendChild(searchContainer);

  searchInput.addEventListener("keyup", (event) => {
    let searchString = event.target.value.toLowerCase();

    let filteredEpisodes = allEpisodes.filter((episode) => {
      if (episode.summary != null) {
        return (
          episode.name.toLowerCase().includes(searchString) ||
          episode.summary.toLowerCase().includes(searchString)
        );
      }
    });
    searchResult.innerHTML = `Displaying ${filteredEpisodes.length}/${allEpisodes.length}`;

    container.appendChild(searchResult);
    document.getElementById("container").remove();
    makePageForEpisodes(filteredEpisodes);
  });
}

function makeDropdownForEpisodes() {
  let dropDownExist = document.getElementById("select-episode-element");
  if (dropDownExist) {
    document.getElementById("select-episode-element").remove();
  }

  let container = document.getElementById("root");

  let select = document.createElement("select");
  select.id = "select-episode-element";
  select.classList.add("form-control");

  let defaultOption = document.createElement("option");
  defaultOption.innerHTML = "All Episodes";
  defaultOption.value = 0;
  select.appendChild(defaultOption);

  for (let episode of allEpisodes) {
    let option = document.createElement("option");
    let seasonEpisodeNumber = makeIdForEpisodes(episode);

    option.innerHTML = `${seasonEpisodeNumber}- ${episode.name}`;
    option.value = episode.id;
    select.appendChild(option);
  }
  let dropMenuContainer = document.createElement("section");
  dropMenuContainer.classList.add("col-4", "my-2");
  dropMenuContainer.appendChild(select);

  let searchContainer = document.getElementById("search-container");
  searchContainer.classList.add("search-container");
  searchContainer.appendChild(dropMenuContainer);

  searchResult.classList.add("search-result");

  container.appendChild(searchContainer);

  select.addEventListener("change", (event) => {
    let filteredEpisodes = allEpisodes.filter((episode) => {
      return episode.id == event.currentTarget.value;
    });
    if (event.currentTarget.value == 0) {
      filteredEpisodes = allEpisodes;
    }
    searchResult.innerHTML = `Displaying
     ${filteredEpisodes.length}/${allEpisodes.length}`;
    searchContainer.appendChild(searchResult);

    document.getElementById("container").remove();

    makePageForEpisodes(filteredEpisodes);
  });
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
      makeSearchForEpisodes();
      makePageForEpisodes(allEpisodes);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
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

window.onload = setup;
