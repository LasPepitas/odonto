export const getStatusColor = (status) => {
  switch (status) {
    case "confirmada":
      return "bg-green-100 text-green-800";
    case "en-curso":
      return "bg-blue-100 text-blue-800";
    case "pendiente":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
