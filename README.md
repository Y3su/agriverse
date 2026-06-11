# AgriVerse

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20Database-green?logo=supabase)

AgriVerse is a web-based agricultural marketplace built to connect local farmers, sellers, and buyers through a simple digital platform. It helps agricultural products reach a wider market while supporting product browsing, cart management, checkout, seller tools, and admin oversight.

## Project Description

AgriVerse is designed for the farming community of Indang, Cavite, especially the Banaba Cerca Farmers and Irrigators Agriculture Cooperative. The platform gives local farmers a digital space where they can showcase and sell their products directly to consumers, helping increase visibility, improve sales opportunities, and strengthen the connection between farms and households.

The project was developed by five students from Indang, Cavite, with a shared goal of using technology to support local agriculture. By combining a modern marketplace experience with cooperative-centered values, AgriVerse aims to bridge the gap between farmers and consumers and help the agricultural community thrive in the digital age.

## About Us

### Banaba Cerca Farmers and Irrigators Agriculture Cooperative

Banaba Cerca Farmers and Irrigators Agriculture Cooperative is a community of dedicated farmers from Brgy. Banaba Cerca, Indang, Cavite. The cooperative is united by a shared vision for progress, sustainable livelihood, and agricultural excellence.

Founded in November 2019, the organization began with 43 pioneering members who believed in the power of unity and cooperation. What started as a local gathering of farmers grew into a formally recognized association committed to improving agricultural productivity and strengthening the community.

**Recognition and Location**

<<<<<<< Updated upstream
**Live Demo:** [🚧 Under Construction]  
=======
- DOLE Registered: 2020
- SEC Registered: 2023
- Location: Indang, Cavite

### Vision
>>>>>>> Stashed changes

To become a strong and prosperous cooperative in the field of agriculture that promotes adequate livelihood, sustainable farming, and unity of members toward a bountiful community.

### Mission

- Promote the development of farmers through modern knowledge, machinery, and farming technology.
- Promote cooperativism, mutual help, and discipline as the foundation for the success of every member.
- Provide continuous education, training, and opportunities to all members to develop their livelihood and the entire community.

## Developed By

AgriVerse is a passion project created by five dedicated students from Indang, Cavite, who share one goal: to help local farmers increase their sales and reach a wider market. The team believes that technology can bridge the gap between farmers and consumers while empowering the local agricultural community.

| Name | Role |
| --- | --- |
| Lourence Lariosa | Lead Developer |
| John Michael Serdon | UI/UX Designer |
| Brent Cruspe | Project Manager |
| Dale Barro | Tester |
| Nikolai Genesela | Documenter |

> "For the farmers of Indang, by the students of Indang."

## Core Values

- **Unity:** Bringing farmers together for shared progress and success.
- **Empowerment:** Building skills, confidence, and opportunities for agricultural growth.
- **Community:** Supporting cooperation for the betterment of all members.
- **Sustainability:** Promoting eco-friendly and lasting farming practices.

## Features

- User authentication with role-based access for buyers, sellers, and admins
- Marketplace browsing with product listings, details, filters, and search
- Cart and checkout workflow for buyers
- Seller dashboard for adding and managing products
- Admin panel for product approval, announcements, activity logs, and management
- Contact and support pages for user concerns
- Responsive interface for desktop, tablet, and mobile devices
- Supabase integration for authentication, database, and backend services
- AgriBot chat support powered through Supabase Edge Functions

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, TypeScript, Vite |
| Styling and UI | Tailwind CSS, shadcn/ui, Radix UI, lucide-react |
| Backend Services | Supabase Auth, Supabase Database, Supabase Edge Functions |
| State and Data | React Context, TanStack Query |
| Forms and Validation | react-hook-form, Zod |
| Routing | React Router DOM |
| Tooling | ESLint, TypeScript, Vite |

## Folder Structure

```text
/
+-- public/                 Static assets and uploaded images
+-- src/
|   +-- assets/             Images and brand assets
|   +-- components/         Reusable UI and feature components
|   +-- contexts/           Auth, cart, and language contexts
|   +-- hooks/              Custom React hooks
|   +-- integrations/       Supabase client and generated types
|   +-- lib/                Shared utilities
|   +-- pages/              App pages and routes
|   +-- App.tsx             App root and route definitions
|   +-- main.tsx            React entry point
+-- supabase/               Supabase config, migrations, and functions
+-- package.json            Dependencies and scripts
+-- tailwind.config.ts      Tailwind CSS configuration
+-- vite.config.ts          Vite configuration
+-- README.md               Project documentation
```

## Installation

1. Clone the repository.

```bash
git clone https://github.com/Y3su/agriverse.git
cd agriverse
```

2. Install dependencies.

```bash
npm install
```

3. Create a `.env` file and add your Supabase credentials.

```env
<<<<<<< Updated upstream
VITE_SUPABASE_URL=supabase-url
VITE_SUPABASE_ANON_KEY=anon-key
=======
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
>>>>>>> Stashed changes
```

4. Run the development server.

```bash
npm run dev
```

<<<<<<< Updated upstream
5. Open `http://localhost:8080` in your browser.
=======
5. Open the local app in your browser.
>>>>>>> Stashed changes

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
npm run build
npm run build:dev
npm run lint
npm run preview
```

## Future Enhancements

- Online payment gateway integration
- More detailed analytics for sellers and admins
- Expanded farmer profiles and cooperative member pages
- Enhanced order tracking and delivery updates
- Additional language support and accessibility improvements

<<<<<<< Updated upstream
**Lourence Lariosa** – Full-stack Web Developer specializing in **React, TypeScript, and modern frontend architectures**.  

Skills showcased in this project:

- Building **scalable React applications**
- **Integrating Supabase** for authentication & database operations
- Designing **responsive, user-friendly UIs**
- Managing **state and forms efficiently**
- Implementing **role-based dashboards** and dynamic routing

Connect with me: [LinkedIn](https://www.linkedin.com/in/lourence-lariosa-947b26351) | [Email](mailto:lourencelariosa23@gmail.com)

---

## 🔧 Tech Stack

| Layer              | Technology/Library                    |
|-------------------|-------------------------------------|
| Frontend          | React 18, TypeScript, Vite          |
| Styling/UI        | Tailwind CSS, shadcn‑ui, Radix UI   |
| Backend           | Supabase (Auth + Database)           |
| State Management  | React Context, React Query           |
| Forms & Validation| react-hook-form, Zod                 |
| Routing           | React Router DOM                     |
| Utilities         | date-fns, lucide icons               |

---

## 📌 Future Enhancements

- AI-powered **crop recommendation system**  
- Multi-language support  
- Enhanced **analytics dashboard** for sellers/admins  
- Integration with **payment gateways** for real transactions  

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.

---

## 🔗 Links

- GitHub Repo: [https://github.com/Y3su/agriverse](https://github.com/Y3su/agriverse)  
- Live Demo: *(🚧 Under Construction)*
=======
## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
>>>>>>> Stashed changes
