# RetreatX Costa Rica

A curated wellness retreat booking platform for Costa Rica — built as a lightweight, static web application.

---

## ✨ Features

- Interactive retreat map with four locations (Nosara, Santa Teresa, Puerto Viejo, Osa Peninsula)
- Passwordless **Magic Link** authentication for the secure dashboard
- Partner ecosystem showcase (Wolaba X, MyCompany, Novalux, Rastarica, 7 Cielos)
- GDPR-compliant secure document vault
- Dark Bauhaus design system with neon-green accents
- Full legal pages: Privacy Policy, Terms of Service, Impressum

---

## 🔒 Security

Every page enforces the following protections both via server-level headers (`_headers`) and HTML `<meta>` tags as a defence-in-depth fallback:

| Header | Value |
|--------|-------|
| Content-Security-Policy | Restricts scripts/styles/fonts to trusted origins only |
| X-Frame-Options | `DENY` — prevents clickjacking |
| X-Content-Type-Options | `nosniff` — prevents MIME sniffing |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | Camera, microphone, and geolocation disabled |

The `_headers` file is picked up automatically by **Netlify**, **Cloudflare Pages**, and compatible static hosts. For NGINX or Apache see [Deployment](#-deployment).

---

## 🚀 Quick Start (run locally)

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js 18+](https://nodejs.org/) (only used for the dev-server; the site itself has no Node dependency)

### 1 — Clone the repository

```bash
git clone https://github.com/iPresidency/Travel.git
cd Travel
```

### 2 — Start the local dev server

```bash
npm start
# → Site available at http://localhost:8080
```

`npm start` runs `npx serve .` — no install step required. Alternatively, any static file server works:

```bash
# Python 3
python3 -m http.server 8080

# PHP
php -S localhost:8080
```

### 3 — Open in your browser

Navigate to **[http://localhost:8080](http://localhost:8080)**.

> **Note:** The Google Maps integration is disabled by default (API key placeholder). The built-in SVG map works without any key.

---

## 🗂 Project Structure

```
.
├── index.html          # Landing page (hero, retreat map, registration)
├── dashboard.html      # Secure vault login portal
├── ecosystem.html      # Partner network showcase
├── privacy.html        # Privacy Policy (GDPR)
├── terms.html          # Terms of Service
├── impressum.html      # Legal Notice
├── css/
│   └── styles.css      # Dark Bauhaus design system
├── js/
│   └── main.js         # Navigation, scroll-reveal, magic-link form, map
├── _headers            # Server security headers (Netlify / Cloudflare Pages)
├── package.json        # npm start → local dev server
└── .gitignore
```

---

## ⚙️ Configuration

### Google Maps (optional)

To enable the real Google Maps integration, edit `index.html` and uncomment the script tag near the bottom of the `#map` section, replacing `YOUR_API_KEY` with a valid key:

```html
<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initGoogleMap"
  async defer
></script>
```

> **Never commit your API key.** Use an environment variable or your hosting platform's secrets management.

---

## 🌐 Deployment

### Netlify / Cloudflare Pages (recommended)

1. Push this repository to GitHub.
2. Connect the repo in the Netlify/Cloudflare Pages dashboard.
3. Set **Build command** to *(none / empty)* and **Publish directory** to `.` (root).
4. The `_headers` file is automatically applied.

### NGINX

Add to your server block to apply security headers:

```nginx
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self';" always;
```

### Docker (NGINX)

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t retreatx .
docker run -p 8080:80 retreatx
```

---

## 📜 License

MIT — see [LICENSE](LICENSE).

© 2026 iPresidency / RetreatX Costa Rica
