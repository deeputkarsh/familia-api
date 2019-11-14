import mongoose, { Schema } from 'mongoose'
import { SCHEMA_NAMES, RELATIONS_ENUM, GENDER_ENUM, MARITAL_STATUS_ENUM } from '../constants'

// WIP
const relation = new Schema({
  relation: {
    type: String,
    required: true,
    enum: RELATIONS_ENUM
  },
  with: {
    type: Schema.Types.ObjectId,
    ref: SCHEMA_NAMES.FAMILY_MEMBER,
    required: true
  }
})
const schemaDef = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: SCHEMA_NAMES.USER,
    required: true
  },
  name: {
    type: String,
    required: true,
    max: 100
  },
  relations: [relation],
  maritalStatus: {
    type: String,
    required: true,
    enum: MARITAL_STATUS_ENUM
  },
  gender: {
    type: String,
    required: true,
    enum: GENDER_ENUM
  },
  dob: Date
})

schemaDef.pre('remove', function (next) {
  if (this.relation === 'Self') {
    return next(new Error('You can\'t delete yourself from the family tree'))
  }
  next()
})

schemaDef.pre('findOneAndUpdate', function (next) {
  if (this.relation === 'Self' && this._update.relation && this._update.relation !== 'Self') {
    return next(new Error('You can\'t change your relation with yourself'))
  }
  next()
})

export const FamilyMember = mongoose.model(SCHEMA_NAMES.FAMILY_MEMBER, schemaDef)
