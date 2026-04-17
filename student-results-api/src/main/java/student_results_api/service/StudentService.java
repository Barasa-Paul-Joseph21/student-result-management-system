package student_results_api.service;

import org.springframework.stereotype.Service;
import student_results_api.model.Student;
import student_results_api.repository.StudentRepository;

import java.util.List;
import java.util.Optional;

/**
 * Service layer for Student business logic.
 * Handles grade calculation and delegates persistence to the repository.
 */
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    // Constructor injection (recommended over @Autowired on fields)
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // ─── CRUD Operations ────────────────────────────────────

    /** Retrieve all students */
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    /** Retrieve a single student by ID */
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    /** Create a new student — grade is auto-calculated from marks */
    public Student createStudent(Student student) {
        student.setGrade(calculateGrade(student.getMarks()));
        return studentRepository.save(student);
    }

    /** Update an existing student — grade is recalculated from new marks */
    public Student updateStudent(Long id, Student updatedData) {
        Student existing = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        existing.setName(updatedData.getName());
        existing.setCourse(updatedData.getCourse());
        existing.setMarks(updatedData.getMarks());
        existing.setGrade(calculateGrade(updatedData.getMarks()));

        return studentRepository.save(existing);
    }

    /** Delete a student by ID */
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    // ─── Grade Calculation Logic ────────────────────────────

    /**
     * Calculates the letter grade based on marks:
     *   80–100 → A
     *   65–79  → B
     *   50–64  → C
     *   35–49  → D
     *   Below 35 → F
     */
    private String calculateGrade(Double marks) {
        if (marks >= 80) return "A";
        if (marks >= 65) return "B";
        if (marks >= 50) return "C";
        if (marks >= 35) return "D";
        return "F";
    }
}
