# Use an official Node runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY ./package*.json ./

# Install application dependencies
RUN npm install

# Copy the current directory contents into the container
COPY ./ .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variables if needed
# ENV NODE_ENV production
# ENV DATABASE_URL mongodb://db:27017

# Run the application
ENTRYPOINT npm start