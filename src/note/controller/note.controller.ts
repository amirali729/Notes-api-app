/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from '../services/note.services.impl';
import { createNoteDto, deleteNoteDto } from '../dto/create.note.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('note')
export class NoteController {
  constructor(private readonly NotesService: NoteService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async CreateNote(@Request() req: any, @Body() CreateNoteData: createNoteDto) {
    return await this.NotesService.create(
      CreateNoteData,
      req.user.userId as number,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async DeleteNote(@Request() req: any, @Body() deleteNoteData: deleteNoteDto) {
    return this.NotesService.delete(deleteNoteData, req.user.userId as number);
  }
  @UseGuards(AuthGuard)
  @Post('your-note')
  async findNote(@Request() req: any, @Body() deleteNoteData: deleteNoteDto) {
    return this.NotesService.delete(deleteNoteData, req.user.userId as number);
  }

  @UseGuards(AuthGuard)
  @Get('')
  async findAllNotes(@Request() req: any) {
    return this.NotesService.findAllNotesByUserId(req.user.userId as number);
  }

  @UseGuards(AuthGuard)
  @Patch(':note-id/update')
  async updateNoteTitle(
    @Param('note-id') noteId: string,
    @Body() title: string,
  ) {
    return this.NotesService.updateNote(Number(noteId), title);
  }
}
