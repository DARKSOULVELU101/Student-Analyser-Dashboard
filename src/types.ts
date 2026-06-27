export type User = { id: number; username: string; email: string; user_type: 'parent' | 'staff' }
export type Subject = { id: number; name: string; description: string; notes: string; color_code: string }
export type Student = { id: number; name: string; roll_number: string; email: string; phone: string; whatsapp_number: string }
export type Exam = { id: number; subject: number; subject_name: string; exam_type: string; exam_date: string; total_marks: number }
export type Performance = { id: number; student: number; exam: number; marks_obtained: number; percentage: number; grade: string; attendance: number; student_name: string; subject_name: string; exam_type: string; exam_date: string }
export type Stats = { total_students: number; total_subjects: number; total_exams: number; average_performance: number; performance_count: number }
