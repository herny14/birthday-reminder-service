# Use the official Node.js 20 image from the Docker Hub
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if exists)
# This step is used for installing dependencies
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that the main app will run on (for example, 3000)
EXPOSE 3000

# Start both the main application (index.js) and the worker (worker.js)
CMD ["sh", "-c", "node index.js & node worker.js"]