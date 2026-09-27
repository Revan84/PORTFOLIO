import type { Skill } from "../types/project";

interface SkillListProps {
  skills: Skill[];
}

export function SkillList({ skills }: SkillListProps) {
  if (skills.length === 0) return null;
  return (
    <ul aria-label="Compétences">
      {skills.map((skill) => (
        <li key={skill.name}>{skill.name}</li>
      ))}
    </ul>
  );
}
