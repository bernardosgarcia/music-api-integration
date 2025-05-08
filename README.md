# Music API Integration - Software Architecture

This is a project developed using **Express.js** with **TypeScript**, integrating two main APIs: **Spotify** and **Music.AI**. The purpose of this system is to provide an interactive experience for the user, allowing them to explore their music in depth by breaking it down into its instrumental layers.

## Features

1. **Spotify Authentication**:
   - The user logs in through Spotify authentication to access their playlists and music.
   
2. **Access to Playlists**:
   - After logging into Spotify, the user can view their playlists.
   
3. **Song Selection**:
   - The user selects a song from one of their playlists on Spotify.
   
4. **Processing with Music.AI**:
   - The selected song is sent to the Music.AI API, which processes the music and breaks it down into separate audio tracks based on the different instruments present.

## Technologies Used

- **Express.js** - Framework for building the API.
- **TypeScript** - For development with static typing.
- **Spotify API** - For authentication and accessing user playlists.
- **Music.AI API** - For processing songs and extracting instrument tracks.
- **OAuth2** - For Spotify authentication.

## Prerequisites

Before running the application, make sure you have the following dependencies installed:

- **Node.js** (version 14 or higher)
- **npm** or **yarn**

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/music-api-integration.git
2. Install dependencies:

   ```bash
   cd music-api-integration
   npm install
   # or
   yarn install
3. Configure Spotify and Music.AI API credentials:
   
   - Create an app on the Spotify Developer Dashboard and get your ```Client ID``` and ```Client Secret```.

   - Obtain an API key from Music.AI.

   Then, create a ```.env``` file at the root of the project and add the following credentials:

   ```env
   SPOTIFY_CLIENT_ID=<your-client-id>
   SPOTIFY_CLIENT_SECRET=<your-client-secret>
   SPOTIFY_REDIRECT_URI=<your-redirect-uri>
   MUSIC_AI_API_KEY=<your-music-ai-api-key>

## Running the Application
To start the development server, run the following command:

1. **Starting Development Server**
   ```bash
   npm run dev
This will launch the server at http://localhost:3000.

## How to Use
1. **Spotify Authentication:**

Visit http://localhost:3000/auth/spotify to authenticate with Spotify. You will be redirected to the Spotify login page, where you can authorize the app.

2. **Access Your Playlists:**

Once authenticated, you will be able to view your Spotify playlists and select a song to process.

3. **Process the Song:**

After selecting a song, the system will send it to Music.AI for processing. Music.AI will break the song down into separate tracks based on the different instruments used.

/////////////////////////////////////////////////////

1. **Using Download Song or Playlist:**

Use that structure in your body request for download your song:
{   
  "song" : "Name_Song",
  "author" : "Name_Author"
}
and http://127.0.0.1:3000/api/download/song POST.

now, use that structure in your body request for download playlist
[
  {   
   "song" : "Name_Song",
   "author" : "Name_Author"
  },
  {   
   "song" : "Name_Song2",
   "author" : "Name_Author2"
  }
]
and http://127.0.0.1:3000/api/download/playlist POST. 