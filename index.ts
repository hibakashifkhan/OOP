import inquirer from "inquirer";

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    students: Student[] = [];
    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const person = new Person();

const programStart = async (person: Person) => {
    while (true) {
        console.log("Welcome!");
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "Who would you like to contact with?",
            choices: ["Staff", "Student", "Exit"],
        });
        
        if (ans.select == "Staff") {
            console.log("You have successfully approached the Staff room. Never hesitate to ask any questions.");
        } else if (ans.select == "Student") {
            const ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: "Enter the Student's Name you wish to contact with.",
            });
            
            const student = person.students.find(val => val.name === ans.student);
            
            if (!student) {
                const newStudent = new Student(ans.student);
                person.addStudent(newStudent);
                console.log(`Hi! I'm ${newStudent.name}. It's good to meet you!`);
                console.log("Student successfully added.");
            } else {
                console.log(`Hi! I'm ${student.name}. Nice to meet you again!`);
            }
            
            console.log("Current student list:");
            person.students.forEach(s => console.log(s.name));
        } else if (ans.select == "Exit") {
            console.log("Exiting...");
            process.exit(0);
        }
    }
};

programStart(person);
