import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class createNoteDto {
  @IsNotEmpty({ message: 'title canot be empty' })
  @IsString({ message: 'title must be a string' })
  @MinLength(5, { message: 'title must be a six word' })
  title: string;

  @IsNotEmpty({ message: 'description canot be empty' })
  @IsString({ message: 'description must be a string' })
  @MinLength(10, { message: 'description must be a six word' })
  description: string;
}

export class deleteNoteDto {
  @IsNotEmpty({ message: 'title canot be empty' })
  @IsString({ message: 'title must be a string' })
  @MinLength(5, { message: 'title must be a six word' })
  title: string;
}
