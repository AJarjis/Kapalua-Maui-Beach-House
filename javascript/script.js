"use strict";

/*Function which changes gallery main image while updating opacity of thumbnails.*/
function imgUpdate(thumbnailIndex) {
    var thumbnail = document.getElementsByClassName('thumbnail');
    var i;
    
    /*Sets all thumbnails to semi-transparant.*/
    for (i = 0; i < thumbnail.length; i++) {
        thumbnail[i].style.opacity = 0.5;
    }
    
    /*Changes gallery image.*/
    switch (thumbnailIndex) {
        case 0:
            document.getElementById('currentImage').src = "../images/details-page/living-room.jpg";
            break;
        case 1:
            document.getElementById('currentImage').src = "../images/details-page/bathroom.jpg";
            break;
        case 2:
            document.getElementById('currentImage').src = "../images/details-page/bedroom.jpg";
            break;
        case 3:
            document.getElementById('currentImage').src = "../images/details-page/kitchen.jpg";
            break;
    }
    
    /*Sets chosen thumbnail to fully opacity to give the illusion it is active.*/
    thumbnail[thumbnailIndex].style.opacity = 1;
}

/*Function which loads a Google Map API*/
function loadMap() {
    var kapalua = {lat: 21.003528, lng: -156.660055};
    var  map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: kapalua
    });
    var marker = new google.maps.Marker({
        position: kapalua,
        map: map
    });
}

/*Function which displays tab content.*/
function openTab(event, page) {
    var tabContent = document.getElementsByClassName('tabContent');
    var tablinks = document.getElementsByClassName('tablinks');
    var i;
    
    /*Resets all tab content to hidden*/
    for (i = 0; i < tablinks.length; i++) {
        tabContent[i].style.display = "none";
    }
    
    /*Resets all tab links to non-active*/
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    /*Displays chosen tab*/
    document.getElementById(page).style.display = "block";
    event.currentTarget.className += " active";
}
/*Function is an extension of openTab above; automatically sets dining as default tab.*/
function defaultTab() {
    document.getElementById("defaultTab").click();
}

/*Stores posts in local storage.*/	
function setObject(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}
/*Retrieves posts in local storage*/
function getObject(key) {
    var storage = window.localStorage;
    var value = storage.getItem(key);
    return value && JSON.parse(value);
}
/*Deletes posts in local stoarge*/
function clearStorage() {
    window.localStorage.clear();
}

/*Function  which gets current date and returns it in formatted style.*/
function getCurrentDate() {
    var currentDate = new Date();
    var day = currentDate.getUTCDate();
    var month = currentDate.getUTCMonth() + 1;
    var year = currentDate.getUTCFullYear();
    var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
    var formattedDate = (monthNames[month] + ' ' + day + ' ' + year);
    
    return formattedDate;
}

/*Function which lets adminstrator delete all messages.*/
function clearPosts() {
    if ($('#review').val() === 'CLEAR!') {
        clearStorage();
        location.reload();
    }
    /*Empties name, email and review box.*/
    $('#name').val('');
    $('#email').val('');
    $('#review').val('');
}

/*Function which saves and posts user's comment and name.*/
function postComment() {
    var name = $('#name').val();
    var review = $('#review').val();
    /*Replaces new lines with html sytnax so as to display them when posted.*/
    review = review.replace(/\r?\n/g, '<br />');
    var currentDate = getCurrentDate();
    
    /*Allows user to be anonymous and prevents no name from being entered.*/
    if (name === '') {
        name = 'Anonymous';
    }
    
    var currentPost = '<div class="post"><h3>' + name + ' | <span>' + currentDate + '</span></h3>' + '<p>' + review + '</p></div>';
    var prevPosts = $('#allPosts').html();
    
    /*Clears all posts and then prepends current and previous posts.*/
    $('#allPosts').empty();
    $('#allPosts').append(currentPost + prevPosts);

    setObject('totalPosts', currentPost + prevPosts);
    
    clearPosts();
    
    /*Scrolls to (just above) users comment.*/
    location.href = "#postButton";
    document.getElementById('postButton').disabled = true;
}

/*Function which recieves stored posts.*/
function fetchPosts() {
    var inlist = getObject('totalPosts');
    
    if (inlist === null) {
        inlist = '';
    }
    
    $('#allPosts').empty();
    $('#allPosts').append(inlist);
}

/*Function prevents user from entering nothing.*/
$(document).ready(function () {
    $('#review').keyup(function () {
       if ($.trim($('#review').val()) === '') {
           document.getElementById('postButton').disabled = true;
       } else {
           document.getElementById('postButton').disabled = false;
       }
    });
});

function openForm() {
    var form = document.getElementById('form');
    form.style.display = "block";
}

function closeForm() {
    var form = document.getElementById('form');
    form.style.display = "none";
}

function externalClick() {
    var form = document.getElementById('form');
    if (event.target == form) {
        form.style.display = "none";
    }
} 
