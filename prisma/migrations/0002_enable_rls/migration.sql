-- O app acessa o banco só via Prisma, com a role "postgres" (dona das
-- tabelas), que RLS não afeta. Ativar RLS sem nenhuma policy bloqueia por
-- completo o acesso via API pública do Supabase (PostgREST/anon key),
-- sem mudar nada no funcionamento do painel.
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TagConfig" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ResultadoMensal" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;
