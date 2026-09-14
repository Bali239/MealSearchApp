# Meal Search App (React Version)

This is the React version of the meal search application built with Vite.

## Overview
The app searches meals from TheMealDB, displays matching recipe cards, opens a detail modal, and lets users save favorites locally in the browser.

## Features
- Search meals by keyword
- View recipe summary cards with images and category details
- Open a modal with ingredients and instructions
- Toggle favorites and persist them with localStorage
- Responsive layout with loading and empty states

## Run locally
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
```

## Project Notes
- The app uses React Router for page navigation between the home screen and favorites screen.
- Shared app state is managed through a context provider.
- Styling is handled with custom CSS and utility classes.
