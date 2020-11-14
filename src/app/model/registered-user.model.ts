export class RegisteredUser {

  constructor(email: string, nickname: string, firstName: string, lastName: string, profileDescription: string,
              password: string, confirmPassword: string) {
    this.email = email;
    this.nickname = nickname;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profileDescription = profileDescription;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  profileDescription?: string;
  password: string;
  confirmPassword: string;
}
