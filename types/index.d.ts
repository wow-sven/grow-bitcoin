interface Project {
  id: string;
  name: string;
  thumbnail: string;
  oneLiner: string;
  tags: string[];
  index: number;
}

interface ProjectDetail extends Project {
  description: string;
  website: string;
  twitter: string;
}
