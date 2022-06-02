import express from 'express';
import nodemailer from 'nodemailer';
import { NodemailerMailIntegration } from './integration/nodemailder/nodemailer-mail-integration';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedback } from './services/submit-feedback';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailIntegration = new NodemailerMailIntegration();

  const submitFeedbacks = new SubmitFeedback(
    prismaFeedbacksRepository,
    nodemailerMailIntegration
  );

  await submitFeedbacks.handle({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
