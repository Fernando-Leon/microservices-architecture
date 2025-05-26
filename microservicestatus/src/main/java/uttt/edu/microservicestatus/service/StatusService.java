package uttt.edu.microservicestatus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import uttt.edu.microservicestatus.model.Status;
import uttt.edu.microservicestatus.repository.StatusRepository;

@Service
public class StatusService {
    @Autowired
    private StatusRepository statusRepository;

    public Status save(Status status) {
        try {
            return statusRepository.save(status);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error al guardar el status: " + e.getMessage());
        }
    }

    public List<Status> getAll() {
        try {
            return statusRepository.findAll();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los status: " + e.getMessage());
        }
    }

    public Optional<Status> getById(UUID id) {
        try {
            Optional<Status> status = statusRepository.findById(id);
            if (status.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Status no encontrado con id: " + id);
            }
            return status;
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al buscar status por id: " + e.getMessage());
        }
    }

    public Optional<Status> getByNombre(String nombre) {
        try {
            Optional<Status> status = statusRepository.findByNombre(nombre);
            if (status.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Status no encontrado con nombre: " + nombre);
            }
            return status;
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al buscar status por nombre: " + e.getMessage());
        }
    }

    public Status update(UUID id, Status statusDetails) {
        try {
            return statusRepository.findById(id)
                .map(status -> {
                    status.setNombre(statusDetails.getNombre());
                    status.setFechaCreacion(statusDetails.getFechaCreacion());
                    return statusRepository.save(status);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status no encontrado con id: " + id));
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error al actualizar el status: " + e.getMessage());
        }
    }

    public Status updateByNombre(String nombre, Status statusDetails) {
        try {
            return statusRepository.findByNombre(nombre)
                .map(status -> {
                    status.setNombre(statusDetails.getNombre());
                    status.setFechaCreacion(statusDetails.getFechaCreacion());
                    return statusRepository.save(status);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status no encontrado con nombre: " + nombre));
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error al actualizar el status: " + e.getMessage());
        }
    }
}
