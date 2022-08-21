const express = require('express');
const path = require('path');
const {dataKaryawan, FindKaryawan, tambahKaryawan, deleteKaryawan ,updateKaryawan} = require('./utility/In');
const app = express();

// req > middleware > res
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended : true,
}))
app.use(express.static('public'));
app.get('/', (req, res) => {
    
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/api' ,(req, res) => {
    const Karyawan = dataKaryawan();
    res.render('api', {
        title: 'api',
        Karyawan : Karyawan,
    })
})
app.post('/api', (req, res) => {
   tambahKaryawan(req.body);
   res.redirect('/api')
})
//proses edit nama

app.get('/api/tambah', (req,res) => {
    res.render('Tambah', {
        title : "Tambah Karyawan"
    })
})
app.post('/api/update', (req, res) => {
    updateKaryawan(req.body)
    res.redirect('/api')
})
app.get('/api/:nama' ,(req, res) => {
    const IdKary = FindKaryawan(req.params.nama);
    res.render('id', {
        title: 'api id',
        Karyawan : IdKary,
    })
})
// delete daftar karyawan
app.get('/api/delete/:nama', (req, res) => {
    const karyawan = FindKaryawan(req.params.nama);
    if(!karyawan){
        res.status(404).send('<h1>404</h1>')
    } else {
        deleteKaryawan(req.params.nama)
        
        res.redirect('/api')
    }
})

app.get('/api/edit/:nama' ,(req, res) => {
    const Karyawan = FindKaryawan(req.params.nama);
    res.render('edit', {
        title: 'Edit DaftarNama',
        Karyawan : Karyawan,
    })
})
//tambah karyawan

//proses data 

app.listen(3000, (req, res) => {
    console.log('Server Running On Port 3000!')
})