const uiModule = (() => {
  const mainContentWrapperEl = $(".main");
  const searchDropdownEl = $("#search-dropdown");
  
  const renderHomePage = (shows) => {
      let html = `
        <h4>Popular Shows</h4>
        <div class="row gx-5 gy-5 show-list">
      `;
    
      shows.forEach((show) => {
        html += `
          <div class="col-sm-6 col-md-4 col-lg-4 show-item" id="${show.id}">
            <div class="card" style="width: 60%">
              <img src="${show.coverUrl}" class="card-img-top" alt="show cover image">
              <h5 class="card-text">${show.name}</h5>
            </div>
          </div>
        `;
      });
    
      html += `</div>`;
      mainContentWrapperEl.html(html);
    };
    
  
  const renderSearchDropdown = (shows) => {
    shows.forEach((show) => {
      const itemEl = $(`<div id="${show.id}" class="search-item">${show.name}</div>`);
      searchDropdownEl.append(itemEl);
    });
  };
  
  const clearDropdown = () => {
    searchDropdownEl.empty();
  };
  
  return { renderHomePage, renderSearchDropdown, clearDropdown };
})();
