import { useState, useEffect } from 'react';
import type { Student, StudentInput } from '../types';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentInput) => void;
  student?: Student | null; // If provided, we're editing; otherwise, creating
}

export default function StudentModal({ isOpen, onClose, onSubmit, student }: StudentModalProps) {
  const [formData, setFormData] = useState<StudentInput>({
    name: '',
    course: '',
    marks: 0,
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        course: student.course,
        marks: student.marks,
      });
    } else {
      setFormData({
        name: '',
        course: '',
        marks: 0,
      });
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">
            {student ? 'Edit Student' : 'Add New Student'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <input
              type="text"
              id="course"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
              placeholder="e.g. Computer Science"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="marks" className="block text-sm font-medium text-gray-700 mb-1">
              Marks (0 - 100)
            </label>
            <input
              type="number"
              id="marks"
              required
              min="0"
              max="100"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
              value={formData.marks}
              onChange={(e) => setFormData({ ...formData, marks: parseFloat(e.target.value) || 0 })}
            />
            <p className="mt-1 text-xs text-gray-500">Grade will be calculated automatically.</p>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
            >
              {student ? 'Update Student' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
