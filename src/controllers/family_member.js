import { RELATIONS_ENUM, MARITAL_STATUS_ENUM, GENDER_ENUM, httpStatus } from '../constants'
import { FamilyMember } from '../models'
import { AppError } from '../utils'

export const FamilyMemberController = {
  create,
  get,
  update,
  remove,
  getEnums
}
async function create (req, res) {
  if (req.body.relation === 'Self') {
    throw new AppError('Relation can not be set to self', httpStatus.BAD_REQUEST)
  }
  const newFamilyMember = new FamilyMember({ ...req.body, user: req.user.id })
  await newFamilyMember.save()
  return res.json({ message: 'New Family Member added' })
}
async function get (req, res) {
  const { id } = req.params
  if (id) {
    const member = await FamilyMember.findById(id)
    return res.json({ member })
  }
  const members = await FamilyMember.find({ user: req.user.id })
  return res.json({ members })
}
async function update (req, res) {
  const { id } = req.params
  await FamilyMember.findByIdAndUpdate(id, req.body)
  return res.json({ message: 'Member updated' })
}
async function remove (req, res) {
  const { id } = req.params
  await FamilyMember.findByIdAndDelete(id)
  return res.json({ message: 'Member deleted' })
}
async function getEnums (req, res) {
  return res.json({ RELATIONS_ENUM, MARITAL_STATUS_ENUM, GENDER_ENUM })
}
