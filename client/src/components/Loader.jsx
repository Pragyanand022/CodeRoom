const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center absolute top-[100px] left-1/2 transform -translate-x-1/2 z-50">
        <div className="h-16 w-16 border-4 border-dashed border-blue-400 rounded-full animate-spin" />
        <p className="mt-2 text-white font-semibold text-lg">Loading...</p>
      </div>
    );
  };
  
  export default Loader;
  