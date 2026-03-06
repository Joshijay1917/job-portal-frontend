import { ROUTES } from "../../Routes"

export const recruiterMenu = [
  { name: "Profile", path: ROUTES.RECRUITER_DASHBOARD },
  { name: "Post Job", path: ROUTES.RECRUITER_POST_JOB },
  { name: "Posted Jobs", path: ROUTES.RECRUITER_JOBS },
  { name: "Candidates", path: ROUTES.RECRUITER_CANDIDATES },
  { name: "Settings", path: ROUTES.RECRUITER_SETTINGS }
]

export const candidateMenu = [
  { name: "Profile", path: ROUTES.CANDIDATE_DASHBOARD },
  { name: "Applications", path: ROUTES.CANDIDATE_APPLICATIONS },
  { name: "Saved Jobs", path: ROUTES.CANDIDATE_SAVED_JOBS },
  { name: "Settings", path: ROUTES.CANDIDATE_SETTINGS }
]