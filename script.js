let allEpisodes;
// let searchContainer = document.createElement("section");
// searchContainer.classList.add("search-container");
let searchResult = document.createElement("div");

function setup() {
  const allShows = getAllShows();
  makeDropdownForShows();
  makeSearchForShows();
  makePageForShows(allShows);
}

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
    episodeSummary.innerHTML = `${episode.summary}`;

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
  container.appendChild(episodesContainer);
}

function makeSearchForShows() {
  const allShows = getAllShows();
  let container = document.getElementById("root");

  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.placeholder = "Search here";

  container.appendChild(searchInput);
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

function makeSearchForShows() {
  const allShows = getAllShows();
  let container = document.getElementById("root");

  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.placeholder = "Search here";

  container.appendChild(searchInput);
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

function makeSearchForEpisodes() {
  let container = document.getElementById("root");

  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.placeholder = "Search here";

  container.appendChild(searchInput);
  searchResult.classList.add("search-result");

  searchInput.addEventListener("keyup", (event) => {
    let searchString = event.target.value.toLowerCase();

    let filteredEpisodes = allEpisodes.filter((show) => {
      return (
        episode.name.toLowerCase().includes(searchString) ||
        episode.summary.toLowerCase().includes(searchString)
      );
    });
    searchResult.innerHTML = `Displaying ${filteredShows.length}/${allShows.length}`;

    container.appendChild(searchResult);
    document.getElementById("container").remove();
    makePageForEpisodes(filteredEpisodes);
  });
}

function makeDropdownForEpisodes() {
  let dropDownExist = document.getElementById("select-episode-element");
  if (dropDownExist) {
    document.getElementById("select-episode-element").remove();

    console.log("found it");
  }
  let container = document.getElementById("root");

  let select = document.createElement("select");
  select.id = "select-episode-element";

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
  let searchContainer = document.getElementById("search-container");
  searchContainer.classList.add("search-container");
  searchContainer.appendChild(select);

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

function makeDropdownForShows() {
  let container = document.getElementById("root");

  const allShows = getAllShows();
  sortShowsByName(allShows);

  let select = document.createElement("select");

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
  dropMenuContainer.appendChild(select);

  let searchContainer = document.createElement("section");
  // searchContainer.classList.add("search-container");
  searchContainer.id = "search-container";
  searchContainer.appendChild(dropMenuContainer);

  container.appendChild(searchContainer);
  // searchResult.classList.add("search-result");

  select.addEventListener("change", (event) => {
    if (event.currentTarget.value == 0) {
      document.getElementById("select-episode-element").remove();
      const allShows = getAllShows();
      makePageForShows(allShows);
    }

    document.getElementById("container").remove();
    fetchUrl(event.currentTarget.value);
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

window.onload = setup;
