"use server"

import { revalidatePath } from "next/cache"
import type { Report } from "../../lib/types";

interface SaveReportMetadataParams {
  userId: string
  reportName: string
  reportType: string
  reportDate: string
  fileUrl: string
  publicId: string
}

/**
 * Saves report metadata after Cloudinary upload
 */
export async function saveReportMetadata(
  params: SaveReportMetadataParams,
): Promise<{ success: boolean; report?: Report; error?: string }> {
  try {
    // Create report object with enhanced metadata
    const report: Report = {
      id: params.publicId.split("/").pop() || `report_${Date.now()}`,
      userId: params.userId,
      reportName: params.reportName,
      reportType: params.reportType,
      reportDate: params.reportDate,
      fileUrl: params.fileUrl,
      publicId: params.publicId,
      createdAt: new Date().toISOString(),
      // Add these fields to the Report type and include them here:
      isPublic: true, // Indicates this report is shareable with doctors
      fileType: "pdf", // The file type
      thumbnailUrl: params.fileUrl.replace("/upload/", "/upload/c_thumb,w_200,h_200/"), // Generate a thumbnail URL
    }

    // Rest of the function remains the same
    await simulateDatabaseSave(report)
    revalidatePath("/reports")
    return { success: true, report }
  } catch (error) {
    console.error("Error saving report metadata:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save report metadata",
    }
  }
}

/**
 * Retrieves reports for a specific user
 */
export async function getUserReports(
  userId: string,
): Promise<{ success: boolean; reports?: Report[]; error?: string }> {
  try {
    // In a real application, you would fetch from your database
    // For example:
    // const reports = await db.reports.findMany({
    //   where: { userId },
    //   orderBy: { createdAt: 'desc' },
    // });

    // For demonstration, we'll simulate fetching from a database
    // In a real app, replace this with your actual database code
    const reports = await simulateDatabaseFetch(userId)

    return { success: true, reports }
  } catch (error) {
    console.error("Error fetching reports:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch reports",
    }
  }
}

/**
 * Deletes a report from Cloudinary and the database
 */
export async function deleteReport(
  reportId: string,
  userId: string, // Added userId for authorization check
): Promise<{ success: boolean; error?: string }> {
  try {
    // In a real application, you would:
    // 1. Get the report from the database to get the Cloudinary public_id
    // const report = await db.reports.findUnique({ where: { id: reportId } })

    // 2. Verify that the report belongs to the user
    // if (report.userId !== userId) {
    //   return { success: false, error: "Unauthorized" }
    // }

    // 3. Delete from Cloudinary
    // For example, using Cloudinary's REST API:
    // const timestamp = Math.round(new Date().getTime() / 1000);
    // const signature = generateSignature(`public_id=${report.publicId}&timestamp=${timestamp}`);
    // const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     public_id: report.publicId,
    //     api_key: process.env.CLOUDINARY_API_KEY,
    //     timestamp,
    //     signature,
    //   }),
    // });

    // 4. Delete from your database
    // await db.reports.delete({ where: { id: reportId } })

    // For demonstration, we'll simulate deleting from a database
    await simulateDatabaseDelete(reportId, userId)

    revalidatePath("/reports")
    return { success: true }
  } catch (error) {
    console.error("Error deleting report:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete report",
    }
  }
}

// Mock database functions for demonstration
// In a real application, replace these with your actual database operations

// Mock in-memory database
let mockDatabase: Report[] = []

async function simulateDatabaseSave(report: Report): Promise<void> {
  // Check if report already exists (for update case)
  const existingIndex = mockDatabase.findIndex((r) => r.id === report.id)

  if (existingIndex >= 0) {
    // Update existing report
    mockDatabase[existingIndex] = report
  } else {
    // Add new report
    mockDatabase.push(report)
  }
}

async function simulateDatabaseFetch(userId: string): Promise<Report[]> {
  // Filter reports by userId and sort by createdAt (newest first)
  return mockDatabase
    .filter((report) => report.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

async function simulateDatabaseDelete(reportId: string, userId: string): Promise<void> {
  // Find the report
  const report = mockDatabase.find((r) => r.id === reportId)

  // Check if report exists and belongs to the user
  if (!report) {
    throw new Error("Report not found")
  }

  if (report.userId !== userId) {
    throw new Error("Unauthorized")
  }

  // Remove the report from the mock database
  mockDatabase = mockDatabase.filter((r) => r.id !== reportId)
}
