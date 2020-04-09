document.querySelectorAll('.profile-card-wrapper--cta-wrapper .profile-button_js').forEach(eachNode => {
    eachNode.addEventListener('click', function (e) {
        e.stopPropagation();
    }, false);
});

document.querySelectorAll('.profile-card-wrapper').forEach(eachNode => {
    eachNode.addEventListener('click', function (e) {
        const url = e.target.getAttribute('data-url');
        if (url) {
            window.open(url, "_blank");
        }
    }, false);
});
// document.querySelector('.profile-card-wrapper').addEventListener('click', function (e) {
//     const url = e.target.getAttribute('data-url');
//     if (url) {
//         window.open(url, "_blank");
//     }
// });

document.querySelector('.add-to-favorites input[type=checkbox]').addEventListener('click', function (event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
});

document.querySelector('body').addEventListener('click', function(e) {
    const getTargetElement = e.target;
    if (getTargetElement && getTargetElement.classList.contains('show-more-cta_js')) {
        document.getElementById(getTargetElement.getAttribute('data-id')).classList.toggle("visible");
        if (e.target.innerText === 'Read More') {
            e.target.innerText = 'Read Less';
        } else {
            e.target.innerText = 'Read More';
        }
    }
    return false;
});
