# DevOps Base Project

## Project Overview

This is a simple Todo application with:
- **Frontend**: React (port 3000)
- **Backend**: Node.js/Express (port 8080)
- **Database**: PostgreSQL (port 5432)
- When running with docker-compose, the backend listens on port 8080 within the container and is mapped to the host (e.g., 8080).

Your task is to build a complete CI/CD pipeline around this application.

## Known Issues (You Must Fix!)

The codebase contains **intentional bugs** that you need to identify and fix:

### Backend Issues:
1. **server.js** - Multiple bugs marked with comments (6 bugs total!)
2. **Tests failing** - 4 out of 7 tests will fail until you fix the code
3. **Missing functionality** - DELETE and PUT endpoints not implemented

### Docker Issues:
1. **Dockerfiles** - Need to be completed (only skeleton/comments provided)
2. **docker-compose.yml** - Incomplete, missing configurations
3. **Missing .dockerignore** - You need to create these files

### CI/CD:
1. **No workflow file** - You must create `.github/workflows/ci.yml` from scratch

## Your Tasks

### Task 1: Fix Backend Bugs (server.js)
- [ ] Bug #1: Wrong default password
- [ ] Bug #2: Missing validation for empty title
- [ ] Bug #3: Missing DELETE endpoint
- [ ] Bug #4: Missing PUT endpoint
- [ ] Bug #5: Server starts in test mode
- [ ] Bug #6: App not exported for tests

### Task 2: Complete Dockerfiles
- [ ] Complete `backend/Dockerfile` (multi-stage build)
- [ ] Complete `frontend/Dockerfile` (multi-stage build)
- [ ] Create `.dockerignore` files for both

### Task 3: Complete docker-compose.yml
- [ ] Add proper environment variables
- [ ] Add healthchecks for backend and postgres
- [ ] Add volume mounts for database persistence
- [ ] Mount init script for database
- [ ] Configure service dependencies with health conditions

### Task 4: Create CI/CD Pipeline
- [ ] Create `.github/workflows/ci.yml`
- [ ] Configure build-and-test job with PostgreSQL service
- [ ] Configure Docker build and push to Docker Hub
- [ ] Configure deploy job with SSH

### Task 5: GitHub Configuration
- [ ] Setup branch protection for main
- [ ] Add required secrets
- [ ] Configure PR review requirements

## Testing Locally

```bash
# Install dependencies
cd backend && npm ci

# Run tests (will fail until bugs are fixed!)
npm test

# Expected: 3 pass, 4 fail (until you fix the code)
```

## Demo Flow (Fail-to-Fix)

1. Create a branch with failing code
2. Open PR → Show CI failing (Red X)
3. Fix the code → Push again
4. Show CI passing (Green ✓)
5. Get approval → Merge to main
6. Show CD deploying automatically
7. Verify live application updated
