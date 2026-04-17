import { useState, useEffect } from 'react';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import type { Student, StudentInput } from './types';
import * as api from './api';

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setIsLoading(true);
    try {
      const data = await api.fetchStudents();
      setStudents(data);
    } catch (error) {
      showToast('Failed to load students. Backend may be unreachable.', 'error');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddClick = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteStudent(id);
      setStudents(students.filter((s) => s.id !== id));
      showToast('Student deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete student', 'error');
      console.error(error);
    }
  };

  const handleModalSubmit = async (data: StudentInput) => {
    try {
      if (editingStudent) {
        const updated = await api.updateStudent(editingStudent.id, data);
        setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
        showToast('Student updated successfully', 'success');
      } else {
        const created = await api.createStudent(data);
        setStudents([...students, created]);
        showToast('Student created successfully', 'success');
      }
      setIsModalOpen(false);
    } catch (error) {
      showToast('Failed to save student', 'error');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg font-medium transform transition-all ${toast.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 'bg-red-100 text-red-800 border-l-4 border-red-500'}`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <svg className="w-8 h-8 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Student Result Management System
              </h1>
              <p className="mt-1 text-indigo-100 text-sm font-medium">Manage student grades, marks, and records seamlessly.</p>
            </div>
            <div className="bg-indigo-700/50 backdrop-blur px-4 py-2 rounded-lg border border-indigo-500/30 flex items-center justify-center">
              <span className="text-sm font-medium text-indigo-100">Total Students:</span>
              <span className="ml-2 text-xl font-bold bg-white text-indigo-700 w-8 h-8 inline-flex items-center justify-center rounded-md shadow-sm">{students.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-bold text-gray-800">Student Directory</h2>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Student
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium">Loading student records...</p>
          </div>
        ) : (
          <StudentTable
            students={students}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        student={editingStudent}
      />
    </div>
  );
}
