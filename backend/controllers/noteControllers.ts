import asyncHandler from 'express-async-handler';
import prisma from '../db/prisma';
import z from 'zod';
import fs from 'fs';
import cloudinary  from 'cloudinary';
import { Request } from 'express';

interface Note {
    title: string;
    description: string;
    authorId: number;
    image?: string;
    latitude: number;
    longitude: number;
}

export const createNote = asyncHandler(async (req : Request, res : any) => {
    const schema = z.object({
      title: z.string(),
      description: z.string(),
      authorId: z.number(),
      location: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
    });
  
    // Validate the request body
    const { title, description, authorId, location } = schema.parse(req.body);
  
    let noteData: Note = {
      title,
      description,
      authorId,
      latitude: location.latitude,
      longitude: location.longitude,
    };
  
    // Handle file upload if a file exists
    if (req.file) {
      try {
        const filePath = req.file.path;
  
        // Upload to Cloudinary
        const result = await cloudinary.v2.uploader.upload(filePath, {
          folder: "uploads",
        });
  
        // Remove file from local storage
        fs.unlinkSync(filePath);
  
        // Add image URL to the note data
        noteData = {...noteData , image: result.secure_url};
      } catch (error) {
        return res.status(500).json({ error: "File upload failed", details: error });
      }
    }
  
    // Create the note
    const note = await prisma.notes.create({
      data: noteData,
    });
  
    // Return the created note
     res.status(201).json(note);
  });



export const getNotes = asyncHandler(
    async (req, res) => {
        const schema = z.object({
            id : z.number()
        })
        const { id } = schema.parse(req.params);
            const notes = await prisma.notes.findMany({where:{
                authorId : id
            }});
            res.status(200).json(notes);
        
    }
)

export const getNote = asyncHandler(
    async (req: any, res: any) => {
        const schema = z.object({
            id : z.number()
        })
        const { id } = schema.parse(req.params);
            const note = await prisma.notes.findUnique({ where: { id } });
            if (!note) {
                return res.status(404).json({ message: "Note not found" });
            }
            res.status(200).json(note);
       
    }
)

export const updateNote = asyncHandler(
    async (req: any, res: any) => {
        const { id } = req.params;
        const { title, description } = req.body;
        const schema = z.object({
            id : z.number(),
            title : z.string(),
            description : z.string()
        })
        schema.parse({id , title , description})
            const note = await prisma.notes.update({
                where: { id },
                data: { title, description},
            });
            if (!note) {
                return res.status(404).json({ message: "Note not found" });
            }
            
            res.status(200).json(note);
    }
)

export const deleteNote = asyncHandler(
    async (req: any, res: any) => {
        const { id } = req.params;
            const note = await prisma.notes.delete({ where: { id } });
            if (!note) {
                return res.status(404).json({ message: "Note not found" });
            }
            res.status(200).json(note);
       
    }
)

export const addLable = asyncHandler(
    async (req, res) => {
        const schema = z.object({
            noteId : z.number(),
            labelId : z.number(),
        })
        const {noteId , labelId} = schema.parse(req.body);
        const label = await prisma.notes.update({
            where:{
                id : noteId
            },
            data:{
                labelId : labelId
            }
        });
        res.status(201).json(label);
    }
)