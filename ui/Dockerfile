# Set the Node version to base the container on.
FROM node:22.13.1-alpine

# Set the current working directory and copy files from the dev dir to ./app.
WORKDIR /app
COPY . .

# Install dependencies and build the application.
RUN npm install
RUN npm run build

# Expose our chosen port to the internet and boot the app.
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host"]