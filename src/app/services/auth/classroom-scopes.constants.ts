export const ClassroomScopes = {
    CLASSROOM_ANNOUNCEMENTS: 'https://www.googleapis.com/auth/classroom.announcements',
    CLASSROOM_ANNOUNCEMENTS_READONLY: 'https://www.googleapis.com/auth/classroom.announcements.readonly',
    CLASSROOM_COURSES: 'https://www.googleapis.com/auth/classroom.courses',
    CLASSROOM_COURSES_READONLY: 'https://www.googleapis.com/auth/classroom.courses.readonly',
    CLASSROOM_COURSEWORK_ME: 'https://www.googleapis.com/auth/classroom.coursework.me',
    CLASSROOM_COURSEWORK_ME_READONLY: 'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
    CLASSROOM_COURSEWORK_STUDENTS: 'https://www.googleapis.com/auth/classroom.coursework.students',
    CLASSROOM_COURSEWORK_STUDENTS_READONLY: 'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
    CLASSROOM_COURSEWORKMATERIALS: 'https://www.googleapis.com/auth/classroom.courseworkmaterials',
    CLASSROOM_COURSEWORKMATERIALS_READONLY: 'https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly',
    CLASSROOM_GUARDIANLINKS_ME_READONLY: 'https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly',
    CLASSROOM_GUARDIANLINKS_STUDENTS: 'https://www.googleapis.com/auth/classroom.guardianlinks.students',
    CLASSROOM_GUARDIANLINKS_STUDENTS_READONLY: 'https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly',
    CLASSROOM_PROFILE_EMAILS: 'https://www.googleapis.com/auth/classroom.profile.emails',
    CLASSROOM_PROFILE_PHOTOS: 'https://www.googleapis.com/auth/classroom.profile.photos',
    CLASSROOM_PUSH_NOTIFICATIONS: 'https://www.googleapis.com/auth/classroom.push-notifications',
    CLASSROOM_ROSTERS: 'https://www.googleapis.com/auth/classroom.rosters',
    CLASSROOM_ROSTERS_READONLY: 'https://www.googleapis.com/auth/classroom.rosters.readonly',
    CLASSROOM_STUDENT_SUBMISSIONS_ME_READONLY: 'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
    CLASSROOM_STUDENT_SUBMISSIONS_STUDENTS_READONLY: 'https://www.googleapis.com/auth/classroom.student-submissions.students.readonly',
    CLASSROOM_TOPICS: 'https://www.googleapis.com/auth/classroom.topics',
    CLASSROOM_TOPICS_READONLY: 'https://www.googleapis.com/auth/classroom.topics.readonly',
  };
  
  // Função para obter todos os escopos como um array
  export function getAllClassroomScopes(): string[] {
    return Object.values(ClassroomScopes);
  }
  