'use server';

import { signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import { RegisterSchema, registerSchema } from '@/lib/schemas/RegisterSchema';
import { LoginSchema } from '@/lib/schemas/LoginSchema';
import { ActionResult } from '@/types';
import { TokenType, User } from '@prisma/client';  // Properly import TokenType
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const existingUser = await getUserByEmail(data.email);

        if (!existingUser || !existingUser.email) return { status: 'error', error: 'Invalid credentials' }

        if (!existingUser.emailVerified) {
            const { token, email } = await generateToken(existingUser.email, TokenType.VERIFICATION);

            await sendVerificationEmail(email, token)

            return { status: 'error', error: 'Please verify your email before logging in' }
        }

        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        });

        return { status: 'success', data: 'Logged in' }
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { status: 'error', error: 'Invalid credentials' }
                default:
                    return { status: 'error', error: 'Something went wrong' }
            }
        } else {
            return { status: 'error', error: 'Something else went wrong' }
        }
    }
}

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = registerSchema.safeParse(data);

        if (!validated.success) {
            return { status: 'error', error: validated.error.errors };
        }

        const { name, email, password } = validated.data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { status: 'error', error: 'User already exists' };
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
                member: {
                    create: {
                        name,
                        email,
                        passwordHash: hashedPassword,
                    },
                },
            },
        });

        const verificationToken = generateToken(email, TokenType.VERIFICATION); // Now works

        return { status: 'success', data: user };
    } catch (error) {
        console.error("Registration Error:", error);
        return { status: 'error', error: 'Something went wrong' };
    }
}
export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}


function generateToken(email: string, type: TokenType): { email: string; token: string } {
    return {
        email,
        token: crypto.randomBytes(32).toString('hex'),
    };
}
