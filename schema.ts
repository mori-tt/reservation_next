import type { AdapterAccount } from "next-auth/adapters";

import Database from "better-sqlite3";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const sqlite = new Database("./sqlite.db");
export const db = drizzle(sqlite);

export const users = sqliteTable("user", {
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  id: text("id").notNull().primaryKey(),
  image: text("image"),
  name: text("name"),
});

export const accounts = sqliteTable(
  "account",
  {
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    id_token: text("id_token"),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    scope: text("scope"),
    session_state: text("session_state"),
    token_type: text("token_type"),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = sqliteTable("session", {
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const reserveDateTimes = sqliteTable(
  "reserveDateTime",
  {
    created_at: integer("created_at").default(
      sql`(strftime('%s', 'now', 'localtime'))`,
    ),
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    reserved_at: integer("reserved_at", { mode: "timestamp_ms" }).notNull(),
    updated_at: integer("updated_at").default(
      sql`(strftime('%s', 'now', 'localtime'))`,
    ),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => ({
    idx1: uniqueIndex("reserveDateTime_idx_1").on(table.reserved_at),
    // idx2: uniqueIndex("reserveDateTime_idx_2").on(table.userId),
  }),
);

export const reserveUserDetails = sqliteTable("reserveUserDetails", {
  created_at: integer("created_at").default(
    sql`(strftime('%s', 'now', 'localtime'))`,
  ),
  id: text("id").notNull().primaryKey(),
  realName: text("realName").notNull(),
  tel: text("tel").notNull(),
  updated_at: integer("updated_at").default(
    sql`(strftime('%s', 'now', 'localtime'))`,
  ),
});

migrate(db, { migrationsFolder: "./drizzle" });
