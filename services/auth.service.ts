import { ApiService } from "./api.service";

import { IUser, IUserLogin, IUserRegister } from "@/interface/user.types";

export const AuthService = {
  async register(registerData: IUserRegister) {
    return await ApiService.post<IUser, IUserRegister>(
      `/auth/registry`,
      registerData
    );
  },

  async login(data: IUserLogin) {
    return await ApiService.post<IUser, IUserLogin>(`/auth/login`, data);
  },

  async getUser(): Promise<IUser> {
    return await ApiService.get<IUser>("/auth");
  },
};
