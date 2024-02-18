export interface Message {
  id: string;
  content: string;
  author: Author;
}

export interface Author {
  username: string;
  avatarURL: string;
}
