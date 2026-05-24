/* ─── Navigation ────────────────────────────────────────── */
export interface NavLink {
  label: string;
  href: string;
}

/* ─── Projects ──────────────────────────────────────────── */
export interface Project {
  id:          string;
  title:       string;
  description: string;
  tags:        string[];
  image?:      string;
  href?:       string;
  github?:     string;
  featured?:   boolean;
}

/* ─── Skills ────────────────────────────────────────────── */
export interface Skill {
  name:     string;
  icon?:    string;
  level?:   number;   // 0-100
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'other';
}

/* ─── Experience ────────────────────────────────────────── */
export interface Experience {
  company:     string;
  role:        string;
  duration:    string;
  description: string;
  tech?:       string[];
  current?:    boolean;
}

/* ─── Achievements ──────────────────────────────────────── */
export interface Achievement {
  title:       string;
  description: string;
  date?:       string;
  icon?:       string;
}

/* ─── Certification ─────────────────────────────────────── */
export interface Certification {
  title:     string;
  issuer:    string;
  date:      string;
  credlyUrl?: string;
  image?:    string;
}

/* ─── Social links ──────────────────────────────────────── */
export interface SocialLink {
  platform: string;
  href:     string;
  icon?:    string;
}

/* ─── Generic API response ──────────────────────────────── */
export interface ApiResponse<T> {
  data?:    T;
  error?:   string;
  success:  boolean;
}

/* ─── Contact form ──────────────────────────────────────── */
export interface ContactFormData {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}
