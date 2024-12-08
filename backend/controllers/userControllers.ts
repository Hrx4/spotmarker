import asyncHandler from "express-async-handler"
import prisma from "../db/prisma";
import { z } from "zod";
import bcrypt from 'bcrypt';


export const createUser = asyncHandler(async (req, res) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
    });
    const { email, password, name } =  schema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password , 10)
    const user = await prisma.user.create({
        data: {
            email,
            password : hashedPassword,
            name,
        },
    });
    res.status(201).json(user);
});

export const loginUser = asyncHandler(async (req, res) => {
    const schema = z.object({
        email : z.string(),
        password : z.string()
    })
    const { email, password } =  schema.parse(req.body);
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        res.status(400).json({ message: "Invalid Credentials" });
        return;
    }

    const isPassword = await bcrypt.compare(password , user.password)
    if (!isPassword) {
        res.status(400).json({ message: "Invalid Credentials" });
        return;
    }
    res.status(200).json(user);
})

export const getUser = asyncHandler(async (req, res) => {
    const schema = z.object({
        id : z.number()
    })
    const { id } = schema.parse(req.params);
    if (!id) {
        res.status(400).json({ message: "id is required" });
        return;
    }
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    res.status(200).json(user);
});