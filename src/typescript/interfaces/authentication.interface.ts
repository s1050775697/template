// export interface IAuthentication {
//   email: string;
//   password: string;
// }

// export interface ISignupAuthentication {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   username: string;
//   dob: string;
//   gender: string;
// }

// export interface IUser extends ISignupAuthentication {
//   id: string;
//   uid: string;
//   likes: string[];
//   profilePicURL: string;
//   hasAnsweredQuiz: boolean;
// }

export interface IAuthentication {
  email: string;
  password: string;
}

export interface ISignupAuthentication {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  dob: string;
  quizResponses?: IQuizResponse[];
  hasAnsweredQuiz?: boolean;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  uid?: string;
  profilePicURL?: string;
  likes: string[];
  dob: string;
  hasAnsweredQuiz?: boolean;
  quizResponses?: IQuizResponse[];
}

export interface IQuizResponse {
  question: string;
  option: string;
}
