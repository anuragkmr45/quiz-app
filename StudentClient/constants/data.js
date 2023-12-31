export const coursePlaceholder = {
  label: "Select Course",
  value: null,
  color: Colors.text,
};

export const courseOptions = [
  { label: "BTech", value: "btech" },
  { label: "MTech", value: "mtech" },
];

export const batchPlaceholder = {
  label: "Select Batch",
  value: null,
  color: Colors.text,
};

export const batchOptions = [
  { label: "2025", value: "2025" },
];

export const branchPlaceholder = {
  label: "Select Branch",
  value: null,
  color: Colors.text,
};

export const branchOptions = [
  { label: "CSE", value: "CSE" },
  { label: "CSIT", value: "CSIT" },
  { label: "ECE", value: "ECE" },
  { label: "BCA", value: "BCA" },
  { label: "MCA", value: "MCA" },
  { label: "EEE", value: "EEE" },
  { label: "EE", value: "EE" },
  { label: "CE", value: "CE" },
  { label: "ME", value: "ME" },
];

export const sectionPlaceholder = {
  label: "Select Section",
  value: null,
  color: Colors.textDark,
};

export const sectionOptions = Array.from({ length: 40 }, (_, index) => ({
  label: (index + 1).toString(),
  value: (index + 1).toString(),
}));




export const questions = [
  {
    question: "What is 2 + 2?",
    options: [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: true },
      { text: "5", isCorrect: false },
      { text: "6", isCorrect: false },
    ],
  },
  {
    question: "What is 2 + 3?",
    options: [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: false },
      { text: "5", isCorrect: true },
      { text: "6", isCorrect: false },
    ],
  },
  {
    question: "What is 2 + 4?",
    options: [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: false },
      { text: "5", isCorrect: false },
      { text: "6", isCorrect: true },
    ],
  },
  {
    question: "What is 1 + 2?",
    options: [
      { text: "3", isCorrect: true },
      { text: "4", isCorrect: false },
      { text: "5", isCorrect: false },
      { text: "6", isCorrect: false },
    ],
  },
  {
    question: "What is 3 + 2?",
    options: [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: false },
      { text: "5", isCorrect: true },
      { text: "6", isCorrect: false },
    ],
  },
];
