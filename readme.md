# Groupie Tracker

Groupie Tracker is a web application that displays information about music bands and artists. It uses data from a provided API to show details such as band members, creation date, first album release date, and locations of concerts.

Hosted here:

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Features

- Display a list of artists/bands
- Show detailed information for each artist/band
- Interactive map of concert locations
- Search functionality
- Filtering options

## Technologies Used

- Go (Backend)
- HTML/CSS/JavaScript (Frontend)
- React (Frontend framework)
- Bootstrap (CSS framework)
- Vite (Build tool)

## Getting Started

### Prerequisites

- Go (version 1.x or later)
- Node.js and npm (for frontend development)

### Installation

1. Clone the repository:

2. Navigate to the project directory:

3. go run .

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

- `src/`: Contains the frontend React application
- `public/`: Static assets for the frontend
- `main.go`: Entry point for the Go backend server
- `api/`: Go package for handling API requests
- `models/`: Go package for data models

## API

The application uses the following API endpoints:

- Artists: https://groupietrackers.herokuapp.com/api/artists
- Locations: https://groupietrackers.herokuapp.com/api/locations
- Dates: https://groupietrackers.herokuapp.com/api/dates
- Relation: https://groupietrackers.herokuapp.com/api/relation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.