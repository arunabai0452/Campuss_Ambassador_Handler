export const Roles = [
  {
    role: "student",
    displayName: "Undergraduate Student",
    roleType: "student_undergraduate_student",
  },
  {
    role: "faculty",
    displayName: "Graduate Student",
    roleType: "faculty_graduate_student",
  },
  {
    role: "faculty",
    displayName: "Research Scientist",
    roleType: "faculty_research_scientist",
  },
  {
    role: "faculty",
    displayName: "Staff",
    roleType: "faculty_staff",
  },
  {
    role: "faculty",
    displayName: "Teaching Faculty",
    roleType: "faculty_teaching_faculty",
  },
  {
    role: "faculty",
    isHiddenAsOption: true,
    isPrimaryAdvisor: true,
    displayName: "Advisor For Grad Student",
    roleType: "faculty_advisor_for_grad_student",
  },
  {
    role: "faculty",
    isHiddenAsOption: true,
    isPrimaryAdvisor: false,
    displayName: "Not Advisor For Grad Student",
    roleType: "faculty_not_advisor_for_grad_student",
  },
]

export const FACULTY = "faculty"
export const STUDENT = "student"

export const MATCH_LOADING_MESSAGE = "Stay tuned! Your latest matches are on the way"

export const getDisplayNameByRoleType = (roleType: string) => {
  const role = Roles.find((role) => role.roleType === roleType)
  return role ? role.displayName : "Role not found"
}
