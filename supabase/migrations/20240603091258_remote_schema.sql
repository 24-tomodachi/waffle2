alter table "public"."verification_tokens" drop constraint "verification_tokens_pkey";

drop index if exists "public"."verification_tokens_pkey";

alter table "public"."verification_tokens" add column "token" uuid not null;

CREATE UNIQUE INDEX verification_tokens_pkey ON public.verification_tokens USING btree (created_at, user_id, token);

alter table "public"."verification_tokens" add constraint "verification_tokens_pkey" PRIMARY KEY using index "verification_tokens_pkey";


