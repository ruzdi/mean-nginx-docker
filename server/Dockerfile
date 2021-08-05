FROM node:latest as builder

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .


# Install any needed packages
RUN npm install

# COPY docker-update/node_modules/bagpipes/lib/fittingTypes/user.js node_modules/bagpipes/lib/fittingTypes/user.js

# RUN npm run build --prod

# Stage 2 build for creating smaller image
# FROM node:12-alpine
# WORKDIR /app

# COPY --from=builder /app .

EXPOSE 3000

CMD [ "npm", "start" ]
