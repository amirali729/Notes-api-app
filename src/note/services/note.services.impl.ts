import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NoteRespository } from '../repository/note.repository.impl';
import { INoteService } from './note.service.interface';
import { createNoteDto, deleteNoteDto } from '../dto/create.note.dto';
import { createNoteResponse } from '../responses/note.response';
import { NoteEntity } from '../model/note.entity';
import { Infrastructure } from 'src/exceptions/exception';

@Injectable()
export class NoteService implements INoteService {
  constructor(private readonly NotesRepository: NoteRespository) {}

  async create(
    createNoteDto: createNoteDto,
    userId: number,
  ): Promise<createNoteResponse> {
    const notefound = await this.NotesRepository.findNotesByTitle(
      createNoteDto.title,
      userId,
    );
    if (notefound) {
      throw new ConflictException('title with this note is already exist');
    }

    const note = {
      ...createNoteDto,
      userId,
    };

    const createdNote = await this.NotesRepository.createNotes(note);
    if (!createdNote) {
      throw new InternalServerErrorException('note creation failed');
    }
    return {
      title: createdNote.title,
      description: createdNote.description,
      createdBy: createdNote.createdBy,
    };
  }

  async delete(
    deleteNoteDto: deleteNoteDto,
    userId: number,
  ): Promise<NoteEntity> {
    const foundNote = await this.NotesRepository.findNotesByTitle(
      deleteNoteDto.title,
      userId,
    );

    if (!foundNote) {
      throw new NotFoundException(
        'note by this title doesnot exist please first create note',
        {
          cause: new Error(),
          description: 'note not found',
        },
      );
    }

    const deletedNote = await this.NotesRepository.deleteNoteBytitle(
      foundNote.title,
    );

    if (!deletedNote) {
      throw new Infrastructure();
    }

    return deletedNote;
  }

  async findNoteBytitle(
    deleteNote: deleteNoteDto,
    userId: number,
  ): Promise<any> {
    const foundNote = await this.NotesRepository.findNotesByTitle(
      deleteNote.title,
      userId,
    );
    if (!foundNote) {
      throw new NotFoundException(
        'note by this title doesnot exist please first create note',
        {
          cause: new Error(),
          description: 'note not found',
        },
      );
    }

    return foundNote;
  }

  async findAllNotesByUserId(userId: number): Promise<NoteEntity[]> {
    const userNotes = await this.NotesRepository.findAllNotesByUser(userId);
    if (!userNotes) {
      throw new NotFoundException(
        'note by this title doesnot exist please first create note',
        {
          cause: new Error(),
          description: 'note not found',
        },
      );
    }

    return userNotes;
  }
}
