package uttt.edu.microservicestatus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uttt.edu.microservicestatus.model.Status;
import java.util.UUID;
import java.util.Optional;
import java.util.List;

public interface StatusRepository extends JpaRepository<Status, UUID> {
    Optional<Status> findByNombre(String nombre);
    List<Status> findAll();
}
