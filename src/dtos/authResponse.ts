export class AuthResponse {
    spotifyTokenInfo: TokenInfo;
    internalTokenInfo: TokenInfo;

    constructor(spotifyAccessToken: TokenInfo, internalAccessToken: TokenInfo) {
        this.spotifyTokenInfo = spotifyAccessToken;
        this.internalTokenInfo = internalAccessToken;
    }
}

export class TokenInfo {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;

    constructor(accessToken: string, expiresIn: number, refreshToken?: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
    }
}
