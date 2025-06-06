package uttt.edu.microservicestatus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class MicroservicestatusApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroservicestatusApplication.class, args);
	}

	@GetMapping("/")
	public String index() {
		return "Microservicio de estados en Spring Boot";
	}

	@GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
      return String.format("Hello %s!", name);
    }
}
