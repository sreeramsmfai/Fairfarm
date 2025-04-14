document.addEventListener('DOMContentLoaded', function() {
    // Configuration for API endpoint
    const API_BASE_URL = 'http://localhost:8001';

    // Helper function to handle form submissions
    async function handleFormSubmission(formId, resultBoxId, endpoint) {
        const form = document.getElementById(formId);
        const resultBox = document.getElementById(resultBoxId);

        if (!form || !resultBox) {
            console.error(`Form or result box not found: ${formId}, ${resultBoxId}`);
            return;
        }

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            resultBox.innerHTML = `
                <div class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p>Processing your request...</p>
                </div>
            `;

            // Convert FormData to JSON
            const formData = new FormData(form);
            const jsonData = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const resultKey = Object.keys(data)[0]; // Dynamically get the result key
                resultBox.innerHTML = formatAnalysisResult(data[resultKey]);
            } catch (error) {
                console.error('Submission error:', error);
                resultBox.innerHTML = `
                    <div class="alert alert-danger">
                        <strong>Error:</strong> 
                        ${error.message || 'Unable to process your request'}
                        <br>
                        Please check your internet connection and try again.
                    </div>
                `;
            }
        });
    }

    // Setup form submissions
    handleFormSubmission('soilForm', 'soilResult', '/analyze_soil');
    handleFormSubmission('cropForm', 'cropResult', '/recommend_crops');
    handleFormSubmission('pestForm', 'pestResult', '/pest_management');

    // Optional: Add form validation
    function addFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }
    addFormValidation();

    // Helper function to format analysis results with Markdown-style formatting
    function formatAnalysisResult(text) {
        if (!text) return '<p class="text-danger">No results received.</p>';
        
        // Escape HTML to prevent XSS
        const escapeHTML = (str) => str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag));

        // Convert line breaks and escape HTML
        let formatted = escapeHTML(text)
            .replace(/\n\n/g, '</p><p>') // Paragraph breaks
            .replace(/\n/g, '<br>'); // Line breaks
        formatted = `<p>${formatted}</p>`;
        
        // Convert markdown-style lists to HTML lists
        formatted = formatted.replace(/(\d+\.\s+.*?)<br>/g, '<li>$1</li>');
        formatted = formatted.replace(/(<li>.*?<\/li>)+/g, '<ol>$&</ol>');
        
        // Bold important headings
        const headings = [
            'Soil quality', 'Recommended crops', 'Soil treatments', 
            'Management practices', 'Top \\d+ recommended crops', 
            'Expected yield', 'Growing duration', 'Special considerations', 
            'Market potential', 'Likely pest', 'Organic pest control', 
            'Chemical treatment', 'Preventive measures', 'Impact on yield', 
            'Recommended irrigation', 'Water requirements', 
            'Irrigation schedule', 'Water conservation', 'Return on investment'
        ];
        
        headings.forEach(heading => {
            const regex = new RegExp(`(${heading})`, 'gi');
            formatted = formatted.replace(regex, '<strong>$1</strong>');
        });
        
        return formatted;
    }

    // Optional: Error logging and monitoring
    window.addEventListener('error', function(event) {
        console.error('Unhandled error:', event.error);
    });
});
