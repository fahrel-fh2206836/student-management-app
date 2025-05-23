import { NextResponse } from 'next/server'
import AppRepo from '@/app/repo/app-repo'

export async function GET(request, { params }) {
  const { StudentID } = params

  try {
    const data = await AppRepo.getLearningPathData(StudentID)

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Error fetching learning path:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  const student = await req.json()
  const updatedStudent = await AppRepo.updateStudent(params.StudentID, student);
  return Response.json(updatedStudent, {status: 200})
}