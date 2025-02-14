# Begin with an initial Node builder stage.
FROM --platform=linux/arm64 node:22.13.1-alpine AS builder

# Set the current working directory and copy all fies from the dev dir to ./app.
WORKDIR /app
COPY . .

# Install dependencies and build the application.
RUN npm install
RUN npm run build

# Move to a new stage for production.
FROM node:22.13.1-alpine

# Set the current working directory.
WORKDIR /app

# Copy the buid to the new stage.
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .env ./
COPY prisma/schema.prisma prisma/seed.js ./prisma/
#RUN npm run prisma:init
#RUN npm run prisma:seed

# Expose our chosen port.
EXPOSE 3001

# Launch the server.
CMD ["sh", "-c", "npm run prisma:init && npm run prisma:seed && node dist/index.js"]
