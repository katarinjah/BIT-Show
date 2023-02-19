const uiModule = (() => {
  
  const mainContentWrapperEl = $("#main-content");
  let searchDropdownEl = $("#search-dropdown");
  
  const renderHomePage = (shows) => {
    searchDropdownEl.hide();
    let html = `
      <h1 id="title">Popular Shows</h1>
      <div class="row text-center gx-5 gy-5 show-list">
    `;
    
    shows.forEach((show) => {
        html += `
          <div class="col-sm-6 col-md-4 col-lg-4 show-item  d-flex justify-content-center" id="${show.id}">
            <div class="card" style="width: 70%">
              <img src="${show.coverUrl}" class="card-img-top" alt="show cover image">
              <h5 class="card-text">${show.name}</h5>
            </div>
          </div>
        `;
    });
    
      html += `</div>`;
      mainContentWrapperEl.html(html);
    };
    
    const renderSingleTvShowPage = show => {
      let castListHtml = "";
      show.cast.forEach((string) => {
        castListHtml += `
          <div class="cast-item">${string}</div>
        `;
      });
  
      let seasonList = "";
      show.seasons.forEach(({ startDate, endDate }) => {
        seasonList += `
          <div class="season-item">${startDate} - ${endDate}</div>
        `
      });
  
      const finalHtml = `
      <div class="container">
      <div class="row">
        <h1>${show.name}</h1>
        </div>
          <div class="row">
            <div class="col-6 detail-wrapper">
              <img src="${show.coverUrl}" alt="show-cover">
            <div class="col-6 list-wrapper">
              <h2>Seasons</h2>
              ${seasonList}
              <h2>Cast</h2>
              ${castListHtml}
            </div>
          </div>
          <div class="row">
            <h2>Show Details</h2>
            ${show.summary}
          </div>
        </div>
      `;
  
      mainContentWrapperEl.html(finalHtml);
    };

    const renderSearchDropdown = shows => {
      searchDropdownEl.show();
      shows.forEach((show) => {
        const itemEl = $(`<div id="${show.id}" class="search-item">${show.name}</div>`);
        searchDropdownEl.append(itemEl);
      });
    };
  
    const clearDropdown = () => {
      searchDropdownEl.innerHtml = "";
    };
  
  return { renderHomePage, renderSingleTvShowPage, renderSearchDropdown, clearDropdown };
})();
