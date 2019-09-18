// -*- tab-width: 4; indent-tabs-mode: t -*-
// vim: ts=4 noet ai

exports.parse_query = query_string => {
	const pairs = query_string.split ('&');
	const values = {};
	for (let pair of pairs) {
		if ('' == pair) continue;
		const parts = pair.split ('=');
		const key = parts[0];
		const value = parts.slice (1).join ('=');
		if (!values[key]) {
			values[key] = [];
		}
		values[key].push (value);
	}
	return values;
};


