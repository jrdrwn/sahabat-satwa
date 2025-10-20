import prisma from '@db';
import { Hono } from 'hono';
import { type JwtVariables } from 'hono/jwt';
import { handle } from 'hono/vercel';

export type Variables = JwtVariables;
const app = new Hono<{ Variables: Variables }>().basePath('/api');

app.get('/', (c) => c.json({ message: 'Hello' }));

// VET
app.get('/vet', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM vet`;
  return c.json({ data });
});

app.get('/vet/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM vet WHERE vet_id = ${id}`;
  return c.json({ data });
});

app.post('/vet', async (c) => {
  const body = await c.req.json();
  const { vet_title, vet_givenname, vet_familyname, vet_phone, vet_employed, spec_id, clinic_id } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO vet (vet_title, vet_givenname, vet_familyname, vet_phone, vet_employed, spec_id, clinic_id) 
    VALUES (${vet_title}, ${vet_givenname}, ${vet_familyname}, ${vet_phone}, ${vet_employed}::date, ${spec_id}, ${clinic_id}) 
    RETURNING *
  `;
  return c.json({ data });
});

app.post('/vet/update/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { vet_title, vet_givenname, vet_familyname, vet_phone, vet_employed, spec_id, clinic_id } = body;
  const data = await prisma.$queryRaw`
    UPDATE vet 
    SET vet_title = ${vet_title}, vet_givenname = ${vet_givenname}, vet_familyname = ${vet_familyname}, 
        vet_phone = ${vet_phone}, vet_employed = ${vet_employed}::date, spec_id = ${spec_id}, clinic_id = ${clinic_id}
    WHERE vet_id = ${id} 
    RETURNING *
  `;
  return c.json({ data });
});

app.delete('/vet/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`DELETE FROM vet WHERE vet_id = ${id} RETURNING *`;
  return c.json({ data });
});

// OWNERS
app.get('/owners', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM owners`;
  return c.json({ data });
});

app.get('/owners/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM owners WHERE owner_id = ${id}`;
  return c.json({ data });
});

app.post('/owners', async (c) => {
  const body = await c.req.json();
  const { owner_givenname, owner_familyname, owner_address, owner_phone } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO owners (owner_givenname, owner_familyname, owner_address, owner_phone) 
    VALUES (${owner_givenname}, ${owner_familyname}, ${owner_address}, ${owner_phone}) 
    RETURNING *
  `;
  return c.json({ data });
});

app.post('/owners/update/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { owner_givenname, owner_familyname, owner_address, owner_phone } = body;
  const data = await prisma.$queryRaw`
    UPDATE owners 
    SET owner_givenname = ${owner_givenname}, owner_familyname = ${owner_familyname}, 
        owner_address = ${owner_address}, owner_phone = ${owner_phone}
    WHERE owner_id = ${id} 
    RETURNING *
  `;
  return c.json({ data });
});

app.delete('/owners/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`DELETE FROM owners WHERE owner_id = ${id} RETURNING *`;
  return c.json({ data });
});

// CLINIC
app.get('/clinic', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM clinic`;
  return c.json({ data });
});

app.get('/clinic/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM clinic WHERE clinic_id = ${id}`;
  return c.json({ data });
});

app.post('/clinic', async (c) => {
  const body = await c.req.json();
  const { clinic_name, clinic_address, clinic_phone } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO clinic (clinic_name, clinic_address, clinic_phone) 
    VALUES (${clinic_name}, ${clinic_address}, ${clinic_phone}) 
    RETURNING *
  `;
  return c.json({ data });
});

app.post('/clinic/update/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { clinic_name, clinic_address, clinic_phone } = body;
  const data = await prisma.$queryRaw`
    UPDATE clinic 
    SET clinic_name = ${clinic_name}, clinic_address = ${clinic_address}, clinic_phone = ${clinic_phone}
    WHERE clinic_id = ${id} 
    RETURNING *
  `;
  return c.json({ data });
});

app.delete('/clinic/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`DELETE FROM clinic WHERE clinic_id = ${id} RETURNING *`;
  return c.json({ data });
});

// DRUG
app.get('/drug', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM drug`;
  return c.json({ data });
});

app.get('/drug/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM drug WHERE drug_id = ${id}`;
  return c.json({ data });
});

app.post('/drug', async (c) => {
  const body = await c.req.json();
  const { drug_name, drug_usage } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO drug (drug_name, drug_usage) 
    VALUES (${drug_name}, ${drug_usage}) 
    RETURNING *
  `;
  return c.json({ data });
});

app.post('/drug/update/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { drug_name, drug_usage } = body;
  const data = await prisma.$queryRaw`
    UPDATE drug 
    SET drug_name = ${drug_name}, drug_usage = ${drug_usage}
    WHERE drug_id = ${id} 
    RETURNING *
  `;
  return c.json({ data });
});

app.delete('/drug/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`DELETE FROM drug WHERE drug_id = ${id} RETURNING *`;
  return c.json({ data });
});

// ANIMAL_TYPE
app.get('/animal-type', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM animal_type`;
  return c.json({ data });
});

app.get('/animal-type/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM animal_type WHERE at_id = ${id}`;
  return c.json({ data });
});

app.post('/animal-type', async (c) => {
  const body = await c.req.json();
  const { at_description } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO animal_type (at_description) 
    VALUES (${at_description}) 
    RETURNING *
  `;
  return c.json({ data });
});

app.post('/animal-type/update/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { at_description } = body;
  const data = await prisma.$queryRaw`
    UPDATE animal_type 
    SET at_description = ${at_description}
    WHERE at_id = ${id} 
    RETURNING *
  `;
  return c.json({ data });
});

app.delete('/animal-type/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`DELETE FROM animal_type WHERE at_id = ${id} RETURNING *`;
  return c.json({ data });
});

// SPECIALISATION
app.get('/specialisation', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM specialisation`;
  return c.json({ data });
});

app.get('/specialisation/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM specialisation WHERE spec_id = ${id}`;
  return c.json({ data });
});

app.post('/specialisation', async (c) => {
  const body = await c.req.json();
  const { spec_description } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO specialisation (spec_description) 
    VALUES (${spec_description}) 
    RETURNING *
  `;
  return c.json({ data });
});

app.post('/specialisation/update/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { spec_description } = body;
  const data = await prisma.$queryRaw`
    UPDATE specialisation 
    SET spec_description = ${spec_description}
    WHERE spec_id = ${id} 
    RETURNING *
  `;
  return c.json({ data });
});

app.delete('/specialisation/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`DELETE FROM specialisation WHERE spec_id = ${id} RETURNING *`;
  return c.json({ data });
});

// ANIMAL
app.get('/animal', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM animal`;
  return c.json({ data });
});

app.get('/animal/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM animal WHERE animal_id = ${id}`;
  return c.json({ data });
});

app.post('/animal', async (c) => {
  const body = await c.req.json();
  const { animal_name, animal_born, owner_id, at_id } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO animal (animal_name, animal_born, owner_id, at_id) 
    VALUES (${animal_name}, ${animal_born}::date, ${owner_id}, ${at_id}) 
    RETURNING *
  `;
  return c.json({ data });
});

app.post('/animal/update/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { animal_name, animal_born, owner_id, at_id } = body;
  const data = await prisma.$queryRaw`
    UPDATE animal 
    SET animal_name = ${animal_name}, animal_born = ${animal_born}::date, owner_id = ${owner_id}, at_id = ${at_id}
    WHERE animal_id = ${id} 
    RETURNING *
  `;
  return c.json({ data });
});

app.delete('/animal/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`DELETE FROM animal WHERE animal_id = ${id} RETURNING *`;
  return c.json({ data });
});

// VISIT
app.get('/visit', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM visit`;
  return c.json({ data });
});

app.get('/visit/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM visit WHERE visit_id = ${id}`;
  return c.json({ data });
});

app.post('/visit', async (c) => {
  const body = await c.req.json();
  const { visit_date_time, visit_notes, animal_id, vet_id, from_visit_id } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO visit (visit_date_time, visit_notes, animal_id, vet_id, from_visit_id) 
    VALUES (${visit_date_time}::timestamp, ${visit_notes}, ${animal_id}, ${vet_id}, ${from_visit_id}) 
    RETURNING *
  `;
  return c.json({ data });
});

app.post('/visit/update/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { visit_date_time, visit_notes, animal_id, vet_id, from_visit_id } = body;
  const data = await prisma.$queryRaw`
    UPDATE visit 
    SET visit_date_time = ${visit_date_time}::timestamp, visit_notes = ${visit_notes}, 
        animal_id = ${animal_id}, vet_id = ${vet_id}, from_visit_id = ${from_visit_id}
    WHERE visit_id = ${id} 
    RETURNING *
  `;
  return c.json({ data });
});

app.delete('/visit/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`DELETE FROM visit WHERE visit_id = ${id} RETURNING *`;
  return c.json({ data });
});

// VISIT_DRUG
app.get('/visit-drug', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM visit_drug`;
  return c.json({ data });
});

app.get('/visit-drug/:visitId/:drugId', async (c) => {
  const visitId = parseInt(c.req.param('visitId'));
  const drugId = parseInt(c.req.param('drugId'));
  const data = await prisma.$queryRaw`SELECT * FROM visit_drug WHERE visit_id = ${visitId} AND drug_id = ${drugId}`;
  return c.json({ data });
});

app.post('/visit-drug', async (c) => {
  const body = await c.req.json();
  const { visit_id, drug_id, visit_drug_dose, visit_drug_frequency, visit_drug_qtysupplied } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO visit_drug (visit_id, drug_id, visit_drug_dose, visit_drug_frequency, visit_drug_qtysupplied) 
    VALUES (${visit_id}, ${drug_id}, ${visit_drug_dose}, ${visit_drug_frequency}, ${visit_drug_qtysupplied}) 
    RETURNING *
  `;
  return c.json({ data });
});

app.post('/visit-drug/update/:visitId/:drugId', async (c) => {
  const visitId = parseInt(c.req.param('visitId'));
  const drugId = parseInt(c.req.param('drugId'));
  const body = await c.req.json();
  const { visit_drug_dose, visit_drug_frequency, visit_drug_qtysupplied } = body;
  const data = await prisma.$queryRaw`
    UPDATE visit_drug 
    SET visit_drug_dose = ${visit_drug_dose}, visit_drug_frequency = ${visit_drug_frequency}, 
        visit_drug_qtysupplied = ${visit_drug_qtysupplied}
    WHERE visit_id = ${visitId} AND drug_id = ${drugId} 
    RETURNING *
  `;
  return c.json({ data });
});

app.delete('/visit-drug/:visitId/:drugId', async (c) => {
  const visitId = parseInt(c.req.param('visitId'));
  const drugId = parseInt(c.req.param('drugId'));
  const data = await prisma.$queryRaw`DELETE FROM visit_drug WHERE visit_id = ${visitId} AND drug_id = ${drugId} RETURNING *`;
  return c.json({ data });
});

// SPEC_VISIT
app.get('/spec-visit', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM spec_visit`;
  return c.json({ data });
});

app.get('/spec-visit/:clinicId/:vetId', async (c) => {
  const clinicId = parseInt(c.req.param('clinicId'));
  const vetId = parseInt(c.req.param('vetId'));
  const data = await prisma.$queryRaw`SELECT * FROM spec_visit WHERE clinic_id = ${clinicId} AND vet_id = ${vetId}`;
  return c.json({ data });
});

app.post('/spec-visit', async (c) => {
  const body = await c.req.json();
  const { clinic_id, vet_id, sv_count } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO spec_visit (clinic_id, vet_id, sv_count) 
    VALUES (${clinic_id}, ${vet_id}, ${sv_count}) 
    RETURNING *
  `;
  return c.json({ data });
});

app.post('/spec-visit/update/:clinicId/:vetId', async (c) => {
  const clinicId = parseInt(c.req.param('clinicId'));
  const vetId = parseInt(c.req.param('vetId'));
  const body = await c.req.json();
  const { sv_count } = body;
  const data = await prisma.$queryRaw`
    UPDATE spec_visit 
    SET sv_count = ${sv_count}
    WHERE clinic_id = ${clinicId} AND vet_id = ${vetId} 
    RETURNING *
  `;
  return c.json({ data });
});

app.delete('/spec-visit/:clinicId/:vetId', async (c) => {
  const clinicId = parseInt(c.req.param('clinicId'));
  const vetId = parseInt(c.req.param('vetId'));
  const data = await prisma.$queryRaw`DELETE FROM spec_visit WHERE clinic_id = ${clinicId} AND vet_id = ${vetId} RETURNING *`;
  return c.json({ data });
});

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
