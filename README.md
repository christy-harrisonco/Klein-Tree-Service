# Klein Tree Services - Website

This is the official website for **Klein Tree Services** based in Paynesville, MN.

## 🚀 Deployment Instructions (GitHub + GoDaddy)

### 1. Repository Setup
The repository is now configured for the GitHub account: `christy-harrisonco`.

### 2. Local Development
To run the site locally for testing:
```bash
npm install
npm run dev
```

### 3. Build for Production
To create the optimized files for your live domain:
```bash
npm run build
```
This generates a `dist` folder containing the files you need to host.

### 4. Connecting your GoDaddy Domain
If using **GitHub Pages**:
- Go to Repository **Settings** > **Pages**.
- Set the source to the `main` branch (or your deploy branch).
- Under "Custom domain", enter your GoDaddy domain (e.g., `kleintreeservices.com`).
- On **GoDaddy**, update your DNS settings to point to GitHub's IP addresses (check GitHub's latest documentation for the specific A records).

If using **Vercel or Netlify** (Highly Recommended):
- Connect this GitHub repo to your hosting account.
- The build command (`npm run build`) and output directory (`dist`) will be detected automatically.
- Add your custom domain in the hosting dashboard and follow the GoDaddy DNS instructions they provide.

## 🛠 Features
- **React 19 + Vite**: High performance and ultra-fast loading.
- **Tailwind CSS**: Professional, rugged arborist branding.
- **Gemini AI Shop Foreman**: Interactive AI assistant for customer queries.
- **Mobile Optimized**: Responsive design for crews in the field.

---
© 2025 Klein Tree Services | Managed by christy-harrisonco