FROM node:15

# Set the working directory
WORKDIR /index

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Expose the port the app runs on
EXPOSE 4000

# Command to run your app
CMD ["npm", "start"]

