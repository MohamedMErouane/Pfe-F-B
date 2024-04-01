/*
  Warnings:

  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "image" TEXT,
    "about" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "linkedIn" TEXT
);
INSERT INTO "new_User" ("about", "email", "emailVerified", "facebook", "firstName", "id", "image", "instagram", "lastName", "linkedIn", "password", "phone", "twitter") SELECT "about", "email", "emailVerified", "facebook", "firstName", "id", "image", "instagram", "lastName", "linkedIn", "password", "phone", "twitter" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
