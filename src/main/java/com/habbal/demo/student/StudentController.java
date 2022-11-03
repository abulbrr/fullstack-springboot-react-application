package com.habbal.demo.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import static com.habbal.demo.student.Gender.MALE;

@RestController
@RequestMapping(path = "api/${api.version}/students")
public class StudentController {

    @GetMapping
    public Collection<Student> getAllStudents() {
        return Arrays.asList(
                new Student(
                        1L,
                        "Baraa",
                        "baraa@habbal.com",
                        MALE
                ),
                new Student(
                        2L,
                        "Johnny",
                        "johnny@doe.com",
                        MALE
                )
        );
    }
}
