type ItemLink = {
  label: string;
  href: string;
};

type SectionItem = {
  name: string;
  meta?: string;
  subtitle?: string;
  summary?: string;
  href?: string;
  links?: ItemLink[];
};

type Section = {
  title: string;
  items: SectionItem[];
};

export const sections: Section[] = [
  {
    title: "Education",
    items: [
      {
        name: "Georgia Institute of Technology",
        meta: "Jan 2026 – Dec 2027",
        subtitle: "M.Sc. in Computer Science· GPA 3.9",
      },
      {
        name: "University of Ottawa",
        meta: "Sep 2020 – May 2025",
        subtitle: "B.Sc. in Software Engineering · GPA 3.7",
      },
    ],
  },
  {
    title: "Publications",
    items: [
      {
        name: "One Lens, Many Worlds : A Capability-Typed Interface for World-Model Interpretability",
        meta: "arXiv · 2026",
        // summary:
        //   "Unified interpretability for cross-architecture analysis of RSSM, JEPA, and Transformer world models.",
        links: [
          {
            label: "Paper",
            href: "https://arxiv.org/abs/2606.09936",
          },
        ],
      },
      {
        name: "Affinity Map: Few-Shot Protein Family Classification via Prototypical Networks",
        meta: "Zenodo · 2026",
        // summary:
        //   "A meta-learning paper on few-shot protein family classification and LoRA fine-tuning.",
        links: [
          {
            label: "Paper",
            href: "https://zenodo.org/records/19200508",
          },
          {
            label: "Code",
            href: "https://github.com/MDerazNasr/Protein-fewshot",
          },
        ],
      },
    ],
  },
  {
    title: "Experience",
    items: [
      {
        name: "Qualia",
        meta: "Copenhagen, Denmark · Jun 2026 – Present",
        subtitle: "Research Engineer Intern",
      },
      {
        name: "OpenVINO (Intel), Google Summer of Code",
        meta: "Remote · May 2026 - Present",
        subtitle: "Machine Learning Systems Engineer",
        //summary:
      },
      {
        name: "Georgia Institute of Technology",
        meta: "Atlanta, Georgia · Jan 2026 – Present",
        subtitle: "Graduate Researcher",
        //summary:
        // "Designing distributed  systems for GPU-parallel planning & learning-based decision making under partial observations.",
      },
      {
        name: "University of Ottawa",
        meta: "Ottawa, Canada · Sep 2024 – Dec 2024",
        subtitle: "Undergraduate Researcher",
        //summary:
        // "Shipped  RL controller, data pipelines, and forecasting dashboards for energy systems with drift detection + monitoring.",
      },
      {
        name: "Shopify",
        meta: "Ottawa, Canada · Jan 2025 – Apr 2025",
        subtitle: "Machine Learning Engineer Intern",
        //summary: "Built NLP, forecasting, and real-time inference systems.",
      },
      {
        name: "March Networks",
        meta: "Ottawa, Canada · Jan 2023 – Apr 2023",
        subtitle: "Systems Engineer Intern",
        //summary:
        // "Developed C/C++, Python, and Node.js tooling to debug camera network failures and packet-loss.",
      },
    ],
  },
  {
    title: "Projects",
    items: [
      {
        name: "3D Reconstruction Platform",
        href: "https://github.com/MDerazNasr/Dream-nav",
        // summary:
        //   "Mapped video to navigable 3D Gaussian scenes: frame extraction, COLMAP camera-pose recovery, and confidence-aware geometry.",
      },
      {
        name: "Motion World Model",
        href: "https://github.com/MDerazNasr/Unreal-Engine-World-Model",
        // summary:
        //   "A real-time model predictive controller evaluating 64 movement futures, achieving collision free navigation around moving obstacles.",
      },
      {
        name: "Inference Engine",
        href: "https://github.com/MDerazNasr/FlowRT",
        // summary:
        //   "C++/CUDA inference engine for diffusion models targetting 10x speedup over PyTorch via INT8 quantization + persistent kernels.",
      },
      {
        name: "3D Protein Diffusion Model",
        href: "https://github.com/MDerazNasr/Protein-Diffusion",
        // summary:
        //   "A 3D protein backbone diffusion system using equivariant modeling and AlphaFold-based plausibility checks.",
      },
      {
        name: "Reinforcement Learning F1 Simulator",
        href: "https://github.com/MDerazNasr/Race-Strategy-Simulator",
        // summary:
        //   " A F1 strategy simulator trained with PPO & behavioral cloning that exceeds baseline performance.",
      },
    ],
  },
  {
    title: "Extracurriculars",
    items: [
      {
        name: "UOBionics",
        subtitle: "Allonstride Exoskeleton · Software Developer",
        meta: "Jan 2024 – Dec 2024",
        //summary:
        // "Engineered C++ firmware on STM32 and FreeRTOS for motor and biosensor control.",
      },
    ],
  },
];

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamed-deraz-nasr-21825b203/",
  },
  {
    label: "Email",
    copyValue: "mderaznasr@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/MDerazNasr/",
  },
  {
    label: "Resume",
    href: "/pdf/resume.pdf",
    download: true,
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.ca/citations?user=oPnY09IAAAAJ&hl=en",
  },
];
