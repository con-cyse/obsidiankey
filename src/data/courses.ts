export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  strengths: string[];
  hobbies: string[];
  workPreferences: string[];
  curriculum: string[];
  careers: string[];
  salary: string;
  duration: string;
}

export const DEFAULT_COURSES: Course[] = [
  {
    id: "cs",
    title: "Bachelor of Science in Computer Science",
    category: "Engineering & Technology",
    description: "Deep dive into computational theory, algorithms, software engineering, and artificial intelligence to design and build the systems of tomorrow.",
    strengths: ["analytical", "problem-solving", "logical", "technical"],
    hobbies: ["coding", "gaming", "building", "reading"],
    workPreferences: ["building software", "analyzing data", "scientific research"],
    curriculum: ["Data Structures & Algorithms", "Software Engineering Principles", "Operating Systems", "Artificial Intelligence & Machine Learning"],
    careers: ["Software Engineer", "Systems Architect", "Data Scientist", "AI Researcher"],
    salary: "$75,000 - $125,000",
    duration: "4 Years"
  },
  {
    id: "it_sec",
    title: "Bachelor of Science in Cyber Security",
    category: "Engineering & Technology",
    description: "Focuses on defending networks, computing systems, and data infrastructures from security breaches, malware, and cyber warfare threat vectors.",
    strengths: ["technical", "problem-solving", "analytical"],
    hobbies: ["coding", "gaming", "reading"],
    workPreferences: ["building software", "analyzing data"],
    curriculum: ["Ethical Hacking & Penetration Testing", "Network Security", "Cryptography", "Digital Forensics & Incident Response"],
    careers: ["Security Operations Center (SOC) Analyst", "Penetration Tester", "Information Security Officer"],
    salary: "$70,000 - $115,000",
    duration: "4 Years"
  },
  {
    id: "me",
    title: "Bachelor of Science in Mechanical Engineering",
    category: "Engineering & Technology",
    description: "Learn how to design, analyze, manufacture, and maintain mechanical systems and thermal devices using mathematics and physics principles.",
    strengths: ["analytical", "technical", "problem-solving"],
    hobbies: ["building", "gaming", "sports"],
    workPreferences: ["planning structures", "scientific research"],
    curriculum: ["Thermodynamics", "Fluid Mechanics", "Mechanical Design", "Materials Science"],
    careers: ["Mechanical Design Engineer", "Aerospace Engineer", "Automotive Engineer", "Robotics Specialist"],
    salary: "$68,000 - $110,000",
    duration: "4 Years"
  },
  {
    id: "arch",
    title: "Bachelor of Architecture",
    category: "Creative Arts",
    description: "An intensive professional degree blending art, science, and technology to plan, design, and structure beautiful, sustainable physical environments.",
    strengths: ["creative", "analytical", "technical"],
    hobbies: ["drawing", "building", "gaming"],
    workPreferences: ["planning structures", "designing visuals"],
    curriculum: ["Architectural Design Studio", "History of Architecture", "Building Structures & Systems", "Sustainable Urban Design"],
    careers: ["Licensed Architect", "Urban Designer", "Interior Architect", "BIM Specialist"],
    salary: "$58,000 - $95,000",
    duration: "5 Years"
  },
  {
    id: "design",
    title: "Bachelor of Fine Arts in Graphic Design & Digital Arts",
    category: "Creative Arts",
    description: "Master visual communication, UI/UX, branding, and digital illustration to create engaging experiences and narratives in physical and virtual media.",
    strengths: ["creative", "communication"],
    hobbies: ["drawing", "gaming", "music"],
    workPreferences: ["designing visuals", "creating content"],
    curriculum: ["Typography & Visual Identity", "UI/UX Design", "Digital Illustration", "Motion Graphics & Animation"],
    careers: ["Creative Director", "UI/UX Designer", "Brand Strategist", "Illustrator"],
    salary: "$50,000 - $88,000",
    duration: "4 Years"
  },
  {
    id: "bba",
    title: "Bachelor of Business Administration (BBA)",
    category: "Business & Finance",
    description: "Provides a thorough grounding in organizational behavior, leadership, business strategy, operations, and entrepreneurship to lead modern corporations.",
    strengths: ["leadership", "communication", "problem-solving"],
    hobbies: ["investing", "writing", "sports"],
    workPreferences: ["managing business", "teaching"],
    curriculum: ["Strategic Management", "Organizational Leadership", "Operations & Logistics", "Business Law & Ethics"],
    careers: ["Management Consultant", "Business Operations Manager", "Project Manager", "Entrepreneur"],
    salary: "$60,000 - $105,000",
    duration: "4 Years"
  },
  {
    id: "fin",
    title: "Bachelor of Science in Finance & Investment",
    category: "Business & Finance",
    description: "Focus on capital markets, financial planning, quantitative analysis, portfolio management, and asset valuation methods.",
    strengths: ["analytical", "problem-solving", "logical"],
    hobbies: ["investing", "reading", "gaming"],
    workPreferences: ["analyzing data", "managing business"],
    curriculum: ["Corporate Finance", "Investment & Portfolio Analysis", "Financial Derivatives", "Quantitative Risk Management"],
    careers: ["Financial Analyst", "Investment Banker", "Portfolio Manager", "Treasury Specialist"],
    salary: "$65,000 - $120,000",
    duration: "4 Years"
  },
  {
    id: "marketing",
    title: "Bachelor of Science in Marketing & Brand Strategy",
    category: "Business & Finance",
    description: "Study consumer behavior, market research, digital marketing, advertising campaigns, and public relations to drive business expansion.",
    strengths: ["communication", "creative", "leadership"],
    hobbies: ["writing", "investing", "music"],
    workPreferences: ["managing business", "creating content"],
    curriculum: ["Digital Marketing & Analytics", "Consumer Psychology", "Brand Management", "Public Relations & Media Strategy"],
    careers: ["Marketing Manager", "Brand Specialist", "Digital Strategist", "PR Specialist"],
    salary: "$55,000 - $98,000",
    duration: "4 Years"
  },
  {
    id: "psych",
    title: "Bachelor of Science in Clinical Psychology",
    category: "Humanities & Social Sciences",
    description: "Examine the human mind, emotional processes, cognitive behaviors, mental health disorders, and counseling frameworks.",
    strengths: ["empathy", "communication", "science"],
    hobbies: ["volunteering", "reading", "writing"],
    workPreferences: ["helping people", "teaching", "scientific research"],
    curriculum: ["Abnormal Psychology", "Cognitive Neuroscience", "Theories of Counseling", "Research Methods in Behavioral Science"],
    careers: ["Clinical Counselor", "Human Resources Specialist", "Social Worker", "Behavioral Researcher"],
    salary: "$48,000 - $82,000",
    duration: "4 Years"
  },
  {
    id: "law",
    title: "Juris Doctor / Pre-Law Studies",
    category: "Humanities & Social Sciences",
    description: "Develop rigorous skills in constitutional analysis, public debating, legal drafting, logical reasoning, and justice frameworks.",
    strengths: ["analytical", "communication", "logical"],
    hobbies: ["reading", "writing", "volunteering"],
    workPreferences: ["helping people", "analyzing data"],
    curriculum: ["Constitutional Law", "Contracts & Torts", "Criminal Procedure", "Legal Writing & Moot Court"],
    careers: ["Corporate Attorney", "Public Defender", "Legal Consultant", "Arbitrator"],
    salary: "$85,000 - $160,000",
    duration: "4 Years (Undergrad) + 3 Years (Law School)"
  },
  {
    id: "edu",
    title: "Bachelor of Elementary & Secondary Education",
    category: "Humanities & Social Sciences",
    description: "Prepare to shape minds through educational pedagogy, child development science, curriculum design, and instructional leadership.",
    strengths: ["communication", "empathy", "leadership"],
    hobbies: ["volunteering", "reading", "music"],
    workPreferences: ["teaching", "helping people"],
    curriculum: ["Educational Psychology", "Curriculum Development", "Instructional Technology", "Student Teaching & Classroom Dynamics"],
    careers: ["Primary School Teacher", "High School Educator", "Curriculum Specialist", "Education Administrator"],
    salary: "$42,000 - $68,000",
    duration: "4 Years"
  },
  {
    id: "journalism",
    title: "Bachelor of Arts in Journalism & Media Studies",
    category: "Humanities & Social Sciences",
    description: "Learn investigative reporting, multimedia storytelling, broadcasting, podcasting, and ethical news writing for modern platforms.",
    strengths: ["communication", "creative", "problem-solving"],
    hobbies: ["writing", "reading", "music"],
    workPreferences: ["creating content", "teaching"],
    curriculum: ["News Reporting & Writing", "Media Ethics & Law", "Photojournalism & Video Editing", "Feature Writing & Podcast Production"],
    careers: ["Investigative Journalist", "News Anchor", "Content Producer", "Editor"],
    salary: "$45,000 - $80,000",
    duration: "4 Years"
  },
  {
    id: "nursing",
    title: "Bachelor of Science in Nursing (BSN)",
    category: "Health & Medical",
    description: "A professional healthcare program blending advanced clinical training, human anatomy, medical pharmacology, and patient care management.",
    strengths: ["empathy", "technical", "communication"],
    hobbies: ["volunteering", "reading", "sports"],
    workPreferences: ["helping people", "diagnosing health"],
    curriculum: ["Anatomy & Physiology", "Pharmacology for Nurses", "Medical-Surgical Nursing", "Community Health & Patient Care"],
    careers: ["Registered Nurse (RN)", "Nurse Practitioner", "Clinical Care Coordinator", "Flight Nurse"],
    salary: "$65,000 - $105,000",
    duration: "4 Years"
  },
  {
    id: "medicine",
    title: "Doctor of Medicine (MD) Preparation",
    category: "Health & Medical",
    description: "A comprehensive pre-medical track focusing on biological chemistry, pathology, diagnostic science, and patient treatment systems.",
    strengths: ["science", "problem-solving", "empathy"],
    hobbies: ["reading", "volunteering", "sports"],
    workPreferences: ["diagnosing health", "helping people", "scientific research"],
    curriculum: ["Organic Chemistry", "Microbiology & Immunology", "Human Pathology", "Clinical Diagnosis & Ethics"],
    careers: ["Medical Physician", "Surgeon", "Pediatrician", "Clinical Researcher"],
    salary: "$120,000 - $250,000",
    duration: "4 Years (Pre-med) + 4 Years (Medical School)"
  },
  {
    id: "env_sci",
    title: "Bachelor of Science in Environmental Science",
    category: "Health & Medical",
    description: "Study ecological systems, geology, conservation, climate change mitigation, and policy frameworks to defend the biosphere.",
    strengths: ["science", "analytical", "problem-solving"],
    hobbies: ["reading", "volunteering", "sports"],
    workPreferences: ["scientific research", "helping people"],
    curriculum: ["Ecology & Conservation Biology", "Environmental Chemistry", "Climatology & Soil Science", "Environmental Policy & GIS"],
    careers: ["Environmental Scientist", "Ecologist", "Conservation Officer", "GIS Data Analyst"],
    salary: "$55,000 - $92,000",
    duration: "4 Years"
  },
  {
    id: "culinary",
    title: "Associate of Culinary Arts & Food Operations",
    category: "Creative Arts",
    description: "Master high-end classical culinary methods, gastronomy, baking, food chemistry, and commercial kitchen business operations.",
    strengths: ["creative", "technical"],
    hobbies: ["cooking", "drawing", "volunteering"],
    workPreferences: ["creating content", "helping people"],
    curriculum: ["Classic Gastronomy & Tech", "Pastry & Baking Arts", "Nutrition & Sanitation", "Restaurant Operations & Cost Control"],
    careers: ["Head Chef", "Sous Chef", "Food Consultant", "Restaurant Owner"],
    salary: "$40,000 - $78,000",
    duration: "2 Years"
  }
];
