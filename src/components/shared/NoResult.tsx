export const NoResult = () => {
   return (
      <div className="container min-h-[90vh] flex flex-col items-center justify-center gap-4 py-4">
         <img src="/no_result.svg" className="max-w-[200px]" />

         <div className="max-w-lg text-center">
            <h1 className="text-5xl  600:text-6xl font-semibold text-primary">No results found</h1>
            <h3 className="mt-1 600:text-xl">We couldn't find what you search for. <br /> Try again.</h3>
         </div>
      </div>
   )
}