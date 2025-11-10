import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactInquiries = pgTable("contact_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nama: text("nama").notNull(),
  email: text("email").notNull(),
  noTelepon: text("no_telepon").notNull(),
  pesan: text("pesan").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).pick({
  nama: true,
  email: true,
  noTelepon: true,
  pesan: true,
}).extend({
  email: z.string().email("Email tidak valid"),
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  noTelepon: z.string().min(10, "Nomor telepon minimal 10 digit"),
  pesan: z.string().min(10, "Pesan minimal 10 karakter"),
});

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
