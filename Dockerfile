FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

COPY src/views ./dist/views

FROM node:20

RUN apt-get update && apt-get install -y \
    wget \
    python3 \
    python3-pip \
    python3-venv \
    ffmpeg

RUN python3 -m venv /env
RUN /env/bin/pip install --upgrade pip
RUN /env/bin/pip install yt-dlp

ENV PATH="/env/bin:$PATH"

RUN which ffmpeg && ffmpeg -version

RUN echo "PATH atual: $PATH"
RUN which yt-dlp
RUN yt-dlp --version

WORKDIR /app

COPY gcloud-credentials.json ./
COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/app.js"]