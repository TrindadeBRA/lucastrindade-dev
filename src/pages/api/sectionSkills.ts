import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import { env } from "@/lib/env";

const notion = new Client({ auth: env.notionToken });

export interface Skill {
  skill_name: string;
  skill_description?: string;
  skill_category?: string;
  skill_level?: string;
}

function readTitle(prop: any) {
  return prop?.title?.[0]?.plain_text || prop?.title?.[0]?.text?.content || "";
}

function readRichText(prop: any) {
  if (!prop?.rich_text?.length) return "";
  return prop.rich_text.map((t: any) => t.plain_text || t.text?.content || "").join("").trim();
}

function readSelect(prop: any) {
  return prop?.select?.name || "";
}

function pickProp(properties: Record<string, any>, keys: string[]) {
  for (const key of keys) {
    if (properties[key]) return properties[key];
  }
  return null;
}

export async function getSectionSkills(): Promise<Skill[]> {
  try {
    const response = await notion.databases.query({
      database_id: env.notionDb.skills,
    });

  const skills = response.results.map((row: any) => {
    const properties = row.properties || {};
    const nameProp = pickProp(properties, ["skill_name", "Name", "name", "Skill"]);
    const descriptionProp = pickProp(properties, [
      "skill_description",
      "description",
      "skill_about",
      "about",
      "Descrição",
      "descricao",
    ]);
    const categoryProp = pickProp(properties, [
      "skill_category",
      "category",
      "Categoria",
      "categoria",
      "type",
    ]);
    const levelProp = pickProp(properties, [
      "skill_level",
      "level",
      "Nível",
      "nivel",
      "proficiency",
    ]);

    const skill_name = readTitle(nameProp) || readRichText(nameProp);
    const skill_description = readRichText(descriptionProp);
    const skill_category = readSelect(categoryProp) || readRichText(categoryProp);
    const skill_level = readSelect(levelProp) || readRichText(levelProp);

    // Omit empty optionals — Next.js getStaticProps cannot serialize `undefined`
    const mapped: Skill = { skill_name };
    if (skill_description) mapped.skill_description = skill_description;
    if (skill_category) mapped.skill_category = skill_category;
    if (skill_level) mapped.skill_level = skill_level;
    return mapped;
  });

    return skills.filter((skill) => skill.skill_name);
  } catch (error) {
    console.error('[getSectionSkills] Erro ao buscar skills:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const profile = await getSectionSkills();
    res.status(200).json(profile);
  } catch (error) {
    console.error('[API /sectionSkills] Erro:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar skills',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
