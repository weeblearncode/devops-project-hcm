# ===========================================
# STUDENT TODO: Create a Multi-Stage Dockerfile
# ===========================================
#
# Requirements:
# 1. Stage 1 (builder):
#    - Use node:18-alpine as base
#    - Set working directory
#    - Copy package files and install ALL dependencies
#    - Copy source code
#
# 2. Stage 2 (production):
#    - Use node:18-alpine as base
#    - Set working directory
#    - Copy only package files from builder
#    - Install ONLY production dependencies (hint: --only=production)
#    - Copy application code from builder
#    - Expose the correct port
#    - Set the start command
#
# Hints:
# - Research: "Docker multi-stage build Node.js"
# - Use COPY --from=builder to copy between stages
# - Final image should be as small as possible
# ===========================================

# YOUR CODE HERE:
#Stage 1: 
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

#Stage 2:
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --only=production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]