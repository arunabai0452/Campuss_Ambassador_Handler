import axios from "axios";
import { env } from "@/env/client";
import { fetchUserInfoById } from "@/services/api/apiService";
import { PerfomerData } from "@/types/userInfoTypes";

const API_URL = env.NEXT_PUBLIC_API_URL || "";

export async function getUserInfo(id: string, role: string) {
  try {
    const response = await axios.get(API_URL + "users/by-id", {
      params: { id, role },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

export async function validateUserInfo(id?: string, role?: string) {
  try {
    const response = await axios.get(API_URL + "validate/userby-id", {
      params: { id, role },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

export async function getTaskInfo() {
  try {
    const response = await axios.get(API_URL + "get-all-tasks");
    return response.data;
  } catch (error: any) {
    console.error("Error in Tasks API", error);
    throw error;
  }
}

export async function getUsersInfo() {
  try {
    const response = await axios.get(API_URL + "get-all-users");
    return response.data;
  } catch (error: any) {
    console.error("Error in Tasks API", error);
    throw error;
  }
}

export async function getTopPerformers() {
  try {
    const response = await axios.get(API_URL + "users/top-performers");
    const data = response.data;

    if (!data?.length) return [];

    const performersData = await Promise.all(
      data.map(async (performer: PerfomerData) => {
        try {
          const userDetails = await fetchUserInfoById(performer?.userId);
          const { userInfo } = userDetails.data;

          return {
            ...performer,
            profileImage: userInfo?.profileImage || "",
            role: userInfo?.title || "role",
          };
        } catch (error) {
          return {
            ...performer,
            profileImage: "",
            role: "role",
          };
        }
      })
    );

    return performersData;
  } catch (error: any) {
    console.error("Error in Tasks API", error);
    throw error;
  }
}
