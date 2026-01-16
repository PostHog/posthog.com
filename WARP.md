# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- **Start development server**: `yarn start` (runs on port 8001)
- **Clean and restart**: `yarn clean && yarn && yarn start` (when things get weird)
- **Build production**: `yarn build`
- **Serve production build locally**: `gatsby build && gatsby serve`
- **Clean build cache**: `gatsby clean`

### Code Quality
- **Format code**: `yarn format` (formats all HTML, JS, TS, TSX, JSON, YML, CSS, SCSS)
- **Format docs specifically**: `yarn format:docs` (fixes MDX formatting for changed files)
- **Run tests**: `yarn test-redirects` (tests redirect configuration)
- **Check links after build**: `yarn check-links-post-build`

### Content & Assets
- **Update SVG sprite**: `yarn update-sprite` (for product feature icons)
- **Generate TypeScript types**: `yarn typegen` (for Kea logic)

### Storybook
- **Run Storybook**: `yarn storybook` (port 6006)
- **Build Storybook**: `yarn build-storybook`

## Architecture Overview

### Desktop OS-Style Website
PostHog.com is designed as a desktop operating system experience in the browser:
- **Desktop Environment**: The main interface (`src/components/Desktop/index.tsx`) renders a macOS-style desktop with draggable icons
- **Window Management**: Pages open in draggable, resizable windows (`src/components/AppWindow/index.tsx`) that can be maximized, minimized, or snapped
- **Multi-Window Support**: Users can have multiple windows open simultaneously with a windows panel to manage them
- **Global State**: Window management and app state handled by `src/context/App.tsx`

### Content Architecture
- **Gatsby Static Site**: Built with Gatsby 4.25.9, hosted on Vercel
- **MDX Content**: All content stored in `/contents/` directory (docs, blog, handbook, tutorials, etc.)
- **Multi-Product Structure**: PostHog is multi-product, with product data centralized in hooks (`useProduct.ts`, `useProducts.tsx`)
- **Customer Data**: Customer information centralized in `useCustomers.ts`
- **Navigation**: All navigation menus defined in `src/navs/index.js`

### Key Integrations
- **Squeak Forum**: In-house community forum integration
- **Ashby Jobs**: Job listings via Ashby integration
- **Shopify Merch Store**: Headless Shopify integration for merchandise
- **Algolia Search**: Site-wide search functionality
- **PostHog Analytics**: Self-hosted analytics (naturally)

### Component Structure
- **Radix UI**: Custom Radix components in `/src/components/RadixUI/` with "Radix" prefix for imports
- **OS Components**: Custom-built components prefixed with "OS" (OSButton, OSFieldset, OSIcons, OSTable, OSTabs)
- **App Components**: Desktop "apps" like ReaderView, Wizard, Explorer for different content types

### Styling
- **Tailwind CSS**: Primary styling system with custom color schemes
- **Three Color Schemes**: Primary/secondary/tertiary with light/dark mode support
- **Design System**: Consistent spacing, colors defined in `tailwind.config.js`
- **Custom CSS**: Additional styles in `src/styles/global.css`

## Environment Setup
- **Node**: Version 22.x required (use `nvm use` if available)
- **Package Manager**: Yarn (not npm)
- **Port**: Development server runs on 8001 (not default 8000)
- **Apple Silicon**: May need to install vips (`brew install vips`) and remove node_modules

## Working with Content
- **Content Location**: All written content in `/contents/` directory
- **Product Data**: Check `useProduct.ts` first, then `useProducts.tsx` for product information
- **Customer References**: Use `useCustomers.ts` for customer data (names, logos, quotes)
- **Navigation Changes**: Modify `src/navs/index.js` but note it's shared with live site

## API Integrations
- **Local PostHog API**: Override schema URL with `POSTHOG_OPEN_API_SPEC_URL` env var
- **External Services**: Require API keys for Ashby (jobs), GitHub (contributors), Shopify (merch)
- **Development**: Most features work without API keys, but some require environment variables

## Build & Deployment
- **Vercel Hosting**: Deployed via Vercel with branch previews
- **Build Process**: Gatsby build with custom post-build processing
- **Redirects**: Test redirect configuration with Jest
- **Performance**: Uses Cloudinary for image optimization and lazy loading