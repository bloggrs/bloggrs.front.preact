import { Fragment, h } from 'preact';
import { Link } from 'preact-router/match';
import { useEffect, useState } from 'preact/hooks';
import moment from "moment";

const PostLikeWrapper = ({ post, callback }) => {
  const content = (
      post.meta.liked 
      ? <img src="http://localhost:3001/dist/static/icons8-love-80-fill.png" />
      : <img src="http://localhost:3001/dist/static/icons8-heart-80.png" /> 
  )
  const onClickHandler = async () => {
    const { id: PostId } = post;
    const action = post.meta.liked ? "unlike" : "like";
    const success = window.bloggrs.posts.likePostHandler({ PostId, action })
    if (callback) callback({ PostId, action, success });
  }
  return <div className='cursor-pointer' onClick={onClickHandler}>{content}</div>
}

const PostsList = ({ title, size = 3 }) => {
	const [ loading, setLoading ] = useState(true);
	const [ posts, setPosts ] = useState([]);

  useEffect(async () => {
		setLoading(true);
    const args = {};
    if (size) args.pageSize = size;
		const posts = await window.bloggrs.posts.getPosts(args);
		setLoading(false);
		setPosts(posts)
	},[])

  const postLikeHandler = ({ PostId, action, success }) => {
    if (!success) return;
    const new_posts = posts.map(post => {
      const edited = post.id === PostId;
      if (edited) {
        const liked = action === "like" ? true : false;
        if (liked) {post.meta.liked = true; post.meta.likes_count++;}
        else {post.meta.liked = false; post.meta.likes_count--;}
      }
      return post;
    })
    setPosts(new_posts)
  }

	if (loading) return <></>;
  const first_div_class = {
    0: 'border-b-2 border-b-slate-300 col-span-3 h-full flex',
    1: 'border-b-2 my-4 border-b-slate-300 col-span-3 flex',
    2: 'col-span-3 my-8 h-full flex'
  }
  const posts_content = (
    <div className="grid grid-rows-3 grid-flow-col col-span-2 gap-4">
      { loading ? "Loading..." : '' }
      { posts.length ? '' : 'No posts to show'}
      {
        posts.map((post, pIndex) => {
          return (
            <div className={first_div_class[pIndex]}>
              <div className="bg-white shadow-md h-3/4 w-1/2 rounded-md" />
              <div className="px-3 h-3/4 w-3/4">
                <h1 className="text-slate-700 font-medium text-xl">
                  {post.title}
                </h1>
                <p style={{ minHeight: 30, maxHeight: 71, height: "fit-content" }} className="py-2 text-slate-400 font-normal text-sm">
                  {post.html_content}
                </p>
                <div style={{  height: "fit-content" }} className="flex">
                  <p className="text-slate-700 font-normal text-sm">
                    {moment(post.createdAt).format("dddd, DD MMMM, YYYY")} &nbsp;&nbsp;&nbsp; |
                    {/* Wednesday, December 22, 2021 &nbsp;&nbsp;&nbsp; | */}
                  </p>
                  <p className="mx-4 text-slate-700 font-normal text-sm">
                    {post.users.first_name.capitalize()} {post.users.last_name.capitalize()}
                  </p>
                </div>
                <div style={{  height: "fit-content" }}  className="flex  my-2 w-full">
                  <p className="w-1/2 text-blue-300 font-medium text-sm flex ">
                    <PostLikeWrapper post={post} callback={postLikeHandler} />
                    <span className="mx-2 text-center my-2">{post.meta.likes_count} likes</span>
                  </p>
                  <p className="w-1/2 right-0 text-blue-400 font-normal text-sm flex items-center justify-center">
                    <img src="http://localhost:3001/dist/static/icons8-comments-80.png" />
                    <span className="mx-2">{post.meta.comments_count} comments</span>
                  </p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
  if (title) return (
    <>
      <h1 className="ml-4 mb-4 text-slate-700 font-medium text-xl">{title}</h1>
      {posts_content}
    </>
  )
  return posts_content
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

export default PostsList;
