import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export async function authSpotify(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Error to authenticate with Spotify' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    req.user = {
      id: response.data.id,
      displayName: response.data.display_name,
      email: response.data.email
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Expired or invalid Spotify token' });
  }
}
