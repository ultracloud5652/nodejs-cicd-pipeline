# Stage 1: Build and Test
FROM node:20-bullseye as build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Run tests to ensure the build passes
RUN npm test

# Stage 2: Production
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app /app

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
