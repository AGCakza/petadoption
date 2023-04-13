import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import { Pet } from "../models"
import { IPet, PetDocument } from "../models/pet.model"

export async function createPet(input: IPet): PetDocument {
    const res = await Pet.create(input).catch(err => err)
    return res
}

export async function getPets(page: number, perPage: number, owner: string): Array<UserDocument> {
    if(!page) page = 1
    if(!perPage) perPage = 10
    const arr = await Pet.find({...(owner && { owner })}).skip((page - 1) * perPage).limit(perPage)
    return arr
}

export async function getPet(id: string): PetDocument {
    const pet = await Pet.findById(id)
    return pet
}

export async function updatePet(id: string, input: IPet): PetDocument {
    const res = await Pet.findByIdAndUpdate(id, input).catch(err => err)
    return res
}