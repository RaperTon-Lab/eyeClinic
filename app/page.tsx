import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="m-10">
      <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Eye Clinic Thoubal</h2>
              <p className="mt-4 text-2xl font-medium">Appointment and Precription Website</p>

              <div className="flex flex-col items-center justify-center px-16 mt-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row lg:mt-12 sm:px-0">
                  <Link href="/doctors" className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md sm:w-auto hover:bg-blue-700 focus:bg-blue-700" >Doctor's Section</Link> 
                      <Link href="/reception" className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-semibold text-black transition-all duration-200 bg-transparent border border-black rounded-md sm:w-auto hover:bg-black hover:text-white focus:bg-black focus:text-white" ><svg className="w-5 h-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>Reception Section</Link>
              </div>
          </div>
      </div>
      </section>
    </main>
  );
}




