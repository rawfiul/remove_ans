// Makes sure the Individual Mode cant be reclicked after clicking once
document.addEventListener('DOMContentLoaded', function() {
    var myButton = document.getElementById('ind-mode');
    myButton.addEventListener('click', function() {
        myButton.disabled = true;
    });
});



document.getElementById('remove-ans').addEventListener('click', () => {
    const scriptToInsert = `document.querySelectorAll('input').forEach(function(input) {
        if (input.type === 'text' || input.type === 'password' || input.type === 'email' || input.type === 'number') {
            input.value = '';
        } else if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        }
    });
    // Select all disabled input elements
    const disabledInputs = document.querySelectorAll('input:disabled');

    // Enable each input
    disabledInputs.forEach(input => {
        input.disabled = false;
    });

    `
 
    // Inject the script into the active tab
    browser.tabs.executeScript({
        code: scriptToInsert
    }).catch(error => {
        console.error('Failed to inject script:', error);
    });
    
  });


document.getElementById('remove-feedback').addEventListener('click', () => {
const scriptToInsert = `document.querySelectorAll('.feedback-header, .faculty-answer, .qt-feedback').forEach(function(element) {
    element.remove();
});`

    // Inject the script into the active tab
    browser.tabs.executeScript({
        code: scriptToInsert
    }).catch(error => {
        console.error('Failed to inject script:', error);
    });
    
    });


document.getElementById('ind-mode').addEventListener('click', () => {
const scriptToInsert = `
// Clicks the submit button if it exists
const submitButton = document.querySelector('.gcb-button.qt-check-answer-button'); 
if (submitButton) {
    submitButton.click();
    // Exists the dailog popup
    setTimeout(() => {
        const secondButton = document.querySelector('.btn.btn-link.btn-cancel.ng-star-inserted');
        if (secondButton) {
            secondButton.click();
        }
    }, 10);
};

// Removes all existing inputs from entire page
document.querySelectorAll('input').forEach(function(input) {
    if (input.type === 'text' || input.type === 'password' || input.type === 'email' || input.type === 'number') {
        input.value = '';
    } else if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = false;
    }
});
// Select all disabled input elements
const disabledInputs = document.querySelectorAll('input:disabled');

// Enable each input
disabledInputs.forEach(input => {
    input.disabled = false;
});


// Select all h3 elements with the class feedback-header
const headers = document.querySelectorAll('h3.feedback-header');

headers.forEach(header => {
  // Check if the header contains both span and br elements
  if (header.querySelector('span') && header.querySelector('br')) {
    // Remove the header and its contents from the DOM
    header.remove();
  }
});


// Adds the feedback button to each question
document.querySelectorAll('.gcb-question-row').forEach(questionDiv => {
    const feedbackDiv = questionDiv.querySelector('.qt-feedback');
    
    if (feedbackDiv) {
        feedbackDiv.style.display = 'none';

        const toggleButton = document.createElement('button');
        toggleButton.innerText = 'Show Feedback';
        toggleButton.style.marginBottom = '10px';

        toggleButton.style.border = '2px solid green';
        toggleButton.style.borderRadius = '8px';
        toggleButton.style.padding = '5px 10px';

        feedbackDiv.parentNode.insertBefore(toggleButton, feedbackDiv);

        toggleButton.addEventListener('click', function() {
            if (feedbackDiv.style.display === 'none') {
                feedbackDiv.style.display = 'block';
                toggleButton.innerText = 'Hide Feedback';

                toggleButton.style.border = '2px solid red';
            } else {
                feedbackDiv.style.display = 'none';
                toggleButton.innerText = 'Show Feedback';

                toggleButton.style.border = '2px solid green';
            }
        });
    }
});
`

    // Inject the script into the active tab
    browser.tabs.executeScript({
        code: scriptToInsert
    }).catch(error => {
        console.error('Failed to inject script:', error);
    });
    
    });




