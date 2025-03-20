import { create } from "zustand"
import { MatchData } from "@/types/authTypes"

interface InviteState {
  userExists: boolean | null
  inviteToken: string | null
  invitedEmail: string | null
  loading: boolean
  otpVerified: boolean
  registrationId: string | undefined
  role: string
  roleType: string | null
  isPrimaryAdvisor: boolean
  selectProfile: MatchData[]
  selectedProfile: MatchData | string
  finishedSignup: boolean
  setLoading: (value: boolean) => void
  setInviteToken: (value: string) => void
  setInvitedEmail: (value: string) => void
  setRegistrationId: (value: string) => void
  setOtpVerified: (value: boolean) => void
  setRole: (value: string) => void
  setRoleType: (value: string | null) => void
  setPrimaryAdvisor: (value: boolean) => void
  setSelectProfile: (value: MatchData[]) => void
  setSelectedProfile: (value: MatchData | string) => void
  setFinishedSignup: (value: boolean) => void
  resetInviteState: () => void
}

export const useInviteStore = create<InviteState>((set) => ({
  userExists: null,
  loading: false,
  inviteToken: null,
  invitedEmail: null,
  otpVerified: false,
  registrationId: undefined,
  role: "student",
  roleType: null,
  isPrimaryAdvisor: false,
  selectProfile: [],
  selectedProfile: "",
  finishedSignup: false,
  setLoading: (value) => set({ loading: value }),
  setInviteToken: (value) => set({ inviteToken: value }),
  setInvitedEmail: (value) => set({ invitedEmail: value }),
  setRegistrationId: (value) => set({ registrationId: value }),
  setOtpVerified: (value) => set({ otpVerified: value }),
  setRole: (value) => set({ role: value }),
  setRoleType: (value) => set({ roleType: value }),
  setPrimaryAdvisor: (value) => set({ isPrimaryAdvisor: value }),
  setSelectProfile: (value) => set({ selectProfile: value }),
  setSelectedProfile: (value) => set({ selectedProfile: value }),
  setFinishedSignup: (value) => set({ finishedSignup: value }),
  resetInviteState: () =>
    set({
      userExists: null,
      loading: false,
      inviteToken: null,
      invitedEmail: null,
      otpVerified: false,
      registrationId: undefined,
      role: "student",
      roleType: null,
      isPrimaryAdvisor: false,
      selectProfile: [],
      selectedProfile: "",
      finishedSignup: false,
    }),
}))
