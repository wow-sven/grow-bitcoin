interface Project {
  id: string;
  slug: string;
  name: string;
  thumbnail: string;
  oneLiner: string;
  icon: string;
  tags: string[];
}

interface ProjectDetail extends Project {
  description: string;
  website: string;
  twitter: string;
}

interface FAQ {
  id: string
  icon: string
  questions: string
  answer: string
}

interface ContractProjectTableType {
  tableId: string
  isOpen: boolean
}

interface ContractProjectType {
  id: string
  isOpen: boolean
  vote: number
}