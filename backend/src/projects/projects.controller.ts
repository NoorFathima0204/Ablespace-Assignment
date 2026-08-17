import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): any {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() project: any): any {
    return this.projectsService.create(project);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() project: any): any {
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.projectsService.remove(id);
  }
}