import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import CategoriesList from '../../components/categories-list';
import PostsList from '../../components/posts-list';
import style from './style.css';
import styled from 'styled-components';

window.__bloggrs_internals = { events: {} };

const ColumnDiv  = styled.div`
	display: flex;
	justify-content: space-between; /* not center */
	align-items: center;
	&::hover {
		background-color: red;
	}
`

const ColumnLeftButton = styled.button`

`
const ColumnRightButton = styled.button`

`

const Column = ({ children, options, setOptions }) => {
	const [ internalClasses, setInternalClasses ] = useState([ ]);
	const columnRef = useRef(null)
	const [ mode, setMode ] = useState("2xl")
	const [ displayButtons, setDisplayButtons ] = useState(false)

	let classes = Object.keys(options).map(key => {
		let values = options[key];
		return values.map(val => `${key}:${val}`)
	}).concat(internalClasses).flat().join(" ")
	if (displayButtons) classes += " cursor-grab"

	const rightCustomization = e => {
		const columnClientRects = columnRef.current.getClientRects()[0];
		
		let colSpanClass = undefined;
		columnRef.current.classList.forEach(item => {
			if (item.indexOf(`${mode}:col-span-`) !== -1) colSpanClass = item
		});

		const { left, right } = columnClientRects;
		const { clientWidth } = document.body;
		const colWidth = clientWidth / 12;

		let x = e.clientX;
		let y = e.clientY;

		if (x > (right + colWidth)) {
			setOptions({ 
				...options, 
				[mode]: [ 
					options[mode][0], "col-span-" + (Number(colSpanClass.split("-")[2]) + 1) 
				]
			})
		}
		else if (x < (right - colWidth)) {
			setOptions({ 
				...options, 
				[mode]: [ 
					options[mode][0], "col-span-" + (Number(colSpanClass.split("-")[2]) - 1) 
				]
			})
		}
	}
	const leftCustomization = e => {
		const columnClientRects = columnRef.current.getClientRects()[0];
		
		let colStartClass = undefined;
		let colSpanClass = undefined;
		columnRef.current.classList.forEach(item => {
			if (item.indexOf(`${mode}:col-start-`) !== -1) colStartClass = item
			if (item.indexOf(`${mode}:col-span-`) !== -1) colSpanClass = item
		});

		const { left, right } = columnClientRects;
		const { clientWidth } = document.body;
		const colWidth = clientWidth / 12;

		let x = e.clientX;
		let y = e.clientY;

		if (x > (left + colWidth)) {
			setOptions({ 
				...options, 
				[mode]: [ 
					"col-start-" + (Number(colStartClass.split("-")[2]) + 1),
					"col-span-" + (Number(colSpanClass.split("-")[2]) - 1) 
				]
			})
		}
		else if (x < (left - colWidth)) {
			setOptions({ 
				...options, 
				[mode]: [ 
					"col-start-" + (Number(colStartClass.split("-")[2]) - 1),
					"col-span-" + (Number(colSpanClass.split("-")[2]) + 1) 
				]
			})
		}
	}
	const left__onMouseOverHandler = e => {
		window.__bloggrs_internals.events.leftCustomization = true;
		setInternalClasses([ "border-2", "border-dashed", "border-slate-700", "pointer-events-none" ])
		document.body.addEventListener("mouseup", left__onMouseOutHandler)
	 	document.body.addEventListener('mousemove', leftCustomization);
	}
	const left__onMouseOutHandler = () => {
		window.__bloggrs_internals.events.leftCustomization = false;
		setInternalClasses([])
		document.body.removeEventListener("mouseup", left__onMouseOutHandler)
		document.body.removeEventListener('mousemove', leftCustomization);
	}
	const right__onMouseOverHandler = e => {
		window.__bloggrs_internals.events.rightCustomization = true;
		setInternalClasses([ "border-2", "border-dashed", "border-slate-700", "pointer-events-none" ])
		document.body.addEventListener("mouseup", right__onMouseOutHandler)
	 	document.body.addEventListener('mousemove', rightCustomization);
	}
	const right__onMouseOutHandler = () => {
		window.__bloggrs_internals.events.rightCustomization = false;
		setInternalClasses([])
		document.body.removeEventListener("mouseup", right__onMouseOutHandler)
		document.body.removeEventListener('mousemove', rightCustomization);
	}
	const dragCustomization = e => {
		const { leftCustomization, rightCustomization } = window.__bloggrs_internals.events;
		if ( leftCustomization || rightCustomization ) return;

		let colStartClass = undefined;
		columnRef.current.classList.forEach(item => {
			if (item.indexOf(`${mode}:col-start-`) !== -1) colStartClass = item
		});

		const { x: left } = window.__bloggrs_internals.mouse;
		const { clientWidth } = document.body;
		const colWidth = clientWidth / 12;

		let x = e.clientX;
		let y = e.clientY;

		if (e.clientX > (left + colWidth)) {
			window.__bloggrs_internals.mouse = { x: e.clientX, y: e.clientY }
			setOptions({ 
				...options, 
				[mode]: [ 
					"col-start-" + (Number(colStartClass.split("-")[2]) + 1),
					options[mode][1], 
				]
			})
		}
		else if (e.clientX < (left - colWidth)) {
			window.__bloggrs_internals.mouse = { x: e.clientX, y: e.clientY }

			setOptions({ 
				...options, 
				[mode]: [ 
					"col-start-" + (Number(colStartClass.split("-")[2]) - 1),
					options[mode][1], 
				]
			})
		}
	}
	const drag__onMouseDownHandler = e => {
		setInternalClasses([ "border-2", "border-dashed", "border-slate-700", "pointer-events-none" ])
		window.__bloggrs_internals.mouse = { x: e.clientX, y: e.clientY }
		document.body.addEventListener("mouseup", drag__onMouseUpHandler)
	 	document.body.addEventListener('mousemove', dragCustomization);
	}
	const drag__onMouseUpHandler = e => {
		setInternalClasses([ ])
		window.__bloggrs_internals.mouse = undefined;
		document.body.removeEventListener("mouseup", drag__onMouseUpHandler)
	 	document.body.removeEventListener('mousemove', dragCustomization);
	}
	return (
		<ColumnDiv 
			onMouseOver={e => setDisplayButtons(true)}
			onMouseLeave={e => setDisplayButtons(false)}
			onMouseDown={drag__onMouseDownHandler}
			onMouseUp={drag__onMouseUpHandler}
			ref={columnRef} className={classes}
		>
			{ displayButtons && <ColumnLeftButton onMouseDown={left__onMouseOverHandler}>{'+'}</ColumnLeftButton> }
			<div style={{ width: "100%"}}  id="content">{children}</div>
			{ displayButtons && <ColumnRightButton onMouseDown={right__onMouseOverHandler}>{'+'}</ColumnRightButton> }
		</ColumnDiv>
	)
}

const HomeCustomizable = () => {
	// const [ _2xl, _set2xl ] = useState([ "2xl:col-start-4", "2xl:col-span-4" ]);
	const [ col1_options, col1_setOptions ] = useState({ 
		"2xl": [ "col-start-4", "col-span-4" ]
	})
	const [ col2_options, col2_setOptions ] = useState({ 
		"2xl": [ "col-start-8", "col-span-3" ]
	})
	return (
		<div class="">
		  <div class="h-80vh grid gap-8 space-x-1 lg:grid-cols-12 py-10">
				<Column options={col1_options} setOptions={col1_setOptions}>
					<PostsList title="Posts" size={3}/>
				</Column>
				<Column options={col2_options} setOptions={col2_setOptions}>
					<CategoriesList/>
				</Column>
		  </div>
		</div>
	);
}

export default HomeCustomizable;