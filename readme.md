# Groupie Tracker

Groupie Tracker is a web application that displays information about music bands and artists. It allows users to explore various details about their favorite musicians, including concert dates, locations, and more.

[INSTRUCTIONS](https://github.com/01-edu/public/tree/master/subjects/groupie-tracker)

## Features

- Display a list of artists/bands
- Show detailed information for each artist/band
- Search functionality
- Interactive map of concert locations
- Responsive design for various screen sizes

## Technologies Used

- Go (Golang) for backend
- HTML, CSS, and JavaScript for frontend
- Docker for containerization

## Prerequisites

- Go 1.22 or later
- Docker (optional, for containerized deployment)

## Getting Started

### Local Development

1. Clone the repository:
git clone https://github.com/yourusername/groupie-tracker.git
cd groupie-tracker

3. Run the application:
go run .


4. Open your browser and visit `http://localhost:8080`

### Docker Deployment

1. Build the Docker image:
docker build -t groupie-tracker .

2. Run the container:
docker run -p 8080:8080 groupie-tracker


3. Access the application at `http://localhost:8080`

## Project Structure

- `main.go`: Entry point of the application
- `templates/`: HTML templates
- `static/`: Static assets (CSS, JavaScript, images)
- `Dockerfile`: Instructions for building the Docker image

## Authors

- [Arsen](https://github.com/tsnarsen)
- [Uipko](https://github.com/stikkeruip)
- [Yiannis](https://github.com/iovossos)