# Statin Clinical Trial Decision Aid

**An interactive, client-side web application for exploring cancer-associated venous thromboembolism (VTE) risk factors and Statin Clinical Trial exclusion criteria.**

This project is a lightweight Next.js application providing educational and research-oriented information on cancer-associated VTE. It uses modern web technologies (React, Next.js, Tailwind CSS) to deliver interactive content (buttons, dropdowns, diagrams) without requiring user accounts or storing any Protected Health Information (PHI).

> ⚠️ **Important:** This software is intended for research use only. It must not be used in real-world medical or clinical decision-making settings.

![Static Badge](https://img.shields.io/badge/license-AGPLv3-blue)

## Features

- **Modern stack**: Built with Next.js, React, and Tailwind CSS.
- **No tracking or accounts**: No login, signup, or analytics; PHI is never collected.
- **Interactive content**: Users can explore diagrams and text outputs through simple controls (buttons, dropdowns).
- **Static and dynamic pages**: About and Contact are static informational pages; the main app runs as a client-side single-page experience.
- **Lightweight and fast**: Optimized for quick load times and easy hosting.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Ang-Li-Lab/statin-website.git
cd statin-website
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```


## Terms of Use

By using this website or deploying this code, you agree to the [Terms & Conditions](./TERMS.md). In brief:

- Informational/educational use only; not for clinical decision-making.
- No PHI is collected or stored.
- Content and code are provided “as is” without warranties.


## License

This repository is licensed under the AGPLv3 License. See [LICENSE](./LICENSE) for details.

