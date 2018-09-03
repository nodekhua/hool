const invoices = require('../helper/invoices')

async function showInvoice (ctx) {
	ctx.type = '.pdf'
	ctx.body = await invoices.showInvoice(ctx.params.id)
}

exports.register = ({router}) => {
	router.get('/pdf/:id', showInvoice)
}