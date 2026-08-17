import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description!: string;

  @Prop()
  status!: string;

  @Prop()
  priority!: string;

  @Prop()
  member!: string;

  @Prop()
  dueDate!: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);