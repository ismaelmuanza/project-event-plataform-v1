// src/routes/upload-routes.ts
import { FastifyInstance } from 'fastify';
import multer from 'fastify-multer';
import multerConfig from '../config/multer';
import { UploadedFile, UploadImageService } from '../services/upload-image-service';

const upload = multer(multerConfig);

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', { preHandler: upload.single('image')}, async (request, reply) => {
    const file = request.file as unknown as UploadedFile;

    if (!file) {
      return reply.status(400).send({ error: 'Nenhuma imagem enviada.' });
    }

    const uploadImageService = new UploadImageService();
    await uploadImageService.execute(file);

    return reply.send({ message: 'Upload realizado com sucesso!', filename: file.filename});
  });
}
