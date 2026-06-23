# Insta Name Lab

A stylish single-page web app that generates cool, trendy, and slightly unique Instagram usernames inspired by popular aesthetic naming patterns.

## Features

- Generates 12 username ideas per run.
- Pattern-based generation inspired by aesthetic username styles (instead of random letter strings).
- Built-in customization controls:
	- Theme selector (Street, Soft Aesthetic, Luxury, Moody, Dreamy)
	- Core word input (seed)
	- Style selector (Balanced, Minimal, Edgy, Cute, Futuristic)
	- Length slider
	- Toggle numbers on/off
	- Toggle dot/underscore separators
	- Toggle two-word combos
	- Toggle uniqueness twists
- One-click copy for every generated name.
- Save favorite usernames to a dedicated favorites section.
- Community username pool:
	- Add one username manually
	- Paste multiple usernames in bulk
	- Upload `.txt`, `.csv`, or `.json` lists
	- Export pool to JSON so others can import and use your shared set
- Responsive layout for desktop and mobile.

## Run Locally

1. Open the project folder.
2. Start a simple local server from this directory:

```bash
python3 -m http.server 5500
```

3. Visit:

```text
http://localhost:5500
```

## Project Structure

- `index.html`: UI layout, controls, and community upload section.
- `styles.css`: Pink/yellow visual theme, responsive behavior, animations.
- `script.js`: Pattern-based generation logic, favorites, and community pool import/export.