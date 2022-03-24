$("#header-parallax-logo")
    .animate({
        opacity: 1
    }, 600);

$("#bottom-arrow").on('click', () => {
    document.querySelector("#info-container").scrollIntoView({behavior: "smooth"});
});

$("#socialButtonsGroup a.to-fade-in")
    .delay(600).each(
    function (index) {
        $(this).delay(index*100).animate(
            {
                opacity: 1
            });
    });
