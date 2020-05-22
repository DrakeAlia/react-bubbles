import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';


// Stage 2 - Consuming the API
const initialColor = {
	color: '',
	code: { hex: '' }
};
// the saveEdit and deleteColor functions to make AJAX requests to the API to edit/delete data
const ColorList = ({ colors, updateColors }) => {
	const history = useHistory();
	// console.log(colors);
	const [ editing, setEditing ] = useState(false);
	const [ colorToEdit, setColorToEdit ] = useState(initialColor);

	const [ posting, setPosting ] = useState(false);
	const [ colorToPost, setColorToPost ] = useState(initialColor);

	const [ sucMsg, setSucMsg ] = useState('');

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = (e) => {
		e.preventDefault();
		setEditing(false);
		axiosWithAuth()
			.put(`/api/colors/${colorToEdit.id}`, colorToEdit)
			.then(() => {
				updateColors();
			})
			.catch((error) => {
				console.log('Error to Update', error);
			});

		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?
	};

	// [DELETE] to /api/colors/123: removes the color using the id passed as part of the URL (123 in example).
	const deleteColor = (color) => {
		axiosWithAuth()
			.delete(`/api/colors/${color.id}`)
			.then(() => {
				updateColors();
			})
			.catch((error) => {
				console.log('Error Deleting', error);
			});
		// make a delete request to delete this color
	};

	// [POST] to /api/colors: creates a new color object.
	// Pass the color as the body of the request (the second argument passed to axios.post).
	const postColor = (e) => {
		e.preventDefault();
		setEditing(false);
		axiosWithAuth()
			.post('/api/colors', colorToPost)
			.then((response) => {
				updateColors();
				console.log('Posting', response);
				setSucMsg(response.statusText);
			})
			.catch((error) => {
				console.log('Unable to Post', error);
			});
	};
	return (
		<div className="colors-wrap">
			<button
				onClick={() => {
					history.push('/Login');
				}}
			>
				Log Out
			</button>{' '}
			<br />
			<p
				onClick={() => {
					setPosting(true);
				}}
			>
				{/* Build a form at the bottom of ColorList.js to add new colors to the colors data */}
				<button>Add New Color</button>
			</p>
			<ul>
				{colors.map((color) => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className="delete"
								onClick={(e) => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{' '}
							{color.color}
						</span>
						<div className="color-box" style={{ backgroundColor: color.code.hex }} />
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>Edit Color</legend>
					<label>
						Color Name:
						<input
							onChange={(e) => setColorToEdit({ ...colorToEdit, color: e.target.value })}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={(e) =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value }
								})}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">Update</button>
						<button onClick={() => setEditing(false)}>Cancel</button>
					</div>
				</form>
			)}
			{posting && (
				<form onSubmit={postColor}>
					<legend>Add Color</legend>
					<label>
						Color Name:
						<input
							onChange={(e) =>
								setColorToPost({
									...colorToPost,
									color: e.target.value
								})}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={(e) =>
								setColorToPost({
									...colorToPost,
									code: { hex: e.target.value }
								})}
						/>
					</label>
					<div className="button-row">
						<button type="submit">Add</button>
						<button onClick={() => setPosting(false)}>Cancel</button>
						<span className="sucMsg">{sucMsg}</span>
					</div>
				</form>
			)}
		</div>
	);
};

export default ColorList;
