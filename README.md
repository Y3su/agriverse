# AgriVerse 🌱

![React](https://img.shields.io/badge/React-18-blue?logo=react) 
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript) 
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3-blue?logo=tailwind-css) 
![Supabase](https://img.shields.io/badge/Supabase-DB-green?logo=supabase) 
![Vite](https://img.shields.io/badge/Vite-4-purple?logo=vite)

**AgriVerse** is an innovative **online agricultural marketplace**, connecting farmers, sellers, and buyers through a seamless web platform. Users can browse, sell, and purchase agricultural products with ease.

---

## 🚀 Project Overview

AgriVerse aims to **digitize agricultural trade**, providing:

- Multi-page **React SPA** with smooth routing
- **User authentication** and roles (Buyer, Seller, Admin)
- Product browsing, filtering, and searching
- **Add to cart & checkout functionality**
- Seller & Admin dashboards for product and order management
- **Responsive and modern UI** with Tailwind CSS and shadcn‑ui
- Real-time notifications for user actions

---

## 🖼️ Demo / Screenshots

![Marketplace](./public/placeholder.png)  
*Marketplace view with product grid and filters.*

![Product Page](./public/placeholder.png)  
*Product details modal with add-to-cart functionality.*

**Live Demo:** [🚧 Under Construction]  

---

## 📂 Folder Structure

```
/
├─ public/               → Static assets (images, favicon)
├─ src/
│   ├─ assets/           → Images and icons
│   ├─ components/       → Reusable UI components
│   ├─ contexts/         → React Contexts (Auth, Cart, Language)
│   ├─ hooks/            → Custom React hooks
│   ├─ integrations/     → Supabase API client and helpers
│   ├─ lib/              → Utility functions
│   ├─ pages/            → Application pages and routes
│   ├─ App.tsx           → App root and routing
│   └─ main.tsx          → React entry point
├─ package.json           → Dependencies and scripts
├─ tsconfig.json          → TypeScript configuration
├─ vite.config.ts         → Vite configuration
└─ README.md              → Project documentation
```

---

## ⚙️ Installation

1. Clone the repo
```bash
git clone https://github.com/Y3su/agriverse.git
cd agriverse
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```env
VITE_SUPABASE_URL=supabase-url
VITE_SUPABASE_ANON_KEY=anon-key
```

4. Run the development server
```bash
npm run dev
```

5. Open `http://localhost:8080` in your browser.

---

## 🌟 Features

- **User Authentication:** Sign up, login, and role-based access  
- **Marketplace:** Browse, filter, search, and view products  
- **Seller Dashboard:** Add and manage products  
- **Admin Dashboard:** Approve products and manage orders  
- **Cart & Checkout:** Add products, view cart, and checkout  
- **Responsive UI:** Works on desktop, tablet, and mobile  
- **Notifications:** Real-time toast alerts for user actions  

---

## 👨‍💻 About the Developer

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
