FROM node

# Set the working directory inside the container
WORKDIR /usr/dist/index

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Build the TypeScript app
RUN npm run build

# Command to run your app
CMD ["npm", "start"]

