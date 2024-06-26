create table "public"."room_keys" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" integer,
    "room_id" bigint,
    "returned_at" timestamp with time zone
);


CREATE UNIQUE INDEX room_keys_pkey ON public.room_keys USING btree (id);

alter table "public"."room_keys" add constraint "room_keys_pkey" PRIMARY KEY using index "room_keys_pkey";

alter table "public"."room_keys" add constraint "room_keys_room_id_fkey" FOREIGN KEY (room_id) REFERENCES rooms(id) not valid;

alter table "public"."room_keys" validate constraint "room_keys_room_id_fkey";

alter table "public"."room_keys" add constraint "room_keys_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."room_keys" validate constraint "room_keys_user_id_fkey";

grant delete on table "public"."room_keys" to "anon";

grant insert on table "public"."room_keys" to "anon";

grant references on table "public"."room_keys" to "anon";

grant select on table "public"."room_keys" to "anon";

grant trigger on table "public"."room_keys" to "anon";

grant truncate on table "public"."room_keys" to "anon";

grant update on table "public"."room_keys" to "anon";

grant delete on table "public"."room_keys" to "authenticated";

grant insert on table "public"."room_keys" to "authenticated";

grant references on table "public"."room_keys" to "authenticated";

grant select on table "public"."room_keys" to "authenticated";

grant trigger on table "public"."room_keys" to "authenticated";

grant truncate on table "public"."room_keys" to "authenticated";

grant update on table "public"."room_keys" to "authenticated";

grant delete on table "public"."room_keys" to "service_role";

grant insert on table "public"."room_keys" to "service_role";

grant references on table "public"."room_keys" to "service_role";

grant select on table "public"."room_keys" to "service_role";

grant trigger on table "public"."room_keys" to "service_role";

grant truncate on table "public"."room_keys" to "service_role";

grant update on table "public"."room_keys" to "service_role";


