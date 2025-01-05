# Redis App

This is a Next.js web application integrated with Redis, featuring real-time functionalities and cloud media management. The app uses Redis as a backend data store and leverages several modern web technologies and libraries to offer a fast, interactive user experience.

The app is hosted and deployed on Vercel: [redis-app-delta.vercel.app](https://redis-app-delta.vercel.app).

## Features

- **Real-time Updates:** Utilizing Redis and Pusher, the app supports real-time updates.
- **Cloud Media Handling:** Integrated with Cloudinary for image and media management.
- **Authentication:** Built-in authentication with [Kinde](https://kinde.com) for user sign-ins.
- **Emoji Picker:** Powered by [Emoji Mart](https://github.com/missive/emoji-mart) for easy emoji selection.
- **Responsive UI:** Tailwind CSS and Radix UI components ensure a responsive and modern user interface.
- **State Management:** Zustand is used for global state management.

## Technologies Used

- **Next.js:** React-based framework for building web applications.
- **Redis:** Real-time database used for caching and storing data.
- **Pusher:** WebSockets for real-time interactions.
- **Cloudinary:** Cloud service for media management and delivery.
- **Radix UI:** Accessible, unstyled UI components for building custom design systems.
- **Tailwind CSS:** Utility-first CSS framework.
- **Zustand:** Simple state management library.
- **TypeScript:** Strongly-typed programming language for JavaScript.

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/) package manager

### 1. Clone the Repository

```bash
git clone https://github.com/Yaswanth1320/Redis-app
cd redis-app
```

### 2. Install Dependencies

Using **npm**:

```bash
npm install
```

Or using **Yarn**:

```bash
yarn install
```

### 3. Setup Redis (if running locally)

You can use [Upstash Redis](https://upstash.com/) or set up a local Redis instance. If you're using Upstash, simply configure the `UPSTASH_REDIS_URL` and `UPSTASH_REDIS_TOKEN` environment variables.

```bash
UPSTASH_REDIS_URL=your_redis_url
UPSTASH_REDIS_TOKEN=your_redis_token
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the necessary environment variables.

Example:

```env
NEXT_PUBLIC_CLOUDINARY_URL=your_cloudinary_url
NEXT_PUBLIC_KINDE_CLIENT_ID=your_kinde_client_id
NEXT_PUBLIC_KINDE_AUTHORIZATION_URL=your_kinde_authorization_url
UPSTASH_REDIS_URL=your_redis_url
UPSTASH_REDIS_TOKEN=your_redis_token
```

### 5. Run the Development Server

To start the development server, run:

```bash
npm run dev
```

or

```bash
yarn dev
```

Visit the app in your browser at [http://localhost:3000](http://localhost:3000).

## Deployment

This project is deployed on [Vercel](https://vercel.com). To deploy the app:

1. Push your changes to a GitHub repository.
2. Sign in to Vercel and link your repository.
3. Configure environment variables in the Vercel dashboard, matching the `.env.local` setup.
4. Deploy your project.

Vercel will automatically build and deploy your app whenever you push changes to the connected GitHub repository.

## Scripts

- **dev**: Run the application in development mode (with hot reloading)
- **build**: Build the application for production
- **start**: Start the production server after building
- **lint**: Run ESLint to check for code quality issues

## Contributing

Feel free to fork the repository, create a branch, and submit a pull request. Contributions, bug reports, and feature requests are always welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is open-source and available under the [MIT License](LICENSE).

---

### Additional Notes

- You may want to set up a Redis cloud instance (e.g., [Upstash](https://upstash.com)) for production.
- Tailwind CSS with `tailwind-merge` and `tailwindcss-animate` ensures a smooth UI with animations.
- Radix UI components are used for accessibility and UI consistency.
- Zustand is used for state management, which works well with React Query to fetch and cache data efficiently.

Enjoy building with Next.js and Redis!