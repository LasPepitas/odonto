import "./custom.css";
const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center justify-center h-screen w-screen bg-blue-100">
      <div className="boxes">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="text-center text-gray-700 mt-4">
        <h1 className="text-2xl font-bold">Cargando...</h1>
        <p className="text-sm">Por favor, espera un momento.</p>
      </div>
    </div>
  );
};

export default LoadingPage;
