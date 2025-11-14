export type Course = {
  courseId: string;
  name: string;
  description: string;
  invitationCode: string;
  invitationLink: string;
  createdAt: string;
  status: 'ACTIVE' | 'ARCHIVED';
};

export type Module = {
  moduleId: string;
  name: string;
  description: string;
  courseId: string;
  createdAt: string;
};