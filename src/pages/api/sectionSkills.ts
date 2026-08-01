import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

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
  const response = await notion.databases.query({
    database_id: "f956ac4be74a42f8a9171149c1c9bc5a",
  });

  const skills = response.results.map((skill: any) => {
    const properties = skill.properties || {};
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

    return {
      skill_name: readTitle(nameProp) || readRichText(nameProp),
      skill_description: readRichText(descriptionProp) || undefined,
      skill_category: readSelect(categoryProp) || readRichText(categoryProp) || undefined,
      skill_level: readSelect(levelProp) || readRichText(levelProp) || undefined,
    };
  });

  return skills.filter((skill) => skill.skill_name);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const profile = await getSectionSkills();
  res.status(200).json(profile);
}
