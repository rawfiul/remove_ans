// Function to clear inputs (Button 1 functionality)
function clearInputs() {
    document.querySelectorAll('input').forEach(function(input) {
        if (input.type === 'text' || input.type === 'password' || input.type === 'email' || input.type === 'number') {
            input.value = '';
        } else if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        }
    });
}

// Function to remove feedback elements (Button 2 functionality)
function removeFeedbackElements() {
    document.querySelectorAll('.feedback-header, .faculty-answer').forEach(function(element) {
        element.remove();
    });
}

// Button 1 (Clear inputs) event listener
document.getElementById('remove-ans').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: clearInputs
        });
    });
});

// Button 2 (Remove feedback elements) event listener
document.getElementById('remove-feedback').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: removeFeedbackElements
        });
    });
});
