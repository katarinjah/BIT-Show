const dataModule = (function () {

    class TvShow {
        constructor(name, id, coverUrl) {
            this.id = id;
            this.name = name;
            this.coverUrl = coverUrl;
        };
    };
  
    const getShows = () => {
        return $.ajax({
            url: `http://api.tvmaze.com/shows`,
        })
        .then(function(res) {
          let shows = res.sort((a, b) => b.rating.average - a.rating.average).slice(0, 50);
          return shows.map(({ name, id, image }) => new TvShow(name, id, image.medium));
        });
      };
      
    const searchShow = (term) => {
        return $.ajax({
            url: `https://api.tvmaze.com/search/shows?q=${term}`,
        })
        .then(function(res) {
            return res.map(({ show }) => {
                const { name, id, image } = show;
                const imageToUse = image ? image.medium : '';
                return new TvShow(name, id, imageToUse);
            });
        });
    };
      
    return { getShows, searchShow };

})();