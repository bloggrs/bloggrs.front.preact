import { h } from 'preact';
import { Link } from 'preact-router/match';
import { useEffect, useState } from 'preact/hooks';
import style from './style.css';


const Header = () => {
	const [ loading, setLoading ] = useState(true);
	const [ pages, setPages ] = useState([]);
	const [ blog, setBlog ] = useState(undefined);
	useEffect(async () => {
		setLoading(true);
		const args = {};
		// const size = props.size
		// if (size) args.pageSize = size;
		const { blog, pages } = await window.bloggrs.general.getBlogHeaderWidgetData(args);
		setLoading(false);
		setPages(pages)
		setBlog(blog)
	},[])
	if (loading) return <></>;
	return (
      <nav className="bg-white shadow-md max-h-96 py-5">
        <div className="mx-32 px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button type="button" className="
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-slate-400
                hover:text-white hover:bg-slate-700
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-white
              " aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                {/*
              Icon when menu is closed.

              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            */}
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/*
              Icon when menu is open.

              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            */}
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:justify-start">
              <div className="w-9/12 flex-shrink-0 flex items-center">
                <img className="block w-40 lg:hidden h-8 w-auto h-auto" src="http://localhost:3001/dist/static/logo-placeholder-image.png" alt="Workflow" />
                <img style={{ width: '12rem', height: 'fit-content' }} className="hidden absolute lg:block h-32 w-auto h-auto"  src="http://localhost:3001/dist/static/logo-placeholder-image.png" alt="Workflow" />
                <h1 className="text-xl lg:px-52 md:px-22 font-bold text-slate-700">{blog.name}</h1>
              </div>
              <div className="w-3/12 hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {/* Current: "bg-slate-900 text-white", Default: "text-slate-300 hover:bg-slate-700 hover:text-white" */}
                  {
                    pages.map(page => (
                      <a href={page.slug} className="
                        text-slate-600
                        hover:text-slate-900
                        px-3
                        py-2
                        rounded-md
                        text-base
                        font-medium
                      ">{page.name}</a>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Current: "bg-slate-900 text-white", Default: "text-slate-300  hover:text-slate-900" */}
            {
              pages.map(page => (
				        <Link className='text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-base font-medium'  activeClassName={style.active} href={page.slug}>{page.name}</Link>
              ))
            }
          </div>
        </div>
      </nav>
	)
	return (
		<header class={style.header}>
			<h1>Preact App</h1>
			<nav>
				<Link activeClassName={style.active} href="/">Home</Link>
				<Link activeClassName={style.active} href="/profile">Me</Link>
				<Link activeClassName={style.active} href="/profile/john">John</Link>
			</nav>
		</header>
	);
}

export default Header;
