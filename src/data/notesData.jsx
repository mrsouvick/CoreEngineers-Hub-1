// src/data/notesData.jsx
export const notesData = [
  {
    id: 1,
    title: "Physics Organizer for 1st sem students",
    branch: "CSE",
    semester: "1",
    subject: "Physics Organizer",
    description:
      "1st Sem Physics Organizer for CSE Students and Specilization",
    tags: ["Physics", "Makaut", "Organizer", "1st sem", "cse"],
    fileSize: "46.2 MB",
    downloadUrl: "https://drive.google.com/file/d/1TjoPAXBTAQTxBnSJ2EUb2_EpXKqaACTY/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1TjoPAXBTAQTxBnSJ2EUb2_EpXKqaACTY/view?usp=sharing",
    thumbnail: "public/assets/Physics_orgzr-thmb.png", // optional: add path to CSE thumbnail if you have one
    uploadedBy: "CoreEngineers Team",
    views: 12,
    downloadCount: 8,
    rating: 4.8,
    lastUpdated: "2025-11-25",
  },
  {
    id: 2,
    title: "Mathematics IIA Organizer",
    branch: "CSE",
    semester: "1",
    subject: "Mathematics IIA",
    description:
      "1st Sem Math Organizer for CSE Students and Specilization",
    tags: ["math", "Makaut", "Organizer", "1st sem", "cse"],
    fileSize: "13.9 MB",
    downloadUrl: "https://drive.google.com/file/d/1pzmpnLpzsyGeC0YxwpabAHxlfGyaOsYs/view?usp=sharing",
    previewUrl: "https://drive.google.com/file/d/1pzmpnLpzsyGeC0YxwpabAHxlfGyaOsYs/view?usp=sharing",
    thumbnail: "", // optional: add path to CSE thumbnail if you have one
    uploadedBy: "CoreEngineers Team",
    views: 12,
    downloadCount: 8,
    rating: 4.8,
    lastUpdated: "2025-11-25",
  },

  // ECE entry with thumbnail (uses uploaded image from project files)
  {
    id: 3,
    title: "Digital Signal Processing-Suggestion",
    branch: "ECE",
    semester: "5",
    subject: "Digital Signal Processing",
    description:
      "Clear and concise suggestion for semester exams.",
    tags: ["electronics", "digital", "dsp", "amplifiers"],
    fileSize: "635KB",
    downloadUrl: "https://drive.google.com/file/d/1ka58ERoqyCRB5o1f9PBCrJkSqAMYpOE6/view?usp=drive_link",
    previewUrl: "https://drive.google.com/file/d/1ka58ERoqyCRB5o1f9PBCrJkSqAMYpOE6/view?usp=drive_link",
    // local file path (use this path as url in your app / build setup)
    thumbnail: "https://cdn.slidesharecdn.com/ss_thumbnails/digitalsignalprocessing-200628160007-thumbnail.jpg?width=640&height=640&fit=bounds",
    uploadedBy: "CoreEngineers-Hub Team",
    views: 53,
    downloadCount: 20,
    rating: 4.6,
    lastUpdated: "2022-11-22",
  },

  // EE entry with thumbnail (re-using the same uploaded image; replace with EE-specific image later if available)
  {
    id: 4,
    title: "Circuit Theory & Network Analysis",
    branch: "EE",
    semester: "2",
    subject: "Circuit Theory",
    description:
      "Fundamentals of circuit analysis, Kirchhoff laws, Thevenin/Norton equivalents, transient analysis of RLC circuits, and practice questions for university exams.",
    tags: ["circuits", "theory", "rcl", "kcl", "kvl"],
    fileSize: "1.75 MB",
    downloadUrl: "#",
    previewUrl: "#",
    // using same local image as placeholder; change path to an EE-specific thumbnail when available
    thumbnail: "/mnt/data/04dec392-a8e7-464d-a024-6ece30b7e88a.png",
    uploadedBy: "CoreEngineers Team",
    views: 940,
    downloadCount: 510,
    rating: 4.7,
    lastUpdated: "2024-02-18",
  },

  // keep adding more notes below as needed
];

export const branches = [
  { value: "CSE", label: "Computer Science & Engineering", color: "blue" },
  { value: "ECE", label: "Electronics & Communication", color: "purple" },
  { value: "ME", label: "Mechanical Engineering", color: "red" },
  { value: "CE", label: "Civil Engineering", color: "green" },
  { value: "EE", label: "Electrical Engineering", color: "yellow" },
];

export const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
