import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  findAll() {
    return this.projectModel.find().exec();
  }

  findOne(id: string) {
    return this.projectModel.findById(id).exec();
  }

  create(project: Partial<Project>) {
    return this.projectModel.create(project);
  }

  update(id: string, project: Partial<Project>) {
    return this.projectModel
      .findByIdAndUpdate(id, project, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}