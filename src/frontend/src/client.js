import fetch from "unfetch";
const REST_VERBS = {
    POST: "POST",
    DELETE: "DELETE"
}
export const getAllStudents = () => {
    return fetch("api/v1/students")
        .then(checkStatus)
}

export const addStudent = (student) => {
    return fetch("api/v1/students", createHeader(student, REST_VERBS.POST))
}

export const deleteStudent = (student) => {
    return fetch(`api/v1/students/${student.id}`, createHeader(null, REST_VERBS.DELETE))
}

const checkStatus = (response) => {
    if (response.ok) {
        return response
    }

    const error = new Error(response.statusText)
    error.response = response;
    return Promise.reject(error)
}

const createHeader = (body, method) => {
    return {
        headers : {
            "Content-Type": "application/json",
        },
        "method": method,
        "body": JSON.stringify(body)
    }
}