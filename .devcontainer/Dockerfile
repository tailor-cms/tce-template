ARG PNPM_HOME="/root/.local/share/pnpm"
ARG PNPM_VERSION="8.8.0"

FROM node:20.10-bullseye-slim
ARG PNPM_HOME
ARG PNPM_VERSION
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
ENV PNPM_HOME=$PNPM_HOME
ENV PATH="${PATH}:${PNPM_HOME}"
WORKDIR /workspace
EXPOSE 8010 8020 8030 8080
