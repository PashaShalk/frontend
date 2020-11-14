export class User {
  id: number;
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  profileDescription?: string;
  role: string;
  status: string;

  constructor(id: number, email: string, nickname: string, firstName: string,
              lastName: string, profileDescription: string, role: string, status: string) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profileDescription = profileDescription;
    this.role = role;
    this.status = status;
  }
}
