# Wareng Jaya Teknik Website

![Wareng Jaya Teknik Banner](public/images/hero.png)

## About This Project

Wareng Jaya Teknik is a professional engineering and technical services company website built with React and Vite. The website showcases the company's services in metal fabrication, engineering solutions, and technical expertise.

### Key Features

- **Modern Design**: Built with React 19 and styled with Tailwind CSS 4
- **Responsive Layout**: Optimized for all devices from mobile to desktop
- **Performance Optimized**: Fast loading with Vite bundling
- **Dark/Light Mode**: Theme toggle functionality for user preference
- **SEO Friendly**: Includes meta tags, structured data, and sitemap
- **Animated UI**: Smooth animations using Framer Motion
- **Image Gallery**: Project showcase with lightbox functionality

### Pages

- **Home**: Company introduction and service highlights
- **About Us**: Company history and team information
- **Services**: Detailed service offerings
- **Project Gallery**: Showcase of completed projects
- **Contact**: Contact form and information

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **CSS Framework**: Tailwind CSS 4
- **Routing**: React Router 7
- **Animations**: Framer Motion
- **Icons**: React Icons
- **SEO**: React Helmet Async
- **Image Gallery**: Yet Another React Lightbox

## Installation Guide

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or yarn (v1.22.0 or higher)

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/wareng-jaya-teknik.git
   cd wareng-jaya-teknik
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   The development server will start at [http://localhost:5173](http://localhost:5173)

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Production Deployment

### Build for Production

1. **Create optimized production build**

   ```bash
   npm run build
   # or
   yarn build
   ```

   This will generate a `dist` folder with all the optimized assets.

2. **Preview the production build locally (optional)**

   ```bash
   npm run preview
   # or
   yarn preview
   ```

### Deployment Options

#### Option 1: Static Hosting (Recommended)

You can deploy the `dist` folder to any static hosting service:

- **Netlify**
  - Connect your GitHub repository
  - Set build command: `npm run build`
  - Set publish directory: `dist`
  - Configure environment variables if needed

- **Vercel**
  - Connect your GitHub repository
  - Vercel will automatically detect Vite configuration
  - Configure environment variables if needed

- **GitHub Pages**
  1. Update `vite.config.js` to include base path:
     ```javascript
     export default defineConfig({
       base: '/wareng-jaya-teknik/',
       // other config...
     })
     ```
  2. Create a deployment script or use GitHub Actions

#### Option 2: Traditional Web Hosting

1. Upload the contents of the `dist` folder to your web server
2. Ensure all requests are redirected to `index.html` for client-side routing
3. Set appropriate cache headers for static assets

## Environment Configuration

Create a `.env` file in the root directory for environment variables:

```
VITE_API_URL=your_api_url_here
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

For production, set these variables in your hosting provider's environment configuration.

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries about this website, please contact at contact@warengjayateknik.com
