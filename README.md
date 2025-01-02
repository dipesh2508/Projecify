# Projecify

Projecify is a sleek and powerful web application designed to simplify project management. It allows users to create projects, assign roles, manage tasks, set deadlines, and collaborate effectively—all through an intuitive dashboard.

## Features
- **User Management**: Create accounts and manage access seamlessly.
- **Project Creation**: Organize your work by setting up multiple projects.
- **Team Collaboration**:
  - Add members to projects.
  - Assign roles (Admin/Member) for tailored permissions.
- **Task Management**:
  - Create tasks and assign them to project members.
  - Visualize tasks with a full-featured calendar view.
- **Deadline Management**: Set deadlines for tasks and projects to keep everything on track.
- **Progress Tracking**:
  - Update statuses for tasks and projects.
  - Monitor progress at a glance.
- **Interactive Dashboard**: A beautifully designed dashboard for effective workflow management.
- **Dark/Light Mode**: Switch between color themes for better accessibility.

## Tech Stack
Projecify leverages a modern and efficient tech stack to deliver high performance and scalability:

- **Frontend**:
  - [Next.js](https://nextjs.org/) v14.2.18
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Motion](https://motion.dev/) (prev. Framer Motion) for animations
  - [ShadCN-UI](https://shadcn.dev/) for reusable UI components

- **Backend**:
  - [Next.js API Routes](https://nextjs.org/docs/app/api-reference) for building APIs
  - [Prisma ORM](https://www.prisma.io/) for database management
  - [PostgreSQL](https://www.postgresql.org/) (via [Neon Serverless Postgres](https://neon.tech/))
  - [NextAuth.js](https://next-auth.js.org/) for authentication
  - [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) for secure password hashing

- **Utilities**:
  - [Next Themes](https://github.com/pacocoursey/next-themes) for theme management (dark/light mode)
  - [Sharp](https://sharp.pixelplumbing.com/) for image optimization
  - [Lucide-react](https://lucide.dev/) / [React Icons](https://react-icons.github.io/react-icons/) for icons
  - [UploadThing](https://uploadthing.com/) for cloud-based file storage
  - [FullCalendar](https://fullcalendar.io/) for a rich task calendar view

## Installation
Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/dipesh2508/Projecify.git
   cd projecify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the necessary variables as specified in the `.env.example` file.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the app.

## Contribution
This project is a solo effort by **Dipesh Ranjan**, showcasing programming and development skills. It is maintained under the organization **Try n Test Foundation, Inc.**.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to reach out with feedback or suggestions to improve Projecify!
