import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IdeaDocument = HydratedDocument<Dev>;

@Schema()
export class Dev {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  creator: string;

  @Prop()
  idea: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const DevSchema = SchemaFactory.createForClass(Dev);
