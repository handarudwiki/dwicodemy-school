/*
  Warnings:

  - Added the required column `birthday` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;
