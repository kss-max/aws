# Step 1: Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the frontend source code
COPY . .

# Step 6: Expose the Vite development port
EXPOSE 5173

# Step 7: Define the command to start the Vite server
CMD ["npm", "run", "dev", "--", "--host"]
