import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentsService } from './students.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsFilterPipe } from './students-filter.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  students: Student[];
  switchEnabled: boolean = false;
  isStudentActive: boolean = true;
  isPopUpActive: boolean = false;
  currentStudent: Student;
  searchInput: string = "";
  tmpSearchInput: string = "";
  gpaMin: number;
  gpaMax: number;
  isFormActive: boolean = false;
  studentForm: FormGroup;
  currentStudentIndex: number = null;

  initForm() {
    this.studentForm = this.fb.group({
      name: this.fb.group({
        firstName: null,
        lastName: null,
        middleName: null
      }, [
      Validators.required,
      Validators.minLength(4)]),
      dateOfBirthday: null,
      gradePointAverage: null,
      isActive: "true"
    });
  }

  constructor(
    private studentsService: StudentsService,
    private fb: FormBuilder) { }
  ngOnInit() {
    this.students = this.studentsService.getStudents();
    this.initForm();
  }
  changeSwitchValue() {
    this.switchEnabled = !this.switchEnabled;
  }
  showPopUp(student) {
    this.currentStudent = student;
    this.isPopUpActive = true;
  }
  closePopUp() {
    this.isPopUpActive = false;
  }
  deleteStudent() {
    console.log(this.currentStudent);
    this.currentStudent.isActive = false;
    this.closePopUp();
  }
  studentSearch() {
    this.searchInput =  this.tmpSearchInput;
  }
  private compareGPA(personA, personB) {
    return personB.gradePointAverage - personA.gradePointAverage;
  }
  sortByGPA() {
    this.students.sort(this.compareGPA);
    this.gpaMin = this.students[this.students.length - 1].gradePointAverage;
    this.gpaMax = this.students[0].gradePointAverage;
  }
  private compareLastName(personA, personB) {
    return personA.lastName.localeCompare(personB.lastName);
  }
  sortByLastName() {
    this.students.sort(this.compareLastName);
  }
  activateForm() {
    this.isFormActive =  !this.isFormActive;
    this.gpaMax = 5;
  }
  onSubmit() {
    this.currentStudent = new Student(this.studentForm.value.name.firstName,
                                  this.studentForm.value.name.lastName,
                                  this.studentForm.value.name.middleName,
                                  this.studentForm.value.dateOfBirthday,
                                 this.studentForm.value.gradePointAverage,true);
    if (this.currentStudentIndex) {
      this.students[this.currentStudentIndex] = this.currentStudent;
      this.isFormActive = false;
    } else {
      this.students.push(this.currentStudent);
    }
    this.gpaMax = this.gpaMax + 1;
    this.studentForm.reset();
    this.currentStudentIndex = null;
  }
  studentEdit(student, i) {
  this.activateForm();
  this.currentStudentIndex = i;
  this.studentForm.setValue({
    name: {
      firstName: student.firstName,
      lastName: student.lastName,
      middleName: student.middleName
    },
    dateOfBirthday: student.dateOfBirthday,
    gradePointAverage: student.gradePointAverage,
    isActive: "true"
  });
}
}
