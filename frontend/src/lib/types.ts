export interface Message {
  content: string;
  author: Author;
}

export interface Author {
  username: string;
  avatarURL: string;
}
