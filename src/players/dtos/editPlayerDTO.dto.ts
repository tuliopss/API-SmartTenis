import { IsEmail, IsNotEmpty } from 'class-validator';

export class EditPlayerDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly phone: string;
}
