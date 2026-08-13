import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import type { INoteService } from '../services/note.service.interface';
import { createNoteDto } from '../dto/create.note.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('note')
export class NoteController {
  constructor(private readonly NotesService: INoteService) {}

  @UseGuards(AuthGuard)
  @Post()
  async CreateNotes(@Body() CreateNoteData: createNoteDto) {
    await this.NotesService.create(CreateNoteData);
  }
}
