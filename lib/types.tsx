interface ContentNode {
  text?: string;
  type?: string;
  children?: ContentNode[];
}

interface BenefitChild {
  text: string;
}

interface Benefit {
  children?: BenefitChild[];
}

interface ApplicationProcessStep {
  children?: ContentNode[];
}

interface ApplicationProcess {
  mode: string;
  process?: ApplicationProcessStep[];
}

interface DocumentText {
  text: string;
}

interface DocumentChild {
  type: string;
  children?: DocumentText[];
}

interface Document {
  children?: DocumentChild[];
}

export default interface SchemeProps {
  _id?: string;
  schemeName: string;
  schemeShortTitle?: string;
  state?: string;
  level?: string;
  tags?: string[];
  category?: string[];
  detailedDescription_md?: string;
  eligibilityDescription_md?: string;
  benefits?: Benefit[];
  applicationProcess?: ApplicationProcess[];
  references?: Array<{
    title: string;
    url: string;
    _id?: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
    _id?: string;
  }>;
  documents_required?: Document[];
  openDate?: string | null;
  closeDate?: string | null;
  nodalMinistryName?: string | null;
}

export interface TagsDropdownProps {
  selectedTag?: string;
  onChange?: (value: string) => void;
}

export interface SchemeIdProps {
  url: string;
  searchParams?: URLSearchParams;
}