require('babel/register')({
	stage: 0,
	loose: ['all'],
	optional: ['runtime']
});

require('./src/app/server');
