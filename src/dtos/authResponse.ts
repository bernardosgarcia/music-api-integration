export class AuthResponse {
    spotifyAccessToken: string;
    internalAccessToken: string;

    constructor(spotifyAccessToken: string, internalAccessToken: string) {
        this.spotifyAccessToken = spotifyAccessToken;
        this.internalAccessToken = internalAccessToken;
    }
}
