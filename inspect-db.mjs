import 'dotenv/config'
import pg from 'pg'
const c = new pg.Client({ connectionString: process.env.POSTGRES_URL, ssl: { rejectUnauthorized: false } })
await c.connect()
const q = async (label, sql) => {
  const r = await c.query(sql)
  console.log(`\n== ${label} ==`)
  console.log(r.rows.length ? r.rows : '(none)')
}
await q('contact_section tables', `select table_name from information_schema.tables where table_schema='public' and table_name like '%contact_section%' order by 1`)
await q('legal tables', `select table_name from information_schema.tables where table_schema='public' and table_name like '%legal%' order by 1`)
await q('hero_type enum values', `select t.typname, e.enumlabel from pg_type t join pg_enum e on e.enumtypid=t.oid where t.typname like '%hero_type%' order by 1, e.enumsortorder`)
await q('payload_migrations rows', `select name, batch from payload_migrations order by id`)
await q('pages slugs', `select id, slug, _status, hero_type::text from pages order by id`)
await q('legal pages rows', `select id, slug, _status from legal_pages order by id`).catch(e => console.log('\n== legal_pages: '+e.message))
await q('locks / long queries', `select pid, state, wait_event_type, wait_event, left(query,80) as query, now()-query_start as dur from pg_stat_activity where datname=current_database() and pid<>pg_backend_pid() order by dur desc nulls last limit 10`)
await c.end()
