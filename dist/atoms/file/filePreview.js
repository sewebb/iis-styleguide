"use strict";
const fileInputs = document.querySelectorAll('input[data-id=fileInput]');
Array.prototype.forEach.call(fileInputs, (fileInput)=>{
    const fieldGroup = fileInput.closest('.field-group');
    const filePreview = fieldGroup ? fieldGroup.querySelector('[data-id="filePreview"]') : null;
    const label = fileInput.nextElementSibling;
    const removebutton = label.nextElementSibling;
    const validImgFormats = [
        'image/jpeg',
        'image/png',
        'image/gif'
    ];
    function handleFileUpload(inputEvent) {
        const inputFile = inputEvent.target.files[0];
        const reader = new FileReader();
        if (!filePreview || !removebutton || !inputFile) {
            return;
        }
        if (validImgFormats.indexOf(inputFile.type) === -1) {
            console.warn('Välj en bildfil i något av följande filformat: .png, .jpg, and .gif.');
            filePreview.src = '';
            return;
        }
        reader.onload = (readerEvent)=>{
            filePreview.src = readerEvent.target.result;
        };
        reader.readAsDataURL(inputFile);
    }
    if (!filePreview || !removebutton) {
        return;
    }
    removebutton.addEventListener('click', ()=>{
        filePreview.src = '';
    });
    fileInput.addEventListener('change', handleFileUpload, false);
});
