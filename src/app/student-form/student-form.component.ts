import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentsService } from '../students.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.less']
})
export class StudentFormComponent implements OnInit {

  students: Student[];
  currentStudent: Student;
  isFormActive: boolean = false;
  studentForm: FormGroup;
  cpStudentForm: FormGroup;
  currentStudentIndex: number = null;
  gpaMin: number;
  gpaMax: number;
  constructor(
    private studentsService: StudentsService,
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.students = this.studentsService.getStudents();
    this.initForm();
    this.cpStudentForm = this.studentForm;
    console.log(this);
  }
  initForm() {
    this.studentForm = this.fb.group({
      name: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        middleName: [null, Validators.required]
      }),
      dateOfBirthday: [null,[Validators.required, this.dateOfBirthdayValidator]],
      gradePointAverage: [null, Validators.required],
      isActive: "true"
    });
    this.studentForm.get('name').setValidators([
      this.nameValidator
    ]);
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.studentForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
  activateForm() {
    this.isFormActive =  !this.isFormActive;
    this.gpaMax = 5;
  }
  private nameValidator(controlName: FormControl): ValidationErrors {
    const control = controlName.value;
    let isNameValid: boolean = true;
    if(control.firstName) {
      if(control.firstName == control.lastName || control.firstName == control.middleName) {
        isNameValid = false;
      }
    }
    if (!isNameValid) {
      return { invalidName: 'First Name should not match with other names' };
    }
    return null;
  }
  private dateOfBirthdayValidator(controlName: FormControl): ValidationErrors {
    const control = controlName.value;
    let currentDate = new Date();
    let compareDate = new Date();
    compareDate.setFullYear(currentDate.getFullYear() - 10);
    let isValid: boolean = true;
    if (new Date(control).getTime() - compareDate.getTime() > 0) {
      isValid = false;
    }
    if (!isValid) {
      return { invalidName: 'Date cannot be less than 10 years ago' };
    }
    return null;
  }
  onSubmit() {
    const controls = this.studentForm.controls;
    if (this.studentForm.invalid) {
      Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    this.currentStudent = new Student(this.studentForm.value.name.firstName,
      this.studentForm.value.name.lastName,
      this.studentForm.value.name.middleName,
      this.studentForm.value.dateOfBirthday,
      this.studentForm.value.gradePointAverage,true
    );
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
  editStudent(student, i) {
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
