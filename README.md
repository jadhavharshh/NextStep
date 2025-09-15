# NextStep

A modern full-stack application built with Turborepo, featuring a Next.js frontend and Express.js backend with TypeScript support.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Express.js, TypeScript
- **Styling**: CSS Modules, Tailwind CSS (optional)
- **Build Tool**: Turborepo
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
- **HTTP Client**: Axios

## 📁 Project Structure

```
├── apps/
│   ├── api/                 # Express.js backend
│   │   ├── src/
│   │   │   └── server.ts    # Main server file
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── eslint.config.js
│   └── web/                 # Next.js frontend
│       ├── app/             # App router pages
│       ├── lib/
│       │   └── api.ts       # API client utilities
│       ├── public/          # Static assets
│       ├── package.json
│       ├── next.config.js
│       └── tsconfig.json
├── packages/
│   ├── eslint-config/       # Shared ESLint configurations
│   ├── typescript-config/   # Shared TypeScript configurations
│   └── ui/                  # Shared UI components
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Prettier ignore patterns
├── turbo.json              # Turborepo configuration
└── pnpm-workspace.yaml     # pnpm workspace configuration
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd NextStep
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Install dependencies for all workspaces**
   ```bash
   pnpm install
   ```

## 🚀 Development

### Start Development Servers

**Option 1: Start all services**

```bash
pnpm run dev
```

**Option 2: Start services individually**

**Frontend (Next.js)**

```bash
cd apps/web
pnpm run dev
```

- Access at: http://localhost:3000

**Backend (Express.js)**

```bash
cd apps/api
pnpm run dev
```

- Access at: http://localhost:3001

### Available Scripts

**Root level scripts:**

- `pnpm run dev` - Start all development servers
- `pnpm run build` - Build all apps and packages
- `pnpm run lint` - Lint all code
- `pnpm run format` - Format code with Prettier

**Web app scripts:**

- `pnpm run dev` - Start Next.js development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Lint code
- `pnpm run check-types` - Type check

**API scripts:**

- `pnpm run dev` - Start Express development server with hot reload
- `pnpm run build` - Build TypeScript to JavaScript
- `pnpm run start` - Start production server
- `pnpm run lint` - Lint code
- `pnpm run check-types` - Type check

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local in apps/web)**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Backend (.env in apps/api)**

```env
PORT=3001
NODE_ENV=development
```

## 📡 API Endpoints

### Health Check

- **GET** `/api/health`
- Returns server status and health information

### Example Response

```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

## 🧪 Testing

### Code Quality

```bash
# Lint all code
pnpm run lint

# Format code
pnpm run format

# Type checking
pnpm run check-types
```

### Build Verification

```bash
# Build all apps
pnpm run build

# Build specific app
pnpm run build --filter=web
pnpm run build --filter=api
```

## 🚀 Deployment

### Frontend (Next.js)

```bash
cd apps/web
pnpm run build
pnpm run start
```

### Backend (Express.js)

```bash
cd apps/api
pnpm run build
pnpm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests and linting: `pnpm run lint && pnpm run check-types`
5. Format code: `pnpm run format`
6. Commit your changes: `git commit -am 'Add some feature'`
7. Push to the branch: `git push origin feature/your-feature`
8. Submit a pull request

## 📝 Code Style

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

### Pre-commit Hooks

The project includes pre-commit hooks to ensure code quality. Make sure to run:

```bash
pnpm run lint
pnpm run format
```

before committing.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Turborepo Documentation](https://turborepo.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [pnpm Documentation](https://pnpm.io/)

## 📄 License

This project is licensed under the MIT License.
