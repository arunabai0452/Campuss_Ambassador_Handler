
import axiosInstance from "@/services/api/api";
import { getAccessToken } from "@/lib/authHandlers";
import { UserInfo } from "@/types/userInfoTypes";

export async function fetchUserInfo(): Promise<UserInfo> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  try {
    const response = await axiosInstance.get<UserInfo>(`/api/user/info`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUserInfoById(userId?: string): Promise<UserInfo> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  try {
    const response = await axiosInstance.get<UserInfo>(
      `/api/user/profile/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
