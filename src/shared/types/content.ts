export interface Link {
  label: string;
  url: string;
}

export interface Media {
  type: "image" | "video" | "gif";
  src: string;
  alt: string;
}

export interface Project {
  title: string;
  date?: string;
  techStack: string[];
  description: string;
  achievements: string[];
  links: Link[];
  media?: Media[];
}

export interface CompetitionExperience {
  title: string;
  date: string;
  role?: string;
  description: string;
  achievements: string[];
  links?: Link[];
  media?: Media[];
}

export interface CommunityContributionExperience {
  title: string;
  date: string;
  role: string;
  description: string;
  achievements: string[];
  links?: Link[];
  media?: Media[];
}

export interface WorkingExperience {
  title: string;
  date: string;
  role: string;
  description: string;
  achievements: string[];
  links?: Link[];
  media?: Media[];
}

export interface AcademicExperience {
  institution: string;
  program: string;
  summary: string;
  achievements: string[];
  media?: Media[];
}

export interface Contact {
  email: string;
  links: Link[];
}

export interface PortfolioContent {
  header: string;
  intro: string;
  projects: Project[];
  competitions: CompetitionExperience[];
  communityContributions: CommunityContributionExperience[];
  workingExperience: WorkingExperience[];
  academic: AcademicExperience[];
  contact: Contact;
  footer: string;
}

export interface ContentSection {
  id: string;
  type:
    | "projects"
    | "projectItem"
    | "competitions"
    | "competitionItem"
    | "communityContributions"
    | "communityContributionItem"
    | "workingExperience"
    | "workingExperienceItem"
    | "academic"
    | "academicItem"
    | "footer";
  title?: string;
  content?: any;
  level: number;
}
