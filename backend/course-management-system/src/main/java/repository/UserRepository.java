package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.UserDetails;

@Repository
public interface UserRepository extends JpaRepository<UserDetails, String> {
	public UserDetails findByEmail(String email);
}
