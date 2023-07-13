/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-key */
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Loading from "~/components/loading";
import Offers from "~/components/offers";

export default function Home() {
  const [isLoading, setisLoading] = useState(false);

  const handleFetchFlats = async () => {
    setisLoading(true);
    const response = await fetch("/api/fetchFlats");
    if (response.ok) {
      console.log("Data fetched");
      setisLoading(false);
    } else {
      console.error("Error fetching flats");
    }
  };
  return (
    <>
      <Head>
        <title>Sreality scrape</title>
        <meta name="description" content="Sreality scrape" />
      </Head>
      <main>
        <section className="bg-white ">
          <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight  md:text-5xl xl:text-6xl">
                Sreality scrape
              </h1>
              <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl">
                Page to view the first 500 records from the sreality.
              </p>
            </div>
            <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
              <Image
                src="https://www.sreality.cz/img/sreality-app-logo2.png"
                alt="srealiyLogo"
                width={200}
                height={200}
              />
            </div>
          </div>
        </section>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Offers />
            <section className="flex w-full items-center justify-center pb-8">
              <button
                className="rounded border-b-4 border-red-700 bg-red-500 px-4 py-2 font-bold text-white hover:border-red-500 hover:bg-red-400"
                onClick={() => handleFetchFlats()}
              >
                Fetch flats
              </button>
            </section>
          </>
        )}
      </main>
    </>
  );
}
