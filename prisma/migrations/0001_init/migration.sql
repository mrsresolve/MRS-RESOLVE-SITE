-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NOVO', 'ATENDIDO', 'FECHADO', 'PERDIDO');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('RASCUNHO', 'PUBLICADO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "origem" TEXT,
    "midia" TEXT,
    "campanha" TEXT,
    "termo" TEXT,
    "gclid" TEXT,
    "referrer" TEXT,
    "paginaUrl" TEXT NOT NULL,
    "botao" TEXT NOT NULL,
    "dispositivo" TEXT NOT NULL,
    "navegador" TEXT,
    "sistema" TEXT,
    "cidade" TEXT,
    "regiao" TEXT,
    "ipHash" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NOVO',
    "observacao" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultadoMensal" (
    "id" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "servicosFechados" INTEGER NOT NULL DEFAULT 0,
    "valorTotal" DECIMAL(10,2),
    "observacao" TEXT,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResultadoMensal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "capaUrl" TEXT,
    "capaAlt" TEXT,
    "metaTitulo" TEXT,
    "metaDesc" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'RASCUNHO',
    "publicadoEm" TIMESTAMP(3),
    "autorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagConfig" (
    "id" TEXT NOT NULL,
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TagConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_campanha_idx" ON "Lead"("campanha");

-- CreateIndex
CREATE UNIQUE INDEX "ResultadoMensal_ano_mes_key" ON "ResultadoMensal"("ano", "mes");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_status_publicadoEm_idx" ON "Post"("status", "publicadoEm");

-- CreateIndex
CREATE UNIQUE INDEX "TagConfig_chave_key" ON "TagConfig"("chave");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

