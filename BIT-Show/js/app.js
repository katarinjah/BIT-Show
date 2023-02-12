// render top 50 shows on page load

$(function() {

    $.ajax({
        url: "https://api.tvmaze.com/shows",
      })
      .done((data) => {
        const sortedData = data.sort((a, b) => {
          return b.rating.average - a.rating.average;
        });
      
        const top50 = sortedData.slice(0, 50);
        
        top50.forEach((show) => {
            const showDiv = $("<div>", {
              class: "col-sm-12 col-md-6 col-lg-4 col-xl-4 d-flex justify-content card",
              style: "width: 18rem;"
            });
            const cardBody = $("<div>", {
                class: "card-body"
            });
            const showImage = $("<img>", {
              src: show.image.medium,
              class: "card-img-top",
              alt: show.name,
              //title: show.name
            });
            const showName = $("<h5>").text(show.name);
            
            cardBody.append(showImage, showName);
            showDiv.append(cardBody);
            const rowCards = $("div.cards");
            rowCards.append(showDiv);
        });
    });
      
});
    

