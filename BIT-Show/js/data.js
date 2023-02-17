
const dataModule = (function () {

    class TvShow {
        constructor(name, id, coverUrl, seasons, cast, summary) {
          this.id = id;
          this.name = name;
          this.coverUrl = coverUrl;
          this.seasons = seasons;
          this.cast = cast;
          this.summary = summary;
        };
    };
  
    class Season {
        constructor(startDate, endDate) {
          this.startDate = startDate;
          this.endDate = endDate;
        };
    };

    const getShows = () => {
      return $.ajax({
        url: 'http://api.tvmaze.com/shows',
        method: 'GET',
        dataType: 'json'
      })
      .then((showsRawObjects) => {
        const topRatedShows = showsRawObjects
          .filter(show => show.rating.average)
          .sort((a, b) => b.rating.average - a.rating.average)
          .slice(0, 50);
        return topRatedShows.map(({ name, id, image }) => new TvShow(name, id, image.medium));
      });
    };
    
      
    const getSingleTvShow = (id) => {
        return $.ajax({
          url: `https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`,
          method: 'GET',
          dataType: 'json',
        })
          .then(rawTvShow => {
            const tvSeasons = rawTvShow._embedded.seasons.map(s => new Season(s.premiereDate, s.endDate));
            const cast = rawTvShow._embedded.cast.map(a => a.person.name);
            return new TvShow(rawTvShow.name, rawTvShow.id, rawTvShow.image.original, rawTvShow.summary, cast, tvSeasons);
          });
      };
    
    const searchShow = (term) => {
        return $.ajax({
          url: `https://api.tvmaze.com/search/shows?q=${term}`,
          method: 'GET',
          dataType: 'json',
        })
          .then(showsRawObjects => showsRawObjects.slice(0, 10).map(({ show }) => {
            const { name, id, image } = show;
            const imageToUse = image ? image.original : '';
            return new TvShow(name, id, imageToUse);
          }));
      }; 
      
  return { getShows, getSingleTvShow, searchShow };

})();