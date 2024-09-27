import { SearchResult } from '../types/search';
import imgUrl from '../assets/home-icon.svg';

interface ResultsCardProps {
  result: SearchResult;
}

export const ResultsCard = ({
  result: { owner, stars, name, homepage, description },
}: ResultsCardProps) => (
  <article className="flex flex-col md:flex-row gap-3 p-2 bg-white border border-slate-300 rounded shadow-sm mb-3">
    <section className="md:w-7/12">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      {homepage && (
        <div className="flex items-baseline mb-2">
          <img src={imgUrl} alt="home icon" className="mr-2 w-2 md:w-3" />
          <a
            href={homepage}
            className="text-secondaryLink hover:underline overflow-hidden text-ellipsis"
          >
            {homepage}
          </a>
        </div>
      )}
      {description && <p className="text-gray-700">{description}</p>}
    </section>
    <p className="text-gray-700 md:w-3/12 flex md:flex-col">
      <span className="font-bold">Owner:&nbsp;</span>
      <span className="break-all">{owner}</span>
    </p>
    <p className="text-gray-700 md:w-2/12 flex md:flex-col">
      <span className="font-bold">Stars:&nbsp;</span>
      <span>{stars}</span>
    </p>
  </article>
);
