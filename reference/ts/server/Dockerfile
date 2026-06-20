FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src/ ./src/

EXPOSE 3699

VOLUME ["/app/data"]

ENV INTAKE_DATA_DIR=/app/data
ENV NODE_ENV=production

CMD ["node", "src/index.js"]
