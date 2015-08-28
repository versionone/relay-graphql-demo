import React, {PropTypes} from 'react';

export default class Html extends React.Component {
	static propTypes = {
		css: PropTypes.arrayOf(PropTypes.string),
		js: PropTypes.arrayOf(PropTypes.string),
		markup: PropTypes.string,
		title: PropTypes.string
	};
	static defaultProps = {
		css: [],
		js: [],
		markup: '',
		title: ''
	};

	render() {
		const styles = renderStyles.call(this);
		const scripts = renderScripts.call(this);
		const {
			title,
			markup
			} = this.props;
		return (
			<html>
			<head>
				<title>{title}</title>
				{styles}
			</head>
			<body>
			<div id="mount" dangerouslySetInnerHTML={{__html: markup}}></div>
			{scripts}
			</body>
			</html>
		);
	}
}

function renderStyles() {
	return this.props.css.map((src, index) => <link href={`/${src}`} rel="stylesheet" key={index} />);
}

function renderScripts() {
	return this.props.js.map((src, index)=> <script src={`/build/${src}`} key={index}></script>);
}
