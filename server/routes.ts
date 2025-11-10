import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact inquiry endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      
      res.json({
        success: true,
        message: "Pesan berhasil diterima. Tim kami akan segera menghubungi Anda.",
        data: inquiry,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message,
        });
      }

      console.error("Error creating contact inquiry:", error);
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan. Silakan coba lagi.",
      });
    }
  });

  // Get all contact inquiries (untuk admin jika diperlukan)
  app.get("/api/contact", async (_req, res) => {
    try {
      const inquiries = await storage.getAllContactInquiries();
      res.json({
        success: true,
        data: inquiries,
      });
    } catch (error) {
      console.error("Error fetching contact inquiries:", error);
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan saat mengambil data.",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
