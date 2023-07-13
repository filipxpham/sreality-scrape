# Use the official Node.js 14 image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the entire app directory to the working directory
COPY . .

# Build the Next.js app for production
RUN npm run build

# Set the command to start the Next.js app
CMD ["npm", "run", "start"]
