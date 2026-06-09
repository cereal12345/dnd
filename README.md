# DnD Web App

A Dungeons & Dragons campaign management web app with draggable tokens, background images, and dynamic grid coloring.

## Features

- **Draggable Tokens**: Move character tokens across the grid
- **Token Management**: Double-click to edit token properties (name, max HP, current HP, AC)
- **Quick Delete**: Right-click any token to delete with confirmation
- **Background Upload**: Upload a JPG background image for your battle map
- **Smart Grid Colors**: Grid automatically switches between black and white based on background brightness
- **Compact UI**: User-friendly interface designed for battle management

## Deployment

This app is ready to deploy on Render.com:

1. Connect your GitHub repository
2. Create a new Web Service pointing to `https://github.com/cereal12345/dnd`
3. Build command: `npm install`
4. Start command: `npm start`
5. The app will be available at your Render URL

## Local Development

```bash
npm install
npm start
```

The app will run on `http://localhost:3000`

## Usage

1. **Add Tokens**: Click "Add Token" and enter character details
2. **Edit Tokens**: Double-click a token to modify name, HP, and AC
3. **Move Tokens**: Click and drag tokens to new positions on the grid
4. **Delete Tokens**: Right-click a token and confirm deletion
5. **Set Background**: Upload a JPG image to use as the battle map background
6. **Grid Colors**: Grid color automatically adjusts for readability

## Tech Stack

- React
- Vite
- Tailwind CSS