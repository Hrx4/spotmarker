import asyncHandler from 'express-async-handler';
import z from 'zod'
import prisma from '../db/prisma';
import { Request, Response } from 'express';

export const createLabel = asyncHandler(async(req : Request, res : Response) =>{
    const schema = z.object({
        name : z.string(),
        authorId : z.number()
    })

    const {name , authorId} = schema.parse(req.body)
    const label = prisma.labels.create({
        data:{
            name , authorId
        }
    })
    res.status(201).json(label)
})

export const getLabels = asyncHandler(async (req : Request, res : Response) => {
    const schema = z.object({
        authorId : z.number()
    })
    const { authorId } = schema.parse(req.params);
    // if (!authorId) {
    //     res.status(400).json({ message: "authorId is required" });
    //     return;
    // }
    const labels = await prisma.labels.findMany({
        where: {
            authorId,
        },
    });
    res.status(200).json(labels);
})

export const deleteLabel = asyncHandler(async (req : Request, res : Response) => {
    const schema = z.object({
        id : z.number()
    })
    const { id } = schema.parse(req.params);
    // if (!id) {
    //     res.status(400).json({ message: "id is required" });
    //     return;
    // }
    const label = await prisma.labels.delete({
        where: {
            id,
        },
    });
    res.status(200).json(label);
})