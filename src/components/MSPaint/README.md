# MSPaint Component - Preloading Images

## Overview
The MSPaint component now supports preloading images in two modes:
1. **Coloring Book Mode** - Converts images to black line art for coloring
2. **Full Color Mode** - Loads images with their original colors preserved

## Usage

### Basic Usage with Raster Image (PNG/JPG)
```jsx
import MSPaint from 'components/MSPaint'

// Full color image (no conversion)
<MSPaint initialImage="/images/photo.png" />

// Convert to black line art for coloring
<MSPaint 
  initialImage="/images/photo.png" 
  threshold={128} // Converts to black/white
/>

// Using base64 data
<MSPaint initialImage="data:image/png;base64,..." />

// With custom threshold for black/white conversion
<MSPaint 
  initialImage="/images/coloring-page.png" 
  threshold={100} // Lower = more black lines (0-255)
/>
```

### Image Modes

#### Full Color Mode (No Threshold)
When you don't provide a `threshold` prop:
- Image loads with all original colors preserved
- Perfect for editing photos or full-color artwork
- All paint tools work on top of the image

#### Coloring Book Mode (With Threshold)
When you provide a `threshold` prop:
- Converts image to pure black lines on white background
- Perfect for creating coloring pages from any image
- Threshold values:
  - **0-100**: More pixels become black (thicker lines)
  - **100-200**: Fewer pixels become black (thinner lines)
  - **128**: Default, works for most images

## How It Works

1. The image is loaded onto the canvas
2. All pixels are converted to pure black or white based on the threshold
3. The result acts exactly like user-drawn lines:
   - Can be filled with the paint bucket tool
   - Can be erased
   - Can be painted over
   - Preserves all MSPaint functionality

## Image Preparation Tips

### Creating Coloring Pages
1. Use black lines on white background
2. Ensure lines are closed for proper fill areas
3. Keep line thickness consistent (2-4px works well)
4. Avoid anti-aliasing for cleaner fills

### Converting Existing Images
If you have a colored image:
1. Convert to grayscale first
2. Increase contrast
3. Use threshold adjustment to get clean lines
4. Save as PNG for best quality

## Example: Simple Coloring Page
```jsx
// In your page component
import MSPaint from 'components/MSPaint'

export default function ColoringBook() {
  // Convert any image to black line art
  const hedgehogOutline = '/images/hedgehog-outline.png'
  
  return (
    <MSPaint 
      initialImage={hedgehogOutline}
      threshold={150} // Adjust for your image
    />
  )
}
```

## Advanced: SVG Support (Future Enhancement)
While not currently implemented, SVG support could be added to:
- Convert SVG paths directly to canvas paths
- Maintain perfect quality at any size
- Support complex shapes and curves

To request SVG support or other features, please open an issue.