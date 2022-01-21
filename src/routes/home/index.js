import { h } from 'preact';
import CategoriesList from '../../components/categories-list';
import PostsList from '../../components/posts-list';
import style from './style.css';

const Home = () => (
    <div class="">
      <div class="h-80vh grid gap-8 space-x-1 lg:grid-cols-12 py-10">
        <div class="
			2xl:col-start-4
			2xl:col-span-4
			xl:col-start-2
			xl:col-span-7
			lg:col-start-2
			lg:col-span-7
			md:col-start-1
			md:col-span-1
			sm:col-span-12

		">
			<PostsList title="Posts" size={3}/>
		</div>
        <div class="
			2xl:col-span-3 
			xl:col-span-4 
			lg:col-span-4
			md:col-span-2
			md:col-start-2
			sm:col-span-12
			flex  
			items-center
		">
			<CategoriesList/>
		</div>
	  </div>
	</div>
);

export default Home;

// import { h } from 'preact';
// import CategoriesList from '../../components/categories-list';
// import PostsList from '../../components/posts-list';
// import style from './style.css';

// const Home = () => (
//     <div class="">
//       <div class="h-80vh grid gap-8 space-x-1 grid-cols-12 py-10">
//         <div class="
// 			col-start-4 
// 			col-span-5
// 			xl:col-start-2
// 			xl:col-span-7
// 			lg:col-start-2
// 			lg:col-span-7
// 			md:col-start-1
// 			md:col-span-12
// 			md:p-5
// 		">
// 			<PostsList title="Posts" size={3}/>
// 		</div>
//         <div class="
// 			col-span-3 
// 			xl:col-span-4 
// 			lg:col-span-4
// 			md:col-span-12
// 			md:col-start-3
// 			flex  
// 			items-center
// 		">
// 			<CategoriesList/>
// 		</div>
// 	  </div>
// 	</div>
// );

// export default Home;
