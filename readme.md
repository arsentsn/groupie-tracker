# Groupie Tracker

Groupie Tracker is a web application that displays information about music bands and artists. It allows users to explore various details about their favorite musicians, including concert dates, locations, and more.

[INSTRUCTIONS](https://github.com/01-edu/public/tree/master/subjects/groupie-tracker)

## Features

- Display a list of artists/bands
- Show detailed information for each artist/band
- Search & filters functionality
- Interactive map of concert locations
- Responsive design for various screen sizes
- Shortcuts to flip multiple cards effectively (F for flip, R for reset)

## Technologies Used

- ![Go](https://img.shields.io/badge/-Go-00ADD8?style=flat&logo=go&logoColor=white) for backend
- ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) for frontend
- ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat&logo=docker&logoColor=white) for containerization

## Prerequisites

- Go 1.22 or later
- Docker (optional, for containerized deployment)

## Getting Started

### Local Development

1. Clone the repository:
git clone https://github.com/tsnarsen/groupie-tracker.git
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

## Authors

- [arsentsn](https://github.com/arsentsn)
- [stikkeruip](https://github.com/stikkeruip)
- [iovossos](https://github.com/iovossos)
