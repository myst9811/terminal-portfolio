import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'assistive-vision',
    name: 'Assistive Vision System',
    description: 'AI-powered navigation system for visually impaired using YOLOv8 object detection, ESP32 haptic feedback, and Android app. Achieves 30+ FPS real-time performance with 87% mAP accuracy.',
    tech: ['YOLOv8', 'Kotlin', 'ESP32', 'Android', 'Python'],
    github: 'https://github.com/myst9811/blind-assistance-app',
    ascii: `
    ╔═══════════════════════════════╗
    ║   👁️  ASSISTIVE VISION  👁️   ║
    ║                               ║
    ║  [Camera] → [AI] → [Haptic]   ║
    ║     ↓         ↓        ↓      ║
    ║   Detect   Process   Feel     ║
    ╚═══════════════════════════════╝
    `
  },
  {
    id: 'egov-portal',
    name: 'eGov Portal',
    description: 'Government services platform with blockchain integration using React, TypeScript, and Solidity smart contracts. Features comprehensive testing with 93 passing tests.',
    tech: ['React', 'TypeScript', 'Solidity', 'Blockchain', 'Smart Contracts'],
    github: 'https://github.com/myst9811/E-governance-portal',
    ascii: `
    ╔════════════════════════════╗
    ║     🏛️  eGOV PORTAL  🏛️   ║
    ║                            ║
    ║  [React] ←→ [Blockchain]   ║
    ║     ↓           ↓          ║
    ║   UI/UX    Smart Contracts ║
    ╚════════════════════════════╝
    `
  },
  {
    id: 'financeflow',
    name: 'FinanceFlow Analytics',
    description: 'Financial analytics application with OCR capabilities built using Python/Flask for receipt and document processing.',
    tech: ['Python', 'Flask', 'OCR', 'Data Analytics'],
    github: 'https://github.com/myst9811/FinanceFlow',
    ascii: `
    ╔══════════════════════════╗
    ║  💰 FINANCEFLOW 💰      ║
    ║                          ║
    ║  [Upload] → [OCR] → [📊] ║
    ║     ↓        ↓       ↓   ║
    ║  Receipt  Extract  Chart ║
    ╚══════════════════════════╝
    `
  }
];