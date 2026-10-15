# Crayonz — Interior Design Studio Website

A responsive, front-end website concept for **Crayonz**, a modern interior design studio. The project presents interior design services, showcases visual inspiration, and gives visitors a simple way to explore the studio and reach out.

## Overview

Crayonz is built with standard web technologies—HTML, CSS, and JavaScript. It is a lightweight static website, so it does not require a database or backend server to run.

## Features

- Responsive layout for desktop and mobile screens
- Interior design studio landing page and service-focused content
- Mobile navigation menu
- Sticky header and section-aware navigation
- Light/dark theme toggle
- Contact form with client-side validation and demo submission behavior
- Smooth, interactive navigation using JavaScript

> **Note:** The contact form is a front-end demo. It validates the form in the browser but is not connected to an email service or backend, so it does not send messages.

## Tech Stack

- **HTML5** — page structure
- **CSS3** — styling and responsive layout
- **JavaScript** — navigation, theme toggle, scroll behavior, and form validation

## Project Structure

```text
Interior-Website/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run Locally

No package installation or build step is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/ArunShankar07/Interior-Website.git
   ```

2. Open the project folder.
3. Open `index.html` in your browser.

For live reload while developing, open the folder in Visual Studio Code and run `index.html` with the **Live Server** extension.

## Deployment

This is a static website and can be hosted on services such as **Vercel**, **GitHub Pages**, or **Render Static Sites**.

For Vercel, import this GitHub repository and use the **Other** framework preset. Since the project has no build process, leave the build command empty and configure the output to serve the repository root if Vercel asks for an output directory. Make sure `index.html`, `style.css`, and `script.js` remain at the root.

## Future Improvements

- Connect the contact form to a backend or email service
- Add project filtering to the gallery
- Improve accessibility with additional keyboard and screen-reader checks
- Add optimized project images and performance checks

## Author

**Arun Shankar P**

- GitHub: [@ArunShankar07](https://github.com/ArunShankar07)

---

This project was created for front-end web development practice and portfolio presentation.