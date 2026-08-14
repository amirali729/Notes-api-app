import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { NoteService } from '../services/note.services.impl';
import { createNoteDto } from '../dto/create.note.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('note')
export class NoteController {
  constructor(private readonly NotesService: NoteService) {}

  @UseGuards(AuthGuard)
  @Post()
  async CreateNotes(
    @Request() req: any,
    @Body() CreateNoteData: createNoteDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const response = await this.NotesService.create(CreateNoteData, req.user.userId as number);
    return response;
  }
}
