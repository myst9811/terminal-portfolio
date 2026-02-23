export const portfolioData = {
  name: "Shannen Saikia",
  title: "Engineering Student | Data Engineer | AI/ML Enthusiast | Problem Solver",
  location: "Mumbai, India",
  university: "VIT (Vellore Institute of Technology)",

  about: `Hi! I'm Shannen, an engineering student at VIT and Data Engineering Intern at DynPro Inc.,
with a passion for building, breaking, and exploring technology. I'm an enthusiastic problem solver
with a keen interest in AI/ML, data engineering, and distributed systems.

I love working on challenging projects spanning blockchain technology, artificial intelligence,
real-time data pipelines, and systems programming. My journey in tech ranges from Rust-based
cross-chain bridges and Kafka-powered streaming platforms to AI-powered SaaS products.`,

  skills: {
    languages: ["TypeScript", "Python", "Rust", "Go", "JavaScript", "SQL", "C++"],
    aiml: ["Machine Learning", "Deep Learning", "RAG Systems", "Neural Networks", "LLM Integration", "Vector Search", "Claude API", "Data Analysis"],
    blockchain: ["Smart Contracts", "Bitcoin Mining", "Blockchain Simulation", "Solana", "Anchor", "Cross-chain", "Web3"],
    dataengineering: ["ETL Pipelines", "Medallion Architecture", "Apache Kafka", "PySpark", "Delta Lake", "Data Analytics"],
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "BullMQ", "Redis", "Drizzle ORM", "AWS Lambda", "REST APIs"],
    tools: ["Git", "Docker", "AWS", "Turborepo", "Jupyter", "VS Code", "Linux"],
    mathematics: ["Algorithm Design", "Computational Mathematics", "Statistical Analysis"],
  },

  projects: [
    {
      name: "CoS-OS",
      description: "AI-powered Chief of Staff assistant platform. TypeScript monorepo (Turborepo) with Next.js 15 frontend, Express/Lambda API, BullMQ job queues, pgvector semantic search, and Claude Sonnet via AWS Bedrock. Features multi-channel ingestion (Gmail, MS Graph, Otter.ai), PII redaction via Microsoft Presidio, 7-tier priority triage, and tamper-proof SHA-256 audit logging. Deployed on AWS (CloudFront, ECS Fargate, RDS, ElastiCache).",
      tech: ["TypeScript", "Next.js", "AWS", "Claude AI", "PostgreSQL", "pgvector", "BullMQ", "Redis", "Turborepo"],
      link: "",
      featured: true,
    },
    {
      name: "Nexus Cross-Chain Bridge",
      description: "Trustless Ethereum ↔ Solana cross-chain bridge. Ethereum side: Solidity smart contracts (OpenZeppelin, Hardhat, ethers.js v6) with ERC20 wrapping and nonce-based replay prevention. Solana side: Rust/Anchor programs with PDA-based token custody, SPL token locking, and validator-signed unlock proofs.",
      tech: ["Solidity", "Rust", "Anchor", "Hardhat", "Ethereum", "Solana", "ethers.js", "Web3"],
      link: "https://github.com/myst9811/nexus-ethereum",
      featured: true,
    },
    {
      name: "Crypto Data Platform",
      description: "Real-time crypto market data pipeline ingesting multi-exchange WebSocket feeds (Binance, Coinbase, Kraken) via Apache Kafka, processing with PySpark Streaming and Delta Lake storage, and serving arbitrage alerts and VWAP analytics through a FastAPI REST layer and Streamlit dashboard.",
      tech: ["Python", "Apache Kafka", "PySpark", "Delta Lake", "FastAPI", "Streamlit", "Docker"],
      link: "https://github.com/myst9811/crypto-data-platform",
      featured: true,
    },
    {
      name: "FinanceFlow",
      description: "Personal Finance Analytics Engine - Intelligent financial data aggregation and analysis platform with ML-powered insights",
      tech: ["TypeScript", "Next.js", "Machine Learning", "Data Analytics"],
      link: "https://github.com/myst9811/FinanceFlow",
      featured: true,
    },
    {
      name: "E-Governance Portal",
      description: "Blockchain-based E-Governance application with smart contracts for transparent and secure governance",
      tech: ["TypeScript", "Blockchain", "Smart Contracts", "Web3"],
      link: "https://github.com/myst9811/E-governance-portal",
      featured: true,
    },
    {
      name: "Bitcoin Miner in Rust",
      description: "A Bitcoin Mining implementation in Rust that showcases core blockchain concepts and functionalities",
      tech: ["Rust", "Blockchain", "Cryptography"],
      link: "https://github.com/myst9811/Bitcoin-Miner-in-Rust",
      featured: true,
    },
    {
      name: "SyntaxSage",
      description: "Code Documentation RAG System - AI-powered documentation assistant using Retrieval-Augmented Generation",
      tech: ["Python", "AI/ML", "RAG", "NLP"],
      link: "https://github.com/myst9811/SyntaxSage",
      featured: true,
    },
    {
      name: "AI CP Tutor",
      description: "AI-powered Competitive Programming tutor to help students learn algorithms and problem-solving",
      tech: ["AI/ML", "Algorithms", "Education"],
      link: "https://github.com/myst9811/ai-cp-tutor",
      featured: false,
    },
    {
      name: "Blockchain Simulation",
      description: "A simple blockchain simulation in JavaScript demonstrating core blockchain principles",
      tech: ["JavaScript", "Blockchain", "Cryptography"],
      link: "https://github.com/myst9811/Blockchain-Simulation",
      featured: false,
    },
    {
      name: "Go Snake Game",
      description: "A fun Snake game implementation in GoLang showcasing game development skills",
      tech: ["Go", "Game Development"],
      link: "https://github.com/myst9811/go-snake-game",
      featured: false,
    },
    {
      name: "Stock Predictor",
      description: "Machine learning model for stock price prediction and analysis",
      tech: ["Python", "Machine Learning", "Data Science"],
      link: "https://github.com/myst9811/stock-predictor",
      featured: false,
    },
    {
      name: "E-Commerce Order Analytics ETL",
      description: "Robust ETL pipeline using medallion architecture (Bronze → Silver → Gold layers) to transform raw e-commerce transactional data into analytics-ready business insights with data quality validation at each stage.",
      tech: ["Python", "Pandas", "ETL", "Data Engineering", "Medallion Architecture"],
      link: "https://github.com/myst9811/E-Commerce-Order-Analytics-ETL-Pipeline",
      featured: false,
    },
    {
      name: "Olympic Medals Analysis",
      description: "120-year Olympic history analysis (1896–2016) exploring medal tallies, gender diversity trends, country performance, and athlete statistics using Pandas, Matplotlib, and Seaborn in a Jupyter notebook pipeline.",
      tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Data Science"],
      link: "https://github.com/myst9811/olympic-medals-analysis",
      featured: false,
    },
  ],

  experience: [
    {
      role: "Data Engineering Intern & Full Stack Developer",
      organization: "DynPro Inc.",
      period: "Jan 2026 - Present",
      description: `Data engineering and client-facing full stack development
• Designed and built internal survey platform to measure AI tool adoption impact across engineering teams
• Developed mts-fitgap-pipeline: Node.js HTML generator producing pixel-perfect Fit-Gap assessment tables for McCarthy Tire Service (client)
• Built mts-L1-L2-diagram-review: business process diagram review platform for L1/L2 process documentation (McCarthy Tire Service)
• Delivered mts-doc-editor for enterprise document management workflows`,
    },
    {
      role: "Freelance Software Engineer",
      organization: "TruEdge Financial Services Pvt Ltd.",
      period: "Dec 2025 - Present",
      description: `Web development for a financial consulting firm
• Built client-facing landing pages using modern frameworks (Next.js, Tailwind CSS)
• Developed and iterated on multiple UI versions for lead generation and services presentation`,
    },
    {
      role: "Core Committee Member",
      organization: "RoboVITics Club, VIT",
      period: "Aug 2023 - Feb 2024",
      description: `Machine Learning and Computer Vision Projects
• Contributed to robotics projects with a focus on Machine Learning and computer vision
• Built jump counters and pose estimators using OpenCV and Python
• Gained hands-on experience in ML concepts: classification, detection, and time-series analysis`,
    },
    {
      role: "Computer Science Student",
      organization: "VIT (Vellore Institute of Technology)",
      period: "Present",
      description: `Coursework & Core Foundation:
• Artificial Intelligence - Machine learning algorithms, neural networks, and AI systems
• Data Structures and Algorithms - Advanced problem-solving and algorithmic design
• Operating Systems - Process management, memory management, and system programming
• Computer Networks - Network protocols, TCP/IP, and distributed systems
• Object-Oriented Programming - Design patterns and software engineering principles
• Computer Architecture and Organization - Hardware design and system architecture
• Database Systems - SQL, NoSQL, database design, and query optimization
• Building a strong foundation in computer science fundamentals and practical applications`,
    },
  ],

  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "VIT (Vellore Institute of Technology)",
      period: "Present",
      description: "Focusing on Computer Science, AI/ML, and Blockchain technologies",
    },
  ],

  contact: {
    email: "shannen.saikia@gmail.com", 
    location: "Mumbai, India",
    github: "myst9811",
    phoneNo: "+91 9619383720"
  },

  social: {
    github: "https://github.com/myst9811",
    linkedin: "https://linkedin.com/in/shannen-saikia-1a1ab324a",
    instagram: "https://instagram.com/shannen_1197",
    twitter: "https://x.com/SaikiaShannen"
  },

  resume: "/ShannenSaikia_Updated_Resume (1).pdf", 

  achievements: [
    "21 Public GitHub Repositories",
    "Built projects in 7+ programming languages",
    "Full-stack AI SaaS with AWS & Claude AI (CoS-OS)",
    "Cross-chain blockchain bridge (Ethereum ↔ Solana)",
    "Data Engineering Intern at DynPro Inc.",
    "Contributed to AI/ML, Blockchain, and Data Engineering projects",
  ],
};

export const asciiArt = `
   _____ __                                   _____       _ __   _
  / ___// /_  ____ _____  ____  ___  ____   / ___/____ _(_) /__(_)___ _
  \\__ \\/ __ \\/ __ \`/ __ \\/ __ \\/ _ \\/ __ \\  \\__ \\/ __ \`/ / //_/ / __ \`/
 ___/ / / / / /_/ / / / / / / /  __/ / / / ___/ / /_/ / / ,< / / /_/ /
/____/_/ /_/\\__,_/_/ /_/_/ /_/\\___/_/ /_/ /____/\\__,_/_/_/|_/_/\\__,_/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍💻 Computer Science Engineering Student @ VIT
🤖 AI/ML Enthusiast • ⛓️ Blockchain Developer • 🚀 Problem Solver

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💻 TypeScript • Python • Rust • Go • JavaScript • C++
🎯 Machine Learning • Blockchain • Web3 • Data Science
📍 Mumbai, India

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Welcome to my interactive terminal portfolio!
Type 'help' to see all available commands and explore my projects.
`;