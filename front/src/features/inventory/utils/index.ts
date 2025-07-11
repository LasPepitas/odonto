export const getStockStatus = (quantity: number, minStock: number) => {
  if (quantity <= minStock * 0.5) {
    return { status: "crítico", color: "bg-red-100 text-red-800" };
  } else if (quantity <= minStock) {
    return { status: "bajo", color: "bg-yellow-100 text-yellow-800" };
  } else {
    return { status: "normal", color: "bg-green-100 text-green-800" };
  }
};
export const inventory = [
  {
    id: 1,
    name: "Anestesia Lidocaína 2%",
    category: "Anestésicos",
    quantity: 25,
    unit: "ampollas",
    minStock: 10,
    supplier: "Dental Supply Co.",
    cost: 2.5,
  },
  {
    id: 2,
    name: "Composite Universal",
    category: "Materiales de obturación",
    quantity: 8,
    unit: "jeringas",
    minStock: 15,
    supplier: "DentMat Solutions",
    cost: 45.0,
  },
  {
    id: 3,
    name: "Guantes de Nitrilo",
    category: "Protección",
    quantity: 150,
    unit: "cajas",
    minStock: 50,
    supplier: "MedProtect",
    cost: 12.0,
  },
  {
    id: 4,
    name: "Fresas de Diamante",
    category: "Instrumental",
    quantity: 5,
    unit: "sets",
    minStock: 8,
    supplier: "Precision Tools",
    cost: 85.0,
  },
  {
    id: 5,
    name: "Hilo de Sutura",
    category: "Cirugía",
    quantity: 30,
    unit: "unidades",
    minStock: 20,
    supplier: "SurgiCare",
    cost: 8.5,
  },
  {
    id: 6,
    name: "Brackets Metálicos",
    category: "Ortodoncia",
    quantity: 3,
    unit: "sets",
    minStock: 10,
    supplier: "OrthoMax",
    cost: 120.0,
  },
];
