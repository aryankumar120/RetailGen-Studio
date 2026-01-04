# RetailGen Studio - Features Documentation

## Core Features

### 1. Visual Canvas Editor

**Description**: Drag-and-drop interface for composing creative assets

**Key Capabilities**:
- Canvas manipulation with Fabric.js
- Layer management
- Object transformations (resize, rotate, scale)
- Grid snapping
- Undo/Redo (coming soon)

**How to Use**:
1. Open the editor
2. Upload assets from the Asset Panel
3. Drag and drop onto canvas
4. Transform using handles
5. Add text and shapes

---

### 2. Asset Management

**Description**: Upload, organize, and manage creative assets

**Supported Formats**:
- PNG
- JPG/JPEG
- WEBP

**Features**:
- Drag-and-drop upload
- Multi-file upload
- Asset preview
- Quick delete
- Click to add to canvas

**Limits**:
- Max file size: 10MB per image
- Max upload: 10 images at once

---

### 3. AI Background Removal

**Description**: Automatically remove backgrounds from product images using U2Net AI model

**How It Works**:
- Uses `rembg` library with U2Net neural network
- Processes images client-side and server-side
- Returns transparent PNG

**How to Use**:
1. Select an image on canvas
2. Go to AI Tools panel
3. Click "Remove Background"
4. Wait for processing (~2-5 seconds)
5. Background-removed image replaces original

**Limitations**:
- Works best with clear product images
- Complex backgrounds may have artifacts
- Processing time depends on image size

---

### 4. AI Layout Suggestions

**Description**: Get AI-powered layout recommendations using GPT-4

**Features**:
- Analyzes current canvas composition
- Generates 3 layout variations:
  - Minimal Clean
  - Bold Attention-Grabbing
  - Balanced Professional
- One-click apply

**How to Use**:
1. Create initial layout on canvas
2. Go to AI Tools panel
3. Click "Generate Layout Ideas"
4. Review suggestions
5. Click on any suggestion to apply

**Note**: Requires OpenAI API key

---

### 5. Compliance Validation

**Description**: Automated checking against retailer and brand guidelines

**Compliance Rules**:
1. **Logo Presence** (Error): Brand logo must be present
2. **Logo Size** (Warning): Logo should be at least 5% of canvas width
3. **Text Readability** (Error): Minimum 12pt font size
4. **Color Contrast** (Warning): Sufficient contrast required
5. **Spacing** (Info): 20px minimum padding from edges
6. **Content Appropriateness** (Error): Family-friendly content check using Claude AI

**How to Use**:
1. Complete your creative design
2. Go to AI Tools panel
3. Click "Check Compliance"
4. Review results
5. Fix any errors or warnings
6. Re-check until all pass

**Severity Levels**:
- **Error**: Must fix before export
- **Warning**: Should fix for best practices
- **Info**: Suggestions for improvement

---

### 6. Brand Kit Manager

**Description**: Store and apply brand identity (colors, fonts, logos)

**Features**:
- Custom color palette creation
- Predefined color palettes
- Visual color picker
- Click to apply to selected object
- Color naming and organization

**How to Use**:
1. Go to Brand Kit panel
2. Click "+" to add new color
3. Pick color and name it
4. Select object on canvas
5. Click brand color to apply

**Predefined Palettes**:
- Modern Blue
- Warm Sunset
- Fresh Green

---

### 7. Multi-Format Export

**Description**: Export creatives in multiple social media and retail formats

**Supported Formats**:
1. **Facebook Feed**: 1200×628px
2. **Facebook Post**: 1080×1080px
3. **Instagram Post**: 1080×1080px
4. **Instagram Story**: 1080×1920px
5. **In-Store Display**: 1920×1080px

**Export Options**:
- PNG (transparency supported)
- JPG (smaller file size)
- Auto-optimization to <500KB

**How to Use**:
1. Complete your design
2. Go to Export panel
3. Select desired format
4. Click "Export as PNG" or "Export as JPG"
5. Or click "Export All Formats" for batch export

**Features**:
- Canvas auto-resizes to selected format
- Maintains aspect ratio
- Batch export all formats with one click

---

### 8. Image Optimization

**Description**: Automatically compress and optimize images to meet size requirements

**Specifications**:
- Target size: <500KB
- Quality: 90% (auto-adjusts)
- Format: JPEG optimized
- Preserves visual quality

**How It Works**:
- Starts at 90% quality
- Iteratively reduces quality until size target met
- Minimum quality: 10%
- Uses PIL optimization

---

## Quick Actions

### Add Text
1. Click "Add Text" in Asset Panel
2. Text appears on canvas
3. Double-click to edit
4. Style using properties panel

### Add Shapes
1. Click "Add Shape" in Asset Panel
2. Rectangle appears on canvas
3. Transform and style as needed
4. Change color using Brand Kit

---

## Keyboard Shortcuts

Coming soon in v1.1:
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Shift + Z`: Redo
- `Delete`: Remove selected object
- `Ctrl/Cmd + D`: Duplicate
- `Ctrl/Cmd + S`: Save project

---

## Best Practices

### For Best Results:

1. **Use High-Quality Images**: 1080px+ recommended
2. **Remove Backgrounds First**: Process packshots before composing
3. **Check Compliance Early**: Validate throughout design process
4. **Save Frequently**: Use project save feature
5. **Test Multiple Formats**: Preview in all export sizes
6. **Use Brand Kit**: Maintain consistency across creatives

### Performance Tips:

1. Limit canvas objects to <20 for smooth performance
2. Compress large images before upload
3. Use PNG for transparency, JPG for photos
4. Clear unused assets regularly

---

## Limitations & Known Issues

- Undo/Redo not yet implemented
- Project save currently in-memory only (resets on refresh)
- Collaboration features coming in v2.0
- Template library coming soon
- Batch processing available in future release

---

## Future Enhancements

- AI-generated copy suggestions
- Smart crop detection
- A/B testing recommendations
- Version history
- Team collaboration
- Template marketplace
- Performance analytics integration
