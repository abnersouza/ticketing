FROM node:alpine

WORKDIR /app

COPY . .

# Install all dependencies and clean cache
RUN npm install --only=prod && npm cache clean --force
# Transpile the .ts files
RUN npm run build
# Remove unnecessary folder and files
RUN rm -rf api components hooks pages Dockerfile* 

CMD ["npm", "run", "start"]