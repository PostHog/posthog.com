export default function topLevel(req, res) {
    if (req.query && Object.keys(req.query).length !== 0) {
        res.json(req.query)
    } else if (req.files && req.files.length !== 0) {
        res.json({ files: req.files, body: req.body })
    } else if (req.body) {
        res.json(req.body)
    } else {
        res.json({
            message: `No body was sent. Try a POST request or query string`,
        })
    }
}
