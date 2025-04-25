# Awaaz Portal

A modern web portal for Awaaz services, built with React and Vite.

## Features

- User authentication with JWT
- Responsive design with Tailwind CSS
- Form validation
- Modern UI components

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd awaaz-portal
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_BASE_URL=http://your-api-url.com/api
```

## Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   ├── config/         # App configuration
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
└── vite.config.js      # Vite configuration
```

## Technologies Used

- React 19
- Vite 6
- Tailwind CSS
- ESLint

## License

This project is licensed under the MIT License.

## Deployment on Netlify

1. **Set Environment Variable:**
   - Go to your Netlify dashboard for this site.
   - Navigate to Site settings > Build & deploy > Environment > Environment variables.
   - Add `VITE_API_BASE_URL` and set its value to your deployed backend API URL (e.g., `https://your-backend.onrender.com/api`).

2. **Client-side Routing:**
   - The `_redirects` file in the `public` folder ensures that all routes are redirected to `index.html`, allowing React Router to handle them. This prevents 404 errors when refreshing or directly accessing routes like `/login` or `/register`.

3. **Build and Deploy:**
   - Push your changes to your repository. Netlify will automatically build and deploy your site.
