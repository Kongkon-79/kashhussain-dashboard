
export interface ManageUserApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: IMeta;
  data: ManageUser[];
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ManageUser {
  _id: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
  status: string;
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
  __v: number;

  // Optional fields (not in every user)
  verifiedForget?: boolean;
  address?: string;
  city?: string;
  country?: string;
  gender?: string;
  otp?: string;
  otpExpiry?: string;
  phoneNumber?: string;
  profilePicture?: string;
}