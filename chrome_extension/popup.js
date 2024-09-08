// Select all input elements from the assignment html, enable them and reset their values
function clearInputs() {
    document.querySelectorAll('input').forEach(function(input) {
        input.disabled = false;
        if (input.type === 'text' || input.type === 'password' || input.type === 'email' || input.type === 'number') {
            input.value = '';
        } else if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        }
    });
}

// Select all feedback related html elements are remove them
function removeFeedbackElements() {
    document.querySelectorAll('.feedback-header, .faculty-answer, .qt-feedback').forEach(function(element) {
        element.remove();
    });
}


// Function to enable individual mode
function indMode() {
    // Clicks the checkans button if it exists
    var checkAnsButton = document.querySelector('.gcb-button.qt-check-answer-button'); 
    if (checkAnsButton) {
        checkAnsButton.click();
        // Exits the submit dailog popup
        setTimeout(() => {
            var cancelButton = document.querySelector('.btn.btn-link.btn-cancel.ng-star-inserted');
            if (cancelButton) {
                cancelButton.click();
            }
        }, 50);
    };

    // Select all input elements from the assignment html, enable them and reset their values
    document.querySelectorAll('input').forEach(function(input) {
        input.disabled = false;
        if (input.type === 'text' || input.type === 'password' || input.type === 'email' || input.type === 'number') {
            input.value = '';
        } else if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        }
    });


    // Remove the Correct/Incorrect comment and score from all questions
    document.querySelectorAll('h3.feedback-header').forEach(header => {
        if (header.querySelector('span') && header.querySelector('br')) {
            header.remove();
    }
    });


    // Adds the individual feedback button to each question
    // Hide all feedback (not delete)
    document.querySelectorAll('.gcb-question-row').forEach(questionDiv => {
        var feedbackDiv = questionDiv.querySelector('.qt-feedback:not(.qt-hidden)');
        if (feedbackDiv) {
            feedbackDiv.style.display = 'none';

            // Create a toggle ans button for each question
            var toggleButton = document.createElement('button');
            toggleButton.innerText = 'Reveal Answer';
            toggleButton.style.marginBottom = '10px';
            toggleButton.style.border = '2px solid gray';
            toggleButton.style.borderRadius = '8px';
            toggleButton.style.padding = '5px 10px';

            // Insert this toggle button just above the currently hidden feedback block
            feedbackDiv.parentNode.insertBefore(toggleButton, feedbackDiv);

            // If clicked, reveal/hide feedback block
            toggleButton.addEventListener('click', function() {
                if (feedbackDiv.style.display === 'none') {
                    feedbackDiv.style.display = 'block';
                    toggleButton.innerText = 'Hide Answer';
                } else {
                    feedbackDiv.style.display = 'none';
                    toggleButton.innerText = 'Reveal Answer'
                }
            });
        }
    });
}

// Ind mode button listener
document.getElementById('ind-mode').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: indMode
        });
    });
});

// Remove Ans button listener
document.getElementById('remove-ans').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: clearInputs
        });
    });
});

// Remove feedback button listener
document.getElementById('remove-feedback').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: removeFeedbackElements
        });
    });
});