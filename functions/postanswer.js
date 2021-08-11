// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const faunadb = require("faunadb")

const q = faunadb.query
const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

exports.handler = async (event, context) => {
	let resp

	try {
		const answer = {
			data: JSON.parse(event.body)
		}
		const req = await faunaClient.query(q.Create(q.Ref("classes/answers"), answer))
		console.log(req)
		return { statusCode: 200, body: JSON.stringify({ message: 'Successfully added answer!' }) }
	} catch (err) {
		return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
	}

}