import { ProfileImageFaceResult } from "@/types/commonTypes"

interface CompletedTaskInfo {
  taskId: string | null;
  completionTime: string | null;
}


export interface AmbassadorInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  pointsEarned?: number;
  completedTasks?: Array<CompletedTaskInfo>;
  currentTasks?: Array<String>;
  middleName?: string;
  userId?: string;
  _id?: string;
}
export interface PerfomerData extends AmbassadorInfo {
    profileImage?: string,
    role?: string,
}

export interface UserInfo {
  data: UserInfoData
  message: string
  status: number
}

export interface UserInfoData {
  email: string
  emailVerification: boolean
  firstName: string
  id: string
  isSocialLogin: boolean
  lastName: string
  middleName: string
  profile: UserProfile
  profileImage: string
  profileImageFaceResults: ProfileImageFaceResult[]
  roleType: string
  roles: string[]
  type: string
  title: string
}

export interface UserProfile {
  disability: string
  ethnicity: string
  gender: string
  nationality: string
  pronouns: string
  race: string
  veteranStatus: string
}
