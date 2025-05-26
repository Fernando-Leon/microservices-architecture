package uttt.edu.microservicestatus.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import uttt.edu.microservicestatus.model.Status;
import uttt.edu.microservicestatus.service.StatusService;

@RestController
@RequestMapping("/status")
public class StatusController {
    @Autowired
    private StatusService statusService;

    @PostMapping
    public Status createStatus(@RequestBody Status status) {
        return statusService.save(status);
    }

    @GetMapping
    public List<Status> getAllStatus() {
        return statusService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Status> getStatusById(@PathVariable UUID id) {
        return statusService.getById(id);
    }

    @GetMapping("/nombre/{nombre}")
    public Optional<Status> getStatusByNombre(@PathVariable String nombre) {
        return statusService.getByNombre(nombre);
    }

    @PutMapping("/{id}")
    public Status updateStatus(@PathVariable UUID id, @RequestBody Status status) {
        return statusService.update(id, status);
    }

    @PutMapping("/nombre/{nombre}")
    public Status updateStatusByNombre(@PathVariable String nombre, @RequestBody Status status) {
        return statusService.updateByNombre(nombre, status);
    }
}