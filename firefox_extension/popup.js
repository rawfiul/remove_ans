document.getElementById('remove-ans').addEventListener('click', () => {
    const scriptToInsert = `document.querySelectorAll('input').forEach(function(input) {
        if (input.type === 'text' || input.type === 'password' || input.type === 'email' || input.type === 'number') {
            input.value = '';
        } else if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        }
    });`
 
    // Inject the script into the active tab
    browser.tabs.executeScript({
      code: scriptToInsert
    });
  });


document.getElementById('remove-feedback').addEventListener('click', () => {
const scriptToInsert = `document.querySelectorAll('.feedback-header, .faculty-answer').forEach(function(element) {
    element.remove();
});`

    // Inject the script into the active tab
    browser.tabs.executeScript({
        code: scriptToInsert
      });
    });