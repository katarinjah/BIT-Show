const uiModule = (() => {
  
  const mainContentWrapperEl = $("#main-content");
  let searchDropdownEl = $("#search-dropdown");
  
  const renderHomePage = (shows) => {
    searchDropdownEl.hide();
    let html = `
      <h1 id="title">Popular Shows</h1>
      <div class="row text-center gx-5 gy-5" id="show-list">
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
    
    const renderSingleTvShowPage = (show) => {
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
        <h1>${show.name}</h1>
        <div class="detail-wrapper">
          <img src="${show.coverUrl}" alt="show-cover">
          <div class="list-wrapper">
            <h2>Seasons</h2>
            ${seasonList}
            <h2>Cast</h2>
            ${castListHtml}
          </div>
        </div>
        <h2>Show Details</h2>
        ${show.summary}
      `;
  
      mainContentWrapperEl.html(finalHtml);
    };

    const renderSearchDropdown = (shows) => {
      searchDropdownEl.show();
      shows.forEach((show) => {
        const itemEl = $(`<li id="${show.id}" class="search-item">${show.name}</li>`);
        searchDropdownEl.append(itemEl);
      });
    };
  
    const clearDropdown = () => {
      searchDropdownEl.hide();
    };
  
  return { renderHomePage, renderSingleTvShowPage, renderSearchDropdown, clearDropdown };
})();
