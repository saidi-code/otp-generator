# OTP App

A modern, responsive One-Time Password (OTP) generator built with React, TypeScript, and Tailwind CSS. This application generates secure 6-digit OTPs with a countdown timer and provides easy copy functionality.

## Features

- **Secure OTP Generation**: Generates random 6-digit one-time passwords
- **Countdown Timer**: 25-second expiration timer with visual progress bar
- **Copy to Clipboard**: One-click copying of generated OTPs with toast notifications
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, accessible interface using Radix UI components

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Clipboard**: react-copy-to-clipboard-ts
- **Notifications**: react-toastify

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd otp_app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Click the "Generate New OTP" button to create a new 6-digit OTP
2. The OTP will be displayed in a formatted layout (XXX-XXX)
3. A 25-second countdown timer will start automatically
4. Click "Copy OTP" to copy the password to your clipboard
5. Use the theme toggle in the header to switch between light and dark modes

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Input OTP, etc.)
│   ├── Theme-toggle.tsx
│   └── contexts/
│       └── theme-provider.tsx
├── lib/
│   └── utils.ts      # Utility functions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
