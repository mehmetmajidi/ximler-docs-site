# Ximler Documentation Site

A beautiful, modern documentation site built with Next.js 14, featuring:

-    **Responsive Design** - Works perfectly on desktop, tablet, and mobile
-    **Modern UI/UX** - Clean, professional design with smooth animations
-    **Interactive Navigation** - Collapsible sidebar with smooth transitions
-    **Code Examples** - Syntax-highlighted code blocks with copy functionality
-    **Search Ready** - Structured for easy search integration
-    **SEO Optimized** - Meta tags, structured data, and performance optimized

## Features

### 🎨 Beautiful Design

-    Clean, modern interface with Tailwind CSS
-    Smooth animations and transitions
-    Responsive grid layouts
-    Professional color scheme

### 📱 Mobile-First

-    Fully responsive design
-    Touch-friendly navigation
-    Optimized for all screen sizes
-    Progressive Web App ready

### 🔍 Easy Navigation

-    Collapsible sidebar navigation
-    Breadcrumb navigation
-    Quick links and shortcuts
-    Search-ready structure

### 💻 Developer-Friendly

-    Copy-to-clipboard code examples
-    Syntax highlighting
-    Interactive demos
-    Framework-specific guides

## Getting Started

### Prerequisites

-    Node.js 18.0 or higher
-    npm or yarn

### Installation

1. **Navigate to the docs site directory:**

```bash
cd ximler/docs-site
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
docs-site/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── docs/              # Documentation pages
│   │   ├── page.tsx       # Docs overview
│   │   ├── installation/   # Installation guide
│   │   └── quick-start/   # Quick start guide
│   └── demo/              # Demo page
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation
│   └── Footer.tsx         # Site footer
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Pages Overview

### 🏠 Home Page (`/`)

-    Hero section with call-to-action
-    Feature highlights
-    Quick start section
-    Documentation links

### 📚 Documentation (`/docs`)

-    Overview of all documentation sections
-    Quick links to important guides
-    Getting help section

### ⚙️ Installation (`/docs/installation`)

-    System requirements
-    Step-by-step installation guide
-    Troubleshooting section
-    Verification steps

### 🚀 Quick Start (`/docs/quick-start`)

-    Basic HTML example
-    React integration example
-    Running instructions
-    Next steps

### 🎮 Demo (`/demo`)

-    Interactive demo code
-    Running instructions
-    Feature demonstration
-    Troubleshooting

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        // ... more colors
      }
    }
  }
}
```

### Navigation

Update `components/Navigation.tsx` to modify the navigation structure:

```javascript
const navigation = [
     {
          name: "Getting Started",
          href: "/docs",
          icon: BookOpen,
          children: [
               { name: "Installation", href: "/docs/installation" },
               // ... more items
          ],
     },
];
```

### Content

All content is written in React components with TypeScript. Each page is a separate component in the `app/` directory.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Your site will be available at `your-project.vercel.app`

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` directory to Netlify
3. Configure redirects for client-side routing

### Static Export

For static hosting:

```bash
npm run build
npm run export
```

## Performance

The site is optimized for performance with:

-    **Next.js 14** with App Router
-    **Tailwind CSS** for minimal CSS bundle
-    **Image optimization** with Next.js Image component
-    **Code splitting** for faster loading
-    **SEO optimization** with proper meta tags

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This documentation site is part of the Ximler project and follows the same license terms.
