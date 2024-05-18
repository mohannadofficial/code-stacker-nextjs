# 📃 Code Stacker: Your Ultimate Coding Destination! 🚀

![Alt text](https://pouch.jumpshare.com/preview/gVlBurwdFWZJyRXAS9HkxLWHMGIHHw2kV95lTkbpZiJSyg00rZB0sQMUFE17BP3-zti2kxmKN3TSINWuPjtQntjEBm6GU50Zrl4S2HIiZQU)

Code Stacker is a Stack Overflow clone built with cutting-edge technologies to provide a seamless Q&A experience for developers, The frontend is powered by Next.js, while the backend utilizes Mongoose for data

- https://code-stacker.mohnd-code.com/

## 💻 Technologies Used:

- Frontend: Next.js (React framework)
- Backend: Mongoose (ORM for data management)
- Database: MongoDB (non-relational database)
- Authentication: Clerk (optional for secure login/registration)

## 💡 Features

- 🌐 **Next.js 14 & Server Actions:** Leverage the power of the latest Next.js framework for optimal performance and scalability.
- 🗣 **AI-Generated Answers:** Receive intelligent, AI-generated responses to your questions, enhancing your problem-solving experience.
- 🎨 **Shadcn UI Component System:** Enjoy a beautiful and cohesive interface designed with Shadcn UI components for a smooth user experience.
- 🎖 **Badge & Reputation System:** Earn badges and build your reputation through active participation and contributions to the community.
- 🔐 **Auth Using Clerk:** Secure authentication and registration powered by Clerk for a hassle-free login experience.
- 👀 **Views:** Track the popularity and engagement of questions through view counts.
- 💼 **Collections:** Organize and manage your favorite questions and answers in personalized collections.
- 🌟 Vote: Vote on questions and answers to highlight the most helpful and relevant content.
- 👥 **Community:** Join a vibrant community of developers and tech enthusiasts.
- 🕵 **Find Jobs:** Discover job opportunities tailored to your skills and interests.
- ❓ **Questions & Answers:** Post questions and provide answers to foster knowledge sharing.
- 🏆 **Top Questions & Popular Tags:** Explore top-rated questions and trending tags for quick insights.
- 🏷️ **Tags:** Utilize tags to categorize and filter questions effectively.
- ✍ **Ask A Question:** Easily post your questions to seek help from the community.
- 🔮 **Dark & Light Mode:** Switch between dark and light themes to suit your preference.
- 🔎 **Search:** Find questions, answers, and tags quickly with a powerful search functionality.
- 👤 **Profile Page:** Showcase your contributions and track your activity with a personalized profile page.
- 🌧 **ORM Using Mongoose:** Simplify data management with Mongoose ORM.
- 💾 **MongoDB:** Rely on MongoDB for robust and scalable data storage.
- 📱 **Mobile Responsiveness:** Access Code Stacker on the go with a fully responsive design for mobile devices.

## ✏️ Requirements

Before you begin, ensure you have the following software installed on your local machine:

- Node.js and npm (or yarn): Used for managing project dependencies. Download from (https://nodejs.org/en)
- Git (optional): For version control. Download from (https://git-scm.com/downloads)

## 🤖 Commands

- `dev`: Starts the development server `npm run dev`.
- `build`: Creates an optimized production build npm `npm run build`.
- `start`: Runs the production server `npm run start`.
- `lint`: Lints the codebase for potential errors and style issues `npm run lint`.

## 🛠️ Installation

1. Clone the Repository:

```bash
git clone https://github.com/mohannadofficial/stack_overflow_clone_next.js14.git
```

2. Install Dependencies:

```bash
cd stack_overflow_clone_next.js14
npm install
```

3. Create a .env File:

- Rename .env.example to .env.
- Fill in the following environment variables with your own values:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  ## Clerk publishable key (step 4)
CLERK_SECRET_KEY=  ## Clerk Secret key (step 4)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in ## path sign-in page
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up ## path sign-up page
WEBHOOK_SECRET=  ## Clerk Webhooks Secret (step 5)
NEXT_PUBLIC_TINY_EDITOR_API_KEY=  ## API key for TinyMCE editor integration (step 6).
MONGODB_URL=  ## Connection URL for MongoDB database (step 7).
NEXT_PUBLIC_SERVER_URL=http://localhost:3000  ## Server URL, defaults to http://localhost:3000 for local development.
OPENAI_API_KEY=  ## API key for accessing OpenAI services (step 8).
NEXT_PUBLIC_RAPID_API_KEY=  ## API key for accessing Rapid API services (step 9).

```

4. Setup Clerk Authentication

- Go to the [Clerk Setup](https://clerk.com/docs/quickstarts/setup-clerk).
- Create an account if you don't have one.
- Retrieve your publishable key and secret key.
- Add the following environment variables to your .env file:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_public_clerk_key

CLERK_SECRET_KEY=your_secret_clerk_key
```

5. Set Up Clerk Webhooks:

- Go to the Clerk Dashboard.
- Navigate to the "Webhooks" section.
- Create a new webhook endpoint: YOUR_DOMAIN_URL/api/webhooks.
- Select the following events:
  (**user.created** , **user.updated**, **user.deleted**)
- Copy the generated `WEBHOOK_SECRET` and add inside .env.

```bash
WEBHOOK_SECRET=your_copied_webhook_secret
```

By setting up these webhooks, you'll ensure that your application stays in sync with user-related events, enhancing the overall user management experience.

6. Set Up TinyMCE Editor:

- Open [Tiny Cloud](https://www.tiny.cloud/).
- Create an account if you don't have one.
- Add your domain to the "Verified Domains" section.
- Get your API key from Tiny Cloud.
- Add the following environment variable to your .env file:

```bash
NEXT_PUBLIC_TINY_EDITOR_API_KEY=your_tiny_editor_api_key
```

7. Set Up MongoDB Atlas:

- Go to the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) website and create an account.
- Create a new cluster and database
- Get the connection string (MongoDB URL) from your cluster.
- Add the following environment variable to your .env file:

```bash
MONGODB_URL=your_mongodb_connection_url
```

8. Get API Key from OpenAI (ChatGPT):

- Visit the [OpenAI Platform](https://platform.openai.com/).
- Sign up or log in to your account.
- Navigate to the API keys section and generate a new API key.
- Add the following environment variable to your .env file:

```bash
OPENAI_API_KEY=your_openai_api_key
```

9. Set Up RapidAPI for Job Search:

- Go to [RapidAPI](https://rapidapi.com/category/Jobs).
- Search for "JSearch" in the Jobs category.
- Sign up or log in to your RapidAPI account.
- Subscribe to the JSearch API and get your API key.
- Add the following environment variable to your .env file:

```bash
NEXT_PUBLIC_RAPID_API_KEY=your_rapidapi_jsearch_api_key
```

## 🚀 Deployment on Vercel

1. Create a Vercel Account: Sign up for a free Vercel account at (https://vercel.com/).
2. Connect your GitHub Repository: Link your GitHub repository containing the Duolingo clone project to your Vercel account.
3. Import Project: Vercel will automatically detect your Next.js project and provide deployment options.
4. Configure Environment Variables: Set the required environment variables (listed in the Setup Instructions section) within Vercel's environment settings.
5. Deploy: Once configured, deploy your project to Vercel. Vercel will handle building and deploying the application.

## ⭐ Like this project?

If you find this Duolingo clone project helpful, consider giving it a star on GitHub to show your support! This helps others discover the project and motivates me to continue development.

## 🙌 Contributing

We welcome contributions from the community! Feel free to fork the repository, make changes, and create pull requests.

## 🔰 License

This project is licensed under the MIT License

## 📬 Feedback

If you have any feedback, please reach out to us at info@mohnd-info.com
