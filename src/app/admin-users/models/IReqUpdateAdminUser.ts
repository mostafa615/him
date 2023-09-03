export interface IReqUpdateAdminUser {
  adminUserId?: string;
  email: string;
  name: string;
  active: boolean;
  role: string;
}
