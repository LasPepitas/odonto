export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "inactive":
      return "bg-red-500";
    case "pending":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};
export const getRoleInfo = (role: string) => {
  switch (role) {
    case "admin":
      return { label: "Administrador", color: "bg-purple-500" };
    case "dentist":
      return { label: "Dentista", color: "bg-blue-500" };
    default:
      return { label: role, color: "bg-gray-500" };
  }
};
