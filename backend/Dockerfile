# Stage 1: Build the TypeScript code
FROM node:20-alpine AS builder

WORKDIR /app

# Install all dependencies (including devDependencies required for tsc)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code and config files
COPY . .

# Compile TypeScript to JavaScript in the 'dist' folder
RUN npm run build

# Stage 2: Setup the production environment
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment to production to optimize Node performance
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy the compiled output from the builder stage
COPY --from=builder /app/dist ./dist

# The default port used by the Express API
EXPOSE 3000

# Start the Node server
CMD ["npm", "start"]
