$(function() {
    checkAndUpdatePetInfoInHtml();

    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.bath-button').click(clickedBathButton);

    // .change() fires when the user edits the name field and clicks away
    $('#name-input').change(function() {
        pet_info['name'] = $(this).val();
        updatePetInfoInHtml();
        showNotification("My name is " + pet_info['name'] + "!");
    });
})

var pet_info = { name: "Squirtle", weight: 10, happiness: 5, cleanliness: 5 };

function animatePet(type) {
    var img = $('.pet-image');
    var animClass = type === 'bounce' ? 'pet-bounce' : 'pet-shake';
    img.removeClass('pet-bounce pet-shake');
    // Small timeout so re-adding the same class restarts the animation
    setTimeout(function() { img.addClass(animClass); }, 10);
}

function clickedTreatButton() {
    pet_info['happiness'] = pet_info['happiness'] + 2;
    pet_info['weight'] = pet_info['weight'] + 1;
    animatePet('bounce');
    showNotification("Yum! That treat was delicious!");
    checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
    pet_info['happiness'] = pet_info['happiness'] + 3;
    pet_info['weight'] = pet_info['weight'] - 1;
    animatePet('bounce');
    showNotification("Woo! I love playing!");
    checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
    pet_info['happiness'] = pet_info['happiness'] - 2;
    pet_info['weight'] = pet_info['weight'] - 2;
    animatePet('shake');
    showNotification("Ugh... I'm tired...");
    checkAndUpdatePetInfoInHtml();
}

function clickedBathButton() {
    pet_info['cleanliness'] = pet_info['cleanliness'] + 3;
    pet_info['happiness'] = pet_info['happiness'] - 1;
    animatePet('shake');
    showNotification("I hate baths... but I smell better now.");
    checkAndUpdatePetInfoInHtml();
}

function checkAndUpdatePetInfoInHtml() {
    checkWeightAndHappinessBeforeUpdating();
    updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
    // Prevent stats from going below zero
    if (pet_info['weight'] < 0) { pet_info['weight'] = 0; }
    if (pet_info['happiness'] < 0) { pet_info['happiness'] = 0; }
    if (pet_info['cleanliness'] < 0) { pet_info['cleanliness'] = 0; }
}

function updatePetInfoInHtml() {
    $('.name').text(pet_info['name']);
    $('.weight').text(pet_info['weight']);
    $('.happiness').text(pet_info['happiness']);
    $('.cleanliness').text(pet_info['cleanliness']);
}

// .clone() copies the hidden template bubble and appends it to the speech area
function showNotification(message) {
    var bubble = $('.notification-template').clone();
    bubble.removeClass('notification-template');
    bubble.addClass('notification-bubble');
    bubble.text(message);
    $('#speech-area').empty().append(bubble);
    bubble.hide().fadeIn(300).delay(2500).fadeOut(500, function() {
        $(this).remove();
    });
}