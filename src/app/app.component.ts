import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentsService } from './students.service';
import { FormsModule } from '@angular/forms';
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

  constructor(private studentsService: StudentsService) { }
  ngOnInit() {
    this.students = this.studentsService.getStudents();
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
}
