export interface UserType {
  uid?: string;
  name: string;
  lastName?: string;
  email: string;
  profileImage?: File | null;
  phone: string;
  birthDate: Date;
  address?: string;
  gender?: string;
}
