package student_results_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

/**
 * Student entity representing a student record in the system.
 * The grade field is auto-calculated from marks — never set manually by the user.
 */
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Course is required")
    @Column(nullable = false)
    private String course;

    @NotNull(message = "Marks are required")
    @Min(value = 0, message = "Marks must be at least 0")
    @Max(value = 100, message = "Marks must be at most 100")
    @Column(nullable = false)
    private Double marks;

    // Grade is auto-calculated by the service layer — not settable via API
    @Column(nullable = false)
    private String grade;

    // ─── Constructors ───────────────────────────────────────

    public Student() {
    }

    public Student(String name, String course, Double marks, String grade) {
        this.name = name;
        this.course = course;
        this.marks = marks;
        this.grade = grade;
    }

    // ─── Getters & Setters ──────────────────────────────────

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public Double getMarks() {
        return marks;
    }

    public void setMarks(Double marks) {
        this.marks = marks;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
