import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const setTokenCookies = (accessToken: string, refreshToken: string) => {
  if (accessToken) {
    const decodedAccessToken = jwtDecode(accessToken);
    const accessTokenExpiry = (decodedAccessToken as any).exp;
    const accessTokenExpiresInMs = accessTokenExpiry * 1000 - Date.now();
    const accessTokenExpiresInDays = accessTokenExpiresInMs / (1000 * 60 * 60 * 24);

    Cookies.set("access_token", accessToken, {
      expires: accessTokenExpiresInDays,
      secure: true,
      sameSite: "Strict",
    });
  }

  if (refreshToken) {
    const decodedRefreshToken = jwtDecode(refreshToken);
    const refreshTokenExpiry = (decodedRefreshToken as any).exp;
    const refreshTokenExpiresInMs = refreshTokenExpiry * 1000 - Date.now();
    const refreshTokenExpiresInDays = refreshTokenExpiresInMs / (1000 * 60 * 60 * 24);

    Cookies.set("refresh_token", refreshToken, {
      expires: refreshTokenExpiresInDays,
      secure: true,
      sameSite: "Strict",
    });
  }
}; 