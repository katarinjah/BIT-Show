(($, data, ui) => {
    
    const searchInput = $('#search-field');
    
    const onSearch = (e) => {
        const term = e.target.value;
        data.searchShow(term).then((shows) => {
            ui.clearDropdown();
            ui.renderSearchDropdown(shows);
        });
    };
    
    data.getShows().then((shows) => {
        ui.renderHomePage(shows);
    });
    
    searchInput.on('keyup', onSearch);
    searchInput.on('blur', ui.clearDropdown);

  })(jQuery, dataModule, uiModule);
  