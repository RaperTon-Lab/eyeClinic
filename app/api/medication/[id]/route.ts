import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getIdFromRequest = (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  return id;
};

export async function GET(req: NextRequest) {
  const id = getIdFromRequest(req);
  
  if (!id) {
    console.log("No patient ID found in the URL.");
    return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
  }
  console.log("Request received for patient ID:", id);

  try {
    const medication = await prisma.medication.findMany({
      where: { patient_id: id },
    });
    
    if (!medication || medication.length === 0) {
      console.log("No medication found for patient ID:", id);
      return NextResponse.json({ message: "Medication not found" }, { status: 404 });
    }

    console.log("Medication found for patient ID:", id, medication);
    return NextResponse.json(medication, { status: 200 });
  } catch (error) {
    console.error("Error executing query", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  const id = getIdFromRequest(req);
  if (!id) {
    return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ message: "Invalid data format" }, { status: 400 });
    }

    const requiredFields = ["sl_no", "eye", "form", "medicine", "dose", "frequency", "duration", "remark"];

    for (const entry of body) {
      for (const field of requiredFields) {
        if (!entry[field]) {
          return NextResponse.json({ message: `Missing required field: ${field}` }, { status: 400 });
        }
      }
    }

    for (const entry of body) {
      const existingMedication = await prisma.medication.findUnique({
        where: {
          patient_id_sl_no: {
            patient_id: id,
            sl_no: entry.sl_no,
          },
        },
      });

      if (existingMedication) {
        await prisma.medication.update({
          where: {
            patient_id_sl_no: {
              patient_id: id,
              sl_no: entry.sl_no,
            },
          },
          data: {
            eye: entry.eye,
            form: entry.form,
            medicine: entry.medicine,
            dose: entry.dose,
            frequency: entry.frequency,
            duration: entry.duration,
            remark: entry.remark,
          },
        });
        return NextResponse.json({ message: "Medications processed" }, { status: 200 });
      } else {
        await prisma.medication.create({
          data: {
            patient_id: id,
            sl_no: entry.sl_no,
            eye: entry.eye,
            form: entry.form,
            medicine: entry.medicine,
            dose: entry.dose,
            frequency: entry.frequency,
            duration: entry.duration,
            remark: entry.remark,
          },
        });
        return NextResponse.json({ message: "Medications processed" }, { status: 201 });
      }
    }

  } catch (error) {
    console.error("Error executing query", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req:NextRequest) {
  const id = getIdFromRequest(req);
  
  if (!id) {
    console.log("No patient ID found in the URL.");
    return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
  }

  try{
    const body = await req.json();
    const requiredFields=["sl_no"];
    for( const field of requiredFields){
      if(!body[field]){
        return NextResponse.json({ message:`Missing required field: ${field}`},{status:400});
      }
    }
    const deletedRecord = await prisma.medication.delete({
      where:{
        patient_id_sl_no: {
            patient_id: id,
            sl_no: body.sl_no,
          },
      }
    });
    return NextResponse.json({message: "Medication deleted"},{status:200});
  } catch(error){
    console.error(error);
    return NextResponse.json({ message: `Failed to delete record`},{status:500});
  }

}

export function methods() {
  return ["GET", "POST","DELETE"];
}

export async function OPTIONS() {
  return NextResponse.json(null, { headers: { Allow: "GET, POST, DELETE" } });
}
