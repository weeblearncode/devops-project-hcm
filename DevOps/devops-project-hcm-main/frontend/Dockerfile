# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Install serve to serve static files
RUN npm install -g serve

# Copy only the build folder from builder stage
COPY --from=builder /app/build ./build

# Expose port 3000
EXPOSE 3000

# Use serve to run the app
CMD ["serve", "-s", "build", "-l", "3000"]
