/* eslint-disable prettier/prettier */
export class CreatePostDto {
  user_id: string;
  title: string;
  body: string;
  image: string;
  total_like?: number
}
