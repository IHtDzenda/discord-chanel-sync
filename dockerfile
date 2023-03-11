FROM node:16.9
WORKDIR /app

RUN npm install -g yarn --force

RUN git clone https://github.com/IHtDzenda/discord-chanel-sync.git /app && \
        cd /app && \
        rm -rf .git && \
        rm -rf .github && \
        rm -f .gitignore && \
        rm -f Dockerfile && \
        rm -f README.md
#COPY package*.json yarn*.lock ./
RUN yarn install --production
ARG DISCORD_TOKEN
ENV DISCORD_TOKEN=""
CMD ["node", "index.js"]
