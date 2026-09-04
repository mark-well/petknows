gen-db-types:
  npx supabase gen types typescript --project-id "riooazyiuocxhheqcaaw" --schema public > src/shared/types/database.types.ts

build-dev:
  eas build --profile development --platform android