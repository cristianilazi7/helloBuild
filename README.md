# HelloBuild Instructions

> **This is an exercise for candidates applying as Software Developers at HelloBuild.**  
> **Due Date:** Listed above.

---

## Exercise Key Components

1. **Single Page App**  
2. **Login**  
3. **Sign Up**  
4. **Profile Page**  
5. **List Repositories**  
   - Using the [GitHub GraphQL API](https://developer.github.com/v4/object/user/)

### Overview

Create a single-page app where a user can **Sign Up** (credentials stored locally or via a backend API for bonus points). Then **Login** (validate via local storage or API). Once logged in, the user should have a section listing their **GitHub repositories** and be able to **mark favorites**. **OAuth** is required to access the GitHub API if private data is needed.

### User Stories

- **Sign Up**  
  As a user, I want to sign up (register) in the web app.  
- **Login**  
  As a user, I want to log in after signing up.  
- **List Repositories**  
  As a user, I want to list all repositories under my GitHub user.  
- **Search & Favorite**  
  As a user, I want to search through all my repositories and mark some as “favorites.”

---

## helloBuild

Below are the steps to set up **backend** (NestJS) and **frontend** (Next.js).  

### 1. Backend Setup

1. **Create `.env` File**  
   In the `backend` folder, create a file named **`.env`** with the following:

   ```bash
   # JWT
   JWT_SECRET=y/B?E(H+MbPeShVmYq3t6w9z$C&F)J@NcRfTjWnZr4u7x!A%D*G-KaPdSgVkXp2s
   JWT_EXPIRES_IN=3600s

   # GitHub OAuth
   GITHUB_CLIENT_ID={github_client_id}
   GITHUB_CLIENT_SECRET={github_client_secret}

cd backend
npm install
npm run start:dev

The NestJS server should start on http://localhost:3000

## Frontend Setup

1. **Create `.env.local` File**  
   In the `frontend` folder, create a file named **`.env.local`**:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_GITHUB_CLIENT_ID="github_client_id_app"

cd frontend
npm install
npm run dev

By default, Next.js runs on http://localhost:3001