import { LoginRequest, Profile, User } from "./auth_resources";

export class AuthService {
  url = "http://localhost:8080/auth";

  async authenticate(loginRequest: LoginRequest): Promise<void> {
    const newUrl = this.url + "/sign_in";

    const response = await fetch(newUrl, {
      method: "POST",
      body: JSON.stringify({
        email: loginRequest.email,
        password: loginRequest.password,
      }),

      credentials: "include",

      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.error);
    }
  }

  async getUserData(): Promise<User | undefined> {
    const response = await fetch(this.url, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error);
    }

    return await response.json();
  }

  async getProfile(userId: string): Promise<Profile> {
    const newUrl = this.url + `/profile/${userId}`;

    const response = await fetch(newUrl, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Não foi possível acessar a página do usuário.");
    }

    return await response.json();
  }

  async logOut(): Promise<void> {
    const newUrl = this.url + "/sign_out";

    const response = await fetch(newUrl, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível sair de sua conta");
    }
  }
}

export const useAuth = () => new AuthService();
