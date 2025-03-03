export interface IQuiz {
  id: number;
  question: string;
  options: IOptions[];
}

export interface IOptions {
  id: string;
  text: string;
  svg: string;
  width: number;
  height: number;
  selected: boolean;
}
