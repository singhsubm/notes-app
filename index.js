const express = require('express')
const path = require('path')
const model = require('./model')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('app')
})

app.post('/create', async (req, res) => {
    const {title , content} = req.body

    try {
        await model.create({
            title,
            content
        })
    } catch (error) {
        console.log("Error is: ",error)
    }
    res.redirect('/read')
})

app.get('/read', async (req, res) => {
    let notes;
    try {
        notes = await model.find()
    } catch (error) {
        console.log('first error is: ',error)
    }
    res.render('read', { notes })
})

app.get('/delete/:id' , async (req, res) =>{
    await model.findOneAndDelete({_id:req.params.id})
    res.redirect('/read')
})

app.get('/edit/:title/:id', async (req, res) => {
    let note;
    try {
        note = await model.findById(req.params.id)
    } catch (error) {
        console.log('second error is: ',error)
    }
    res.render('edit', { note })
})

app.post('/update/:id', async (req, res) => {
    const {title, content} = req.body
    await model.findByIdAndUpdate(req.params.id, {title, content})
    res.redirect('/read')
})

app.get('/read/:title/:id', async (req, res) => {
    const note = await model.findById(req.params.id)
    res.render('note', { note })
})

app.listen(3000)