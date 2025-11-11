# WeCare

WeCare is a community-driven donation platform designed to connect donors with individuals and families in need. Built with Next.js and powered by Supabase, the app enables users to make a lasting impact by donating goods, providing financial support, or volunteering services. It fosters community engagement through featured causes, volunteer opportunities, and transparent impact tracking.

## Features

- **Donation Types**: Support communities by donating goods (clothing, food, electronics), financial contributions, or volunteer services.
- **Impact Dashboard**: Track collective impact with statistics on items donated, people helped, active volunteers, and community projects.
- **Community Engagement**: Join social media, participate in projects, and attend events.
- **User Pages**: Includes Home, Donate, Community, Support, Dashboard, About, Contact, and Login pages.
- **Responsive Design**: Built with Material-UI, Tailwind CSS, and animations for a modern, mobile-friendly experience.

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd wecare
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (create a `.env.local` file with Supabase credentials and other configs).

4. Run the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3020`.

### Production
To build and run in production:
```bash
npm run build
npm run start
```
Or use the server.js for custom deployment:
```bash
NODE_ENV=production node server.js
```

## Tech Stack
- **Frontend**: Next.js, React, Material-UI, Tailwind CSS
- **Backend**: Supabase (database and authentication)
- **Animations**: Lottie, Framer Motion
- **Other**: Axios for API calls, various UI libraries

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the terms specified in LICENSE.md.

## Author
Grant Marthinus - [http://wecare.co.za](http://wecare.co.za)
