# InstaName Lab - Instagram Username Generator

A beautiful, interactive web app that generates cool, trendy, and unique Instagram usernames with extensive customization options.

## Features

✨ **Smart Username Generation**
- 5 themed wordbanks: Cool & Trendy, Aesthetic, Edgy, Playful, Minimal
- Coherent, real-word combinations instead of random strings
- Guaranteed core word inclusion when provided

🎨 **Customization Controls**
- **Core Word**: Your username will always include your chosen word
- **Media Reference**: Generate usernames inspired by movies, shows, books, etc.
- **Style Options**: Balanced, Short & Punchy, Long & Descriptive, With Numbers, With Dots/Underscores
- **Length Slider**: Control username length (6-24 characters)
- **Toggles**: Enable/disable numbers, dots, underscores, and emoji

📝 **Font Customization**
- UI Font: Choose between Poppins (Modern), Quicksand (Cute), DM Sans (Trendy), Playfair Display (Aesthetic)
- Username Font: Pick from Poppins, Dancing Script (Cute), Pacifico (Playful), Quicksand (Aesthetic)
- Preferences automatically saved to browser

❤️ **Saved Favorites**
- Save your favorite usernames with one click
- Persistent storage across sessions
- Quick copy to clipboard

👥 **Community Username Pool**
- Share usernames you've created with others
- Build a community library of creative handles
- Export your pool as JSON for sharing
- All usernames saved locally in your browser

🎨 **Pink & Yellow Theme**
- Modern gradient background with animated blobs
- Responsive design for all devices
- Smooth animations and transitions

## How to Use

1. **Open the app** in your browser (open `index.html`)
2. **Select a theme** that matches your vibe
3. **Enter a core word** (optional but recommended) - every generated username will include it
4. **Add media reference** (optional) for thematic inspiration
5. **Customize your style** with toggles and selections
6. **Click "Generate Usernames"** to create 12 new options
7. **Copy** any username with the Copy button
8. **Save favorites** by clicking the heart icon
9. **Share with community** by adding your best finds to the pool

## Customization Tips

- **Core Word + Media Reference**: Combine them for super targeted results
- **Font Pairing**: Try Quicksand + Dancing Script for a cute vibe
- **Emoji + Numbers**: Great combo for playful, memorable usernames
- **Underscores**: Use these to break up longer usernames visually

## Storage

All data is stored locally in your browser:
- Favorites: `localStorage` under `insta_generator_favorites`
- Community Pool: `localStorage` under `insta_generator_community`
- Font Preferences: `localStorage` under `font_prefs`

No data is sent to any server.

## Tech Stack

- HTML5
- CSS3 (with CSS variables for theming)
- Vanilla JavaScript (no frameworks)

## Files

- `index.html` - Structure and layout
- `styles.css` - Styling and animations
- `script.js` - Generation logic and interactions

Enjoy creating your perfect Instagram username! 🌟
