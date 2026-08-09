export type SignUpResponse = {
  username: string;
  email: string;
};

export type LoginResponse = {
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};
