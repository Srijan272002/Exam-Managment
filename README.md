# Exam Management System

A modern, mobile-first exam management system built with Expo and React Native. This application helps administrators manage exams, track progress, and monitor exam centers in real-time.

## Features

- 📱 Cross-platform support (iOS, Android, Web)
- 📊 Real-time dashboard with key metrics
- 📝 Comprehensive exam management
- 👥 User and staff management
- 🏢 Exam center monitoring
- 🔔 Real-time alerts and notifications
- 📅 Calendar integration
- 📈 Progress tracking
- 🔒 Secure authentication system

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

For mobile development:
- [Expo Go](https://expo.dev/client) app on your iOS or Android device
- iOS Simulator (macOS only) or Android Studio (for emulator)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd exam
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Available Scripts

- `npm start` - Starts the Expo development server
- `npm run start-web` - Starts the development server for web
- `npm run start-web-dev` - Starts the development server for web with debug mode

## Project Structure

```
exam/
├── app/                    # App navigation and screens
│   └── (tabs)/            # Tab-based navigation screens
├── components/            # Reusable components
│   ├── cards/            # Card components
│   └── ui/               # UI components
├── constants/            # Constants and theme
├── mocks/                # Mock data
├── store/                # State management
└── utils/                # Utility functions
```

## Tech Stack

- [Expo](https://expo.dev/) - Development platform
- [React Native](https://reactnative.dev/) - Mobile framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Navigation](https://reactnavigation.org/) - Navigation
- [Lucide Icons](https://lucide.dev/) - Icons
- [Expo Router](https://docs.expo.dev/routing/introduction/) - File-based routing

## Features in Detail

### Dashboard
- Real-time statistics
- Active exam monitoring
- Staff allocation overview
- Alert management
- Recent activity feed

### Exam Management
- Create and schedule exams
- Monitor exam progress
- Assign staff and centers
- Track completion status

### User Management
- Staff registration
- Role-based access control
- Activity monitoring
- Profile management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team. 