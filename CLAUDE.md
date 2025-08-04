# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite dev server with hot module replacement
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a React + Vite web application with Tailwind CSS styling.

### Key Technologies
- **React 19** with React Router for client-side routing
- **Vite** as the build tool and dev server
- **Tailwind CSS v4** for styling

### Project Structure
- `/src/App.jsx` - Main app component defining routes
- `/src/main.jsx` - Entry point wrapping App with BrowserRouter
- `/src/components/` - React components including navigation and pages

### Routing
- Landing page at `/`

## Important Notes
- ESLint configured to ignore uppercase unused variables
- Tailwind dark mode enabled with class-based switching