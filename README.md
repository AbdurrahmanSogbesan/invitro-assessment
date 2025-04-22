# Doctor Booking Application

A fully responsive and accessible appointment booking UI for a healthcare platform. This application allows users to browse doctors, book appointments, and manage their bookings.

## Features

- 👨‍⚕️ Doctor Directory with filtering by specialty and availability
- 📅 Interactive booking modal with time slot selection
- 📋 Appointments summary view
- 🎨 Modern UI with Tailwind CSS
- ♿ Fully accessible components
- 📱 Responsive design for all devices

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Radix UI (for accessible components)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AbdurrahmanSogbesan/invitro-assessment.git
cd doctor-booking-mock
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## AI Tools Usage

This project was developed with the assistance of various AI tools to enhance development efficiency:

1. **Cursor IDE**

   - Used for code scaffolding
   - Component structure suggestions
   - Type definitions

2. **ChatGPT**
   - Helped with UI/UX decisions
   - Provided best practices for component architecture

## Project Structure

```
src/
  ├── components/         # React components
  │   ├── booking/       # Booking-related components
  │   └── ui/           # Reusable UI components
  ├── lib/              # Utilities and helpers
  └── types/            # TypeScript type definitions
```

## Known Limitations & Future Improvements

1. **Current Limitations**

   - Mock data only - no backend integration
   - Limited filtering options
   - Basic appointment management

2. **Planned Improvements**
   - Backend integration
   - Advanced search and filtering
   - Appointment notifications
   - Calendar integration
   - More comprehensive test coverage

## Accessibility

The application follows WCAG guidelines and implements the following accessibility features:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Focus management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

