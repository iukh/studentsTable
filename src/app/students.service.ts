import { Injectable } from '@angular/core';
import { Student } from './student';


const students: Student[] = [
  new Student('Iuliia','Ivanova','Vladimirovna',new Date(1997, 1, 12),2.5,true),
  new Student('Irina','Sidorova','Ivanovna',new Date(1998, 10, 1),3.8,true),
  new Student('Oleg','Petrov','Danilovich',new Date(1996, 1, 11),2.8,true)
  // new Student('Sergey','Kraynov','Andreyevich',new Date(1997, 7, 6),4.2,true),
  // new Student('Ekaterina','Egorova','Stanislavovna',new Date(1998, 4, 3),3.1,true),
  // new Student('Svetlana','Kosheleva','Antonovna',new Date(1998, 4, 3),3.1,true),
  // new Student('Olga','Semenova','Alekseevna',new Date(1996, 4, 3),3.9,true),
  // new Student('Anton','Alekseev','Igorevich',new Date(1996, 7, 11),4.2,true),
]
@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor() { }
  getStudents(): Student[] {
    return students;
  }
}
