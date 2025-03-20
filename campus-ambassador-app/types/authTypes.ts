export interface ForgotPassword {
  data: ForgotPasswordData | boolean
  message: string
  status: number
}

export interface ForgotPasswordData {
  email: string
  id: string
  otpExpiration: Date
  otpStatus: string
}

export interface ValidateEmail {
  data: ValidateEmailData
  message: string
  status: number
}

export interface ValidateEmailData {
  authFlow: string
  isSocial: boolean
  isUserExists: boolean
  socialMedium: string
}

export interface ValidateDomain {
  data: boolean
  message: string
  status: number
}

export interface ValidateEmail {
  data: ValidateEmailData
  message: string
  status: number
}

export interface Matches {
  data: MatchData[]
  message: string
  status: number
}

export interface MatchData {
  department: string
  email: string
  firstName: string
  id: string
  institution: string
  title: string
}

export interface SpecializationsResponse {
  data: SpecializationsData
  message: string
  status: number
}

export interface SpecializationsData {
  content: SpecializationContent[]
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  size: number
  totalElements: number
  totalPages: number
}

export interface SpecializationContent {
  department: Department
  id: string
  title: string
}

export interface Department {
  id: string
  title: string
}
