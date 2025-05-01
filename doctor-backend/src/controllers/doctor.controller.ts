import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type RequestHandler = (req: Request, res: Response, next: NextFunction) => any;

// Add Doctor Controller
export const addDoctor: RequestHandler = async (req, res, next) => {
  try {
    const {
      name,
      specialty,
      experience,
      location,
      consultationFee,
      imageUrl,
      modeOfConsult,
      languages,
    } = req.body;

    if (!name || !specialty || !experience || !location || !consultationFee) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const doctor = await prisma.doctor.create({
      data: {
        name,
        specialty,
        experience: Number(experience),
        location,
        consultationFee: Number(consultationFee),
        imageUrl,
        modeOfConsult,
        languages,
      },
    });

    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// List Doctors Controller
export const listDoctors: RequestHandler = async (req, res) => {
  try {
    const {
      specialty,
      location,
      minExperience,
      maxExperience,
      maxConsultationFee,
      minConsultationFee,
      consultationType, // comma-separated (e.g., "online,hospital")
      languages,        // comma-separated (e.g., "english,hindi")
      page = "1",
      limit = "10",
    } = req.query;

    const filters: any = {};

    if (specialty) filters.specialty = String(specialty);
    if (location) filters.location = String(location);

    if (minExperience !== undefined && maxExperience !== undefined) {
      filters.experience = {
        gte: Number(minExperience),
        lte: Number(maxExperience),
      };
    } else if (minExperience !== undefined) {
      filters.experience = {
        gte: Number(minExperience),
      };
    }
    

  // If minConsultationFee exists, filter with $gte
  if (minConsultationFee !== undefined && maxConsultationFee !== undefined) {
    filters.consultationFee = {
      gte: Number(minConsultationFee),
      lte: Number(maxConsultationFee),
    };
  } else if (maxConsultationFee !== undefined) {
    filters.consultationFee = {
      lte: Number(maxConsultationFee),
    };
  } else if (minConsultationFee !== undefined) {
    filters.consultationFee = {
      gte: Number(minConsultationFee),
    };
  }

    if (consultationType) {
      const types = String(consultationType).split(',').map(t => t.trim());
      if (types.length) {
        filters.modeOfConsult = { hasSome: types };
      }
    }

    if (languages) {
      const langs = String(languages).split(',').map(l => l.trim());
      if (langs.length) {
        filters.languages = { hasSome: langs };
      }
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where: filters,
        skip,
        take: Number(limit),
      }),
      prisma.doctor.count({
        where: filters,
      }),
    ]);
  
    res.status(200).json({
      data: doctors,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
