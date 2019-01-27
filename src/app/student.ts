export class Student {
  constructor(
    public firstName: string,
    public lastName: string,
    public middleName: string,
    public dateOfBirthday: Date,
    public gradePointAverage: number,
    public isActive: boolean
  ) {}
}
