FROM node:14
WORKDIR /app

RUN npm install -g yarn
RUN git clone https://github.com/IHtDzenda/discord-chanel-sync.git /app && \
        cd /app && \
        rm -rf .git && \
        rm -rf .github && \
        rm -f .gitignore && \
        rm -f Dockerfile && \
        rm -f README.md
COPY package*.json yarn*.lock ./
RUN yarn install --production
ENV DISCORD_TOKEN=<your token>
CMD ["node", "index.js"]