-- CreateTable
CREATE TABLE "results" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "exam_id" INTEGER,
    "assignment_id" INTEGER,
    "setudent_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_setudent_id_fkey" FOREIGN KEY ("setudent_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
