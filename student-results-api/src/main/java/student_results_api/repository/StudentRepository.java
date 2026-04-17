package student_results_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import student_results_api.model.Student;

/**
 * Spring Data JPA repository for Student entity.
 * Provides built-in CRUD operations with no boilerplate.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // All standard CRUD methods are inherited from JpaRepository
}
