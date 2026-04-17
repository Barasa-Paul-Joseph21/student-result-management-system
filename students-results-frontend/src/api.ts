import type { Student, StudentInput } from './types';

const BASE_URL = 'http://localhost:8080/api/students';

export const fetchStudents = async (): Promise<Student[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch students');
  return response.json();
};

export const createStudent = async (student: StudentInput): Promise<Student> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) throw new Error('Failed to create student');
  return response.json();
};

export const updateStudent = async (id: number, student: StudentInput): Promise<Student> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) throw new Error('Failed to update student');
  return response.json();
};

export const deleteStudent = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete student');
};
