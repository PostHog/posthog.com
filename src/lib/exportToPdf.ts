import { toJpeg } from 'html-to-image'
import jsPDF from 'jspdf'

interface ExportToPdfOptions {
    slideId?: string
    filename?: string
}

// Simple function to convert product handle to readable name
const formatProductName = (handle: string): string => {
    return handle.replace(/[-_]/g, ' ')
}

export const exportToPdf = async ({ slideId, filename }: ExportToPdfOptions = {}) => {
    try {
        let finalFilename = filename
        if (!finalFilename && slideId) {
            const productName = formatProductName(slideId)
            finalFilename = `copy of posthog ${productName} - FINAL (2)`
        } else if (!finalFilename) {
            finalFilename = 'presentation'
        }

        // Find the presentation container
        const containerSelector = slideId ? `[data-presentation-id="${slideId}"]` : '[data-app="Presentation"]'

        const container = document.querySelector(containerSelector)
        if (!container) {
            console.error('Presentation container not found')
            return false
        }

        // Find all slides within the container
        const slideSelector = slideId ? `[data-slide-id="${slideId}"][data-slide]` : '[data-slide]'

        const slideElements = container.querySelectorAll(slideSelector) as NodeListOf<HTMLElement>

        if (slideElements.length === 0) {
            console.error('No slides found')
            return false
        }

        // Hide slide titles during export
        const slideTitles = container.querySelectorAll('.slideName') as NodeListOf<HTMLElement>
        const originalDisplayStyles: string[] = []

        slideTitles.forEach((title, index) => {
            originalDisplayStyles[index] = title.style.display
            title.style.display = 'none'
        })

        try {
            // Create PDF in US Letter landscape format with compression
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'letter',
                compress: true,
            })

            // Remove the first page that jsPDF creates by default
            let isFirstPage = true

            // Process each slide
            for (let i = 0; i < slideElements.length; i++) {
                const slide = slideElements[i]

                // Convert slide to JPEG image with compression
                const dataUrl = await toJpeg(slide, {
                    quality: 0.8, // Reduced quality for compression
                    pixelRatio: 1.5, // Reduced from 2 to 1.5
                    backgroundColor: '#ffffff',
                })

                // Add new page for each slide (except the first one)
                if (!isFirstPage) {
                    pdf.addPage()
                }
                isFirstPage = false

                // Calculate dimensions to fit slide in US Letter landscape page
                // US Letter landscape: 279.4mm x 215.9mm with reduced margin
                const pageWidth = 279.4
                const pageHeight = 215.9
                const margin = 6
                const maxWidth = pageWidth - margin * 2
                const maxHeight = pageHeight - margin * 2

                // Get the original slide dimensions
                const slideRect = slide.getBoundingClientRect()
                const aspectRatio = slideRect.width / slideRect.height

                // Calculate scaled dimensions while maintaining aspect ratio
                let imgWidth = maxWidth
                let imgHeight = maxWidth / aspectRatio

                // If height exceeds page, scale down based on height
                if (imgHeight > maxHeight) {
                    imgHeight = maxHeight
                    imgWidth = maxHeight * aspectRatio
                }

                // Center the image on the page
                const x = (pageWidth - imgWidth) / 2
                const y = (pageHeight - imgHeight) / 2

                // Add image to PDF with JPEG compression
                pdf.addImage(dataUrl, 'JPEG', x, y, imgWidth, imgHeight, '', 'MEDIUM')
            }

            // Download the PDF
            pdf.save(`${finalFilename}.pdf`)

            return true
        } finally {
            // Restore slide titles visibility
            slideTitles.forEach((title, index) => {
                title.style.display = originalDisplayStyles[index] || ''
            })
        }
    } catch (error) {
        console.error('Error exporting to PDF:', error)
        return false
    }
}
