ARG NODE_VERSION=22.12.0

# Create build stage
FROM node:${NODE_VERSION}-slim AS build

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.12.1 --activate
# Set the working directory inside the container
WORKDIR /nuxt-app

# Copy package.json and pnpm-lock.yaml files to the working directory
COPY ./package.json /nuxt-app/
COPY ./pnpm-lock.yaml /nuxt-app/

## Install dependencies
RUN pnpm install --shamefully-hoist

# Copy the rest of the application files to the working directory
COPY . ./

# Build the application
RUN pnpm run build

# Create a new stage for the production image
FROM node:${NODE_VERSION}-slim

# Set the working directory inside the container
WORKDIR /nuxt-app

# Copy the output from the build stage to the working directory
COPY --from=build /nuxt-app/.output ./

# Expose the port the application will run on
EXPOSE 3000

# Start the application
CMD ["node","/nuxt-app/server/index.mjs"]
