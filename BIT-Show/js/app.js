// render single show info page

$(function() {

    $(document).on("click", "div.singleCard", function() {
        const rowCards = $("div.cards");
        const mainTitle = $("#main-title");
        mainTitle.hide();
        rowCards.hide();
        const showId = $(this).data("id");
    
        $.ajax({
            url: `https://api.tvmaze.com/lookup/shows/${showId}`,
        })
            
        .done((showData) => {
            const showName = showData.name;
            const showPoster = showData.image.medium;
            const showDescription = showData.summary;
            const numberOfSeasons = showData.seasons.length;
        
            const seasons = showData.seasons.map((season) => {
                return {
                    startDate: season.premiereDate,
                    endDate: season.endDate,
                };
            });
        
            const cast = showData.cast.map((actor) => {
                return actor.person.name;
            });
        
            const showFeatures = showData.features;
            const showCrew = showData.crew;
            const showAkas = showData.akas;
            const showEpisodes = showData._embedded.episodes;
        
            const mainDiv = $("div.main");
            mainDiv.empty();
        
            const nameDiv = $("<h4>").addClass("name").text(showName);
            mainDiv.append(nameDiv);
        
            const posterImg = $("<img>").attr("src", showPoster);
            mainDiv.append(posterImg);
        
            const descriptionDiv = $("<div>").addClass("description").text(showDescription);
            mainDiv.append(descriptionDiv);
        
            const seasonsDiv = $("<div>").addClass("seasons");
            seasons.forEach((season) => {
                const start = season.startDate;
                const end = season.endDate;
                const seasonDiv = $("<div>").text(`Season start: ${start}, Season end: ${end}`);
                seasonsDiv.append(seasonDiv);
            });
            mainDiv.append(seasonsDiv);
        
            const castDiv = $("<div>").addClass("cast");
            cast.forEach((actor) => {
                const actorDiv = $("<div>").text(actor);
                castDiv.append(actorDiv);
            });
            mainDiv.append(castDiv);
        
            const featuresDiv = $("<div>").addClass("features").text(showFeatures);
            mainDiv.append(featuresDiv);
        
            const crewDiv = $("<div>").addClass("crew").text(showCrew);
            mainDiv.append(crewDiv);
        
            const akasDiv = $("<div>").addClass("akas").text(showAkas);
            mainDiv.append(akasDiv);

            const episodesDiv = $("<div>").addClass("episodes");
            showEpisodes.forEach((episode) => {
                const episodeDiv = $("<div>").text(episode.name); 
                mainDiv.append(episodeDiv);
            });
        });
    });

})