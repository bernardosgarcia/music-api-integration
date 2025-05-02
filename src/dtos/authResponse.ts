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
    expiresAt: number;

    constructor(accessToken: string, expiresAt: number, refreshToken?: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresAt = expiresAt;
    }
}
