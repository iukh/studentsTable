import { Pipe, PipeTransform } from '@angular/core';
import { Student } from './student';

@Pipe({
  name: 'studentsFilter'
})
export class StudentsFilterPipe implements PipeTransform {

  transform(students: Student[], gpaMin: number, gpaMax: number, dobMin: Date, dobMax: Date): Student[] {
    if (gpaMin == undefined) gpaMin=0;
    if (gpaMax == undefined) gpaMax=100;
    if (dobMin == undefined) dobMin = new Date(1990, 11, 11); else dobMin= new Date(dobMin);
    if (dobMax == undefined) dobMax = new Date(); else dobMax= new Date(dobMax);
    return students
    .filter(
      a => a.gradePointAverage >= gpaMin && a.gradePointAverage <= gpaMax
    ).filter(
      a => a.dateOfBirthday.getTime() >= dobMin.getTime() && a.dateOfBirthday.getTime() <= dobMax.getTime()
    )
  }
}
