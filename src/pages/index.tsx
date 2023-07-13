/* eslint-disable react/jsx-key */
import Head from "next/head";
import Image from "next/image";
import Offers from "~/components/offers";

export default function Home() {
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

        <Offers />
      </main>
    </>
  );
}
