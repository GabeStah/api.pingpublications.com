import { Document, Schema, model } from 'mongoose';

export interface CompanyInterface extends Document {
  created_at: Date;
  updated_at: Date;
  name: string;
  email_address: string;
  overview?: string;
  //
  // @prop()
  // job?: Job;
  //
  // @prop({ ref: Car, required: true })
  // car: Ref<Car>;
}

const schema = new Schema({
  created_at: {
    type: Date,
    required: false
  },
  updated_at: {
    type: Date,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    required: false
  },
  overview: String
});

export const CompanySchema = model<CompanyInterface>(
  'company',
  schema,
  'companies'
);
