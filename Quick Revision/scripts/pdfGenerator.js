const PdfGenerator = {
    generate: async function(content, fileName) {
        try {
            const element = document.createElement('div');
            element.innerHTML = content;
            
            // Base document styling
            element.style.cssText = `
                padding: 40px;
                color: #24292e;
                background-color: #ffffff;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                font-size: 16px;
                max-width: 900px;
                margin: 0 auto;
            `;

            // Style code blocks with darker colors for better visibility
            element.querySelectorAll('pre').forEach(pre => {
                pre.style.cssText = `
                    background-color: #282c34;
                    border-radius: 6px;
                    padding: 16px;
                    overflow-x: auto;
                    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
                    font-size: 14px;
                    line-height: 1.45;
                    margin: 16px 0;
                    border: 1px solid #3e4451;
                `;
            });

            // Style code block content
            element.querySelectorAll('pre code').forEach(code => {
                code.style.cssText = `
                    color: #abb2bf;
                    display: block;
                    overflow-x: auto;
                    padding: 0;
                    background: none;
                `;
            });

            // Style inline code
            element.querySelectorAll('code:not(pre code)').forEach(code => {
                code.style.cssText = `
                    background-color: #282c34;
                    color: #abb2bf;
                    padding: 0.2em 0.4em;
                    border-radius: 3px;
                    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
                    font-size: 85%;
                    border: 1px solid #3e4451;
                `;
            });

            // Add syntax highlighting colors
            const syntaxColors = `
                .keyword { color: #c678dd; }
                .function { color: #61afef; }
                .string { color: #98c379; }
                .number { color: #d19a66; }
                .comment { color: #7f848e; font-style: italic; }
                .class-name { color: #e5c07b; }
                .operator { color: #56b6c2; }
            `;
            const style = document.createElement('style');
            style.textContent = syntaxColors;
            element.appendChild(style);

            const opt = {
                margin: [25, 25],
                filename: `${fileName}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait'
                },
                // Set output to blob for browser preview
                output: 'blob'
            };

            // Show loading state
            const btn = document.getElementById('downloadPdf');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>⏳</span> Generating PDF...';
            btn.disabled = true;

            // Generate PDF as blob and open in new tab
            const pdf = await html2pdf().set(opt).from(element).output('blob');
            const blobUrl = URL.createObjectURL(pdf);
            window.open(blobUrl, '_blank');
            
            // Reset button state
            btn.innerHTML = originalText;
            btn.disabled = false;

            // Clean up blob URL after a delay
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
            
            // Reset button on error
            const btn = document.getElementById('downloadPdf');
            if (btn) {
                btn.innerHTML = '<span>⬇️</span> Download PDF';
                btn.disabled = false;
            }
        }
    }
};

// Make it globally available
window.PdfGenerator = PdfGenerator;
