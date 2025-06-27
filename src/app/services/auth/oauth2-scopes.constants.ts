export const Oauth2Scopes = {
  USERINFO_EMAIL: "https://www.googleapis.com/auth/userinfo.email",
  USERINFO_PROFILE: "https://www.googleapis.com/auth/userinfo.profile",
  OPENID: "openid"
  };
  
  // Função para obter todos os escopos como um array
  export function getAllOath2Scopes(): string[] {
    return Object.values(Oauth2Scopes);
  }
  