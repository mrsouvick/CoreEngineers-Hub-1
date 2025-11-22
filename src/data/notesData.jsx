// src/data/notesData.jsx
export const notesData = [
  {
    id: 1,
    title: "Data Structures and Algorithms Complete Guide",
    branch: "CSE",
    semester: "3",
    subject: "Data Structures",
    description:
      "Comprehensive guide covering arrays, linked lists, trees, graphs, and sorting algorithms with examples and complexity analysis. Perfect for interview preparation and academic excellence.",
    tags: ["programming", "algorithms", "data-structures", "complexity", "interview"],
    fileSize: "2.45 MB",
    downloadUrl: "#",
    previewUrl: "#",
    thumbnail: "", // optional: add path to CSE thumbnail if you have one
    uploadedBy: "CoreEngineers Team",
    views: 1250,
    downloadCount: 890,
    rating: 4.8,
    lastUpdated: "2024-01-15",
  },

  // ECE entry with thumbnail (uses uploaded image from project files)
  {
    id: 2,
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
    id: 3,
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
