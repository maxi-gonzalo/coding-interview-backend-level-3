ARG NODE_VERSION=20
ARG NODE_ENV=local
ARG PORT=9000

###################
# BUILD LOCAL DEVELOPMENT
###################

FROM node:${NODE_VERSION}-alpine AS base

# Create app directory
WORKDIR /usr/src/app

# Install basic development tools
# RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
# RUN echo node ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/node \
#     && chmod 0440 /etc/sudoers.d/node

# Set `DEVCONTAINER` environment variable to help with orientation
# ENV DEVCONTAINER=true

RUN --mount=type=bind,source=package.json,target=package.json \
    npm install --frozen-lockfile

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD
###################

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=base /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the local bundle
RUN npm run build

USER node

###################
# FINAL IMAGE
###################

FROM node:${NODE_VERSION}-alpine AS final

# Copy the bundled code from the build stage to the final image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./
COPY --chown=node:node --from=build /usr/src/app/package*.json ./

# Expose the port that the application listens on.
EXPOSE $PORT

# Set NODE_ENV, SERVER_PORT, MONGO_URI environment variables
# ENV NODE_ENV=$NODE_ENV ENVIRONMENT=$NODE_ENV SERVER_PORT=$PORT MONGO_URI=mongodb://localhost:27017/test-db
ENV NODE_ENV=local ENVIRONMENT=local SERVER_PORT=9000 MONGO_URI=mongodb://localhost:27017/test-db

# Start the server using the final build
CMD [ "node", "index.js" ]