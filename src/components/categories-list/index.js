import { h } from 'preact';
import { Link } from 'preact-router/match';
import { useEffect, useState } from 'preact/hooks';
import moment from "moment";

const CategoriesList = ({ title = "Categories", size = 3, display_posts_count = true }) => {
	const [ loading, setLoading ] = useState(true);
	const [ categories, setCategories ] = useState([]);

  useEffect(async () => {
		setLoading(true);
    const args = {};
    if (size) args.pageSize = size;
    const categories = await window.bloggrs.categories.getCategories(args);
		setLoading(false);
		setCategories(categories)
	},[])
	if (loading) return <></>;
  return (
    <div className="mb-14 bg-white shadow-md max-h-1/2 w-full rounded-md justify-center">
        <div className=" mx-6">
          {
            title ?
            (
              <h1 className="py-3 mb-4 text-slate-700 font-medium text-xl">
                  {title}
              </h1>
            ) : ('')
          }
            <ul className="py-4 mx-5 list-disc space-y-3">
              {loading && "Loading..."}
              {!loading &&
                categories.map(ctg => (
                  <li>{ctg.name} {display_posts_count ? `(${ctg.meta.posts_count})` : '' }</li>
                ))
              }
            </ul>
        </div>
    </div>
  )
}

export default CategoriesList;
