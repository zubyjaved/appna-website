
$(function() {
    /*
    If the user clicks on nav link that opens a card, scrolls the card into view.

    1. Remove "nav" from clicked nav-link id.      Example: contactNav -> contact
    2. Adds "Btn" to id.                           Example: contact -> contactBtn
    3. Searches for #contactBtn and scrolls to it.    
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

    /* If email clicked, copy to clipboard. */
    $('#email').click(function() { 
        let textarea = document.createElement('textarea');
        textarea.textContent = $(this).text();
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();


        /* 
        Change contact info to "copied" for 2 seconds.
        */
        $('#contactInfo').hide();
        let $contact = $("<p>Copied!</p>");
        $ ('#contactInfo').after($contact);
        setTimeout(function() {
            $contact.hide();
            $('#contactInfo').show();
        }, 2000);

    });
});
