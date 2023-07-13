import Image from "next/image";
import { useState, type FC } from "react";
import { api } from "~/utils/api";
import Loading from "./loading";

const Offers: FC = () => {
  const [page, setPage] = useState(0);

  const { data, isLoading } = api.flats.getAll.useQuery({ page });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-white ">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
            Offers
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map(({ id, image_url, title }) => (
            <div
              className="rounded-lg border border-gray-200 bg-white shadow-sm "
              key={id}
            >
              <Image
                className="w-full rounded-lg p-4"
                src={image_url}
                alt={title}
                width={400}
                height={400}
              />
              <div className="px-5 pb-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                  {title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex w-full items-center justify-center gap-x-8">
          <button
            disabled={page === 0}
            className="rounded border border-blue-500 bg-transparent  px-4 py-2 font-semibold  text-blue-700 opacity-50 hover:border-transparent hover:bg-blue-800 hover:text-white disabled:cursor-not-allowed disabled:border-0 disabled:bg-blue-500 disabled:text-white"
            onClick={() => {
              if (page === 0) {
                return;
              }
              setPage(page - 1);
            }}
          >
            Předchozí
          </button>
          <span className="text-xl font-medium tracking-tight text-gray-900">
            Stránka: {page + 1}
          </span>
          <button
            disabled={page === 19}
            onClick={() => {
              if (page === 19) {
                return;
              }
              setPage(page + 1);
            }}
            className="rounded border border-blue-500 bg-transparent  px-4 py-2 font-semibold  text-blue-700 opacity-50 hover:border-transparent hover:bg-blue-800 hover:text-white disabled:cursor-not-allowed disabled:border-0 disabled:bg-blue-500 disabled:text-white"
          >
            Další
          </button>
        </div>
      </div>
    </section>
  );
};

export default Offers;
