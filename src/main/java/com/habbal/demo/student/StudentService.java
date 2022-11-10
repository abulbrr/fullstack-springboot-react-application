package com.habbal.demo.student;

import com.habbal.demo.student.exception.BadRequestException;
import com.habbal.demo.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        if(studentRepository.findByEmail(student.getEmail()).isPresent()) {
            throw new BadRequestException("Student with email: [" + student.getEmail() + "] already exists");
        }

        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if(studentRepository.findById(studentId).isEmpty()) {
            throw new StudentNotFoundException("Student with ID: [" + studentId + "] does not exist" );
        }

        studentRepository.deleteById(studentId);
    }
}
