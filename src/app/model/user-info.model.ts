export class UserInfo {

  firstName: string;
  lastName: string;
  profileDescription?: string;

  constructor(firstName: string, lastName: string, profileDescription: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.profileDescription = profileDescription;
  }
}
