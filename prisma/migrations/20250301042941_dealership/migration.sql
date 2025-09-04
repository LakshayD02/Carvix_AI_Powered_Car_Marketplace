/*
  Warnings:

  - You are about to drop the column `city` on the `DealershipInfo` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `DealershipInfo` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `DealershipInfo` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `DealershipInfo` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `DealershipInfo` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `DealershipInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DealershipInfo" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "logoUrl",
DROP COLUMN "postalCode",
DROP COLUMN "state",
DROP COLUMN "website",
ALTER COLUMN "name" SET DEFAULT 'Carvix Motors',
ALTER COLUMN "address" SET DEFAULT 'New Road, South Campus, New Delhi, Delhi 110021',
ALTER COLUMN "phone" SET DEFAULT '+91 9560547779',
ALTER COLUMN "email" SET DEFAULT 'contact@carvix.com';
