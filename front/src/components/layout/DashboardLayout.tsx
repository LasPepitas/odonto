import SidebarLayout from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-slate-800 gap-y-5">
      <SidebarLayout>
        <div className="">
          <h1 className="text-2xl text-black font-bold">
            Sistema Odontológico
          </h1>
          <p className="text-black">
            Bienvenido al sistema de gestión odontológica.
          </p>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default DashboardLayout;
