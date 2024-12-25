# Start from the official Go image
FROM golang:1.22.2-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod ./

# Download all dependencies
RUN go mod download

# Copy the entire project
COPY . .

# Build the Go app
RUN go build -o groupie-tracker .

# Expose port 8080
EXPOSE 8080

# Command to run the executable
CMD ["./groupie-tracker"]