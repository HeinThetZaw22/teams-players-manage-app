# EPL Team Manager

A web app built with **Next.js**, **Redux Toolkit**, and **react-hook-form + Zod**, using the [balldontlie API](https://api.balldontlie.io/epl/v1/players) to manage EPL football players and custom teams.

---

## ✅ Features Implemented

### 🔐 Authentication
- Username-based login using **Redux**.
- Auth state persisted with **Redux Persist** (local storage).
- Displays username after login.
- Logout functionality implemented.
- No backend API used for authentication (as per instructions).

### 👥 Player Management
- Players are fetched from the `balldontlie` API using `useInfiniteQuery`.
- **Infinite scroll** on the homepage, showing 10 players per request.
- Skeleton cards displayed while loading.
- Error and rate-limit handling with `react-hot-toast`.

### 🏀 Team CRUD (Create, Read, Update, Delete)
- Team management is implemented on a **separate route** (`/teams`).
- Each team supports:
  - `name` (must be unique)
  - `region`
  - `country`
  - auto-calculated `player count`
- Team data is stored in **Redux state** and persisted with **local storage**.
- All CRUD actions use **ShadCN dialogs** (modal popups).

### 👨‍👦 Player Assignment to Teams
- Players can be added to a team from a dropdown menu inside each team's **Manage Squad** view.
- Players are **unique per team** (i.e., cannot belong to more than one team).
- When a team is deleted, its players are automatically unassigned.
- You can **remove** players from a team individually.

### ✅ Form Handling & Validation
- Team forms are built with **react-hook-form** and validated using **Zod**.
- Team names must be unique (validated both in form and Redux logic).
- Handles all error and success states with proper user feedback.

---

## 🚀 Tech Stack
- **Next.js**
- **Redux Toolkit** with `redux-persist`
- **TanStack Query** (`react-query`)
- **react-hook-form** + **Zod**
- **Tailwind CSS** + **ShadCN UI**
- **Lucide Icons**
- **balldontlie API**

---

