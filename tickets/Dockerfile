FROM node:alpine

WORKDIR /app

COPY package*.json ./

# Install all dependencies and clean cache
RUN npm install --only=prod && npm cache clean --force

COPY . .

# Transpile the .ts files
RUN npm run build
# Remove unnecessary folder and files
RUN rm -rf src tsconfig* Dockerfile* 

CMD ["node", "index.js"]