# MSPaint Component - Canvas Preservation Issue

## Issue Description
When the MSPaint window is minimized in the windowed environment, the canvas content is cleared upon restoration. This appears to be because React unmounts the component when it's not in the viewport, causing the canvas to lose its content.

## Root Cause
The canvas element's content is not preserved when the component unmounts/remounts. The canvas history is stored in state, but the actual canvas rendering is lost.

## Proposed Solution
To fix this issue in the parent windowed environment:

1. **Option 1: Prevent Unmounting**
   - Modify the window manager to hide components instead of unmounting them when minimized
   - Use CSS `display: none` or `visibility: hidden` instead of conditional rendering
   - This preserves the DOM and canvas content

2. **Option 2: Canvas State Restoration**
   - In the MSPaint component, add a `useEffect` that restores the canvas from history when the component mounts
   - Check if there's existing history and restore the last state:
   ```javascript
   useEffect(() => {
     if (canvasHistory.length > 0 && historyIndex >= 0) {
       const canvas = canvasRef.current
       const ctx = canvas?.getContext('2d')
       if (ctx && canvas) {
         ctx.putImageData(canvasHistory[historyIndex], 0, 0)
       }
     }
   }, []) // Run once on mount
   ```

3. **Option 3: External Canvas Storage**
   - Store canvas data in a parent component or context that persists
   - Pass canvas state as props to MSPaint component
   - This allows the window manager to maintain canvas state across minimize/restore cycles

## Recommended Approach
Option 1 is the cleanest solution as it prevents the issue entirely. The window manager should be modified to hide windows rather than unmount them when minimized.