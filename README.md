# Discord messages API

API to get your latest messages from your Discord channel

## Installation

1. Install node.js from <https://nodejs.org/en/>

   > **Important**:
   > You should use version 16 or newer! (20 if you want to use npm task start:dotenv for development)

2. Clone this project via `git clone https://github.com/arbyzy/discord-messages-api`

### API

1. Move into `api` directory:

   ```bash
   cd api
   ```

2. Setup your env

   ```env
   DISCORD_TOKEN="Token of your discord account"
   DISCORD_CHANNEL_ID="Your channel ID"
   ```

3. Install dependencies:

   `npm i` / `yarn` / `pnpm i`

4. Build:

   `npm build` / `yarn build` / `pnpm build`

5. Start the API:

   `npm start` / `yarn start` / `pnpm start`

### 🎉 Now you got your API running 🎉

### Frontend

1. Move into `frontend` directory

2. Setup your env

   ```env
   API_URL="" # If empty, it will use http://localhost:8000
   ```

3. Install dependencies:

   `npm i` / `yarn` / `pnpm i`

4. Build:

   `npm build` / `yarn build` / `pnpm build`

5. Start the API:

   `npm preview` / `yarn preview` / `pnpm preview`
