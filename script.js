
$(function() {
    /*
    Kinda spaghetti..
    If the user clicks on nav link that opens a card, scroll the card into view.

    1. Gets id of nav-link, removes "nav" from end of id.
    2. Adds "Btn" to id and scrolls to new id.
    Example : contactNav -> contactBtn 
    
    */
    $('.accord-link').click(function() {
        let id = $(this).attr('id');
        id = id.slice(0, -3);
        id += 'Btn';
        $('.navbar-collapse').collapse('hide');
        let obj = document.getElementById(id);

        // For mobile devices, scroll to end of element.
        // For larger devices, scroll to center of element.
        let end = {
            behavior: "smooth",
            block: "end",
            inline: "end",
        }

        let center = {
            behavior: "smooth",
            block: "center",
            inline: "center",
        }

        if ($(window).width() < 768) {
            obj.scrollIntoView(end)
        }
        else {
            obj.scrollIntoView(center);
        }
    });  

    $('#email').click(function() { 
        let textarea = document.createElement('textarea');
        textarea.textContent = $(this).text();
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
    });
});
