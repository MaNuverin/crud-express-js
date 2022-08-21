const fs = require('fs');
//membuat folder
if(!fs.existsSync('./data')){
    fs.mkdir('./data');
}
//create file json
const dataPath = './data/Karyawan.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const dataKaryawan = () => {
    const File = fs.readFileSync('data/Karyawan.json');
    const data = JSON.parse(File);
    return data;
}
//karyawan dengan id

const FindKaryawan = (nama) => {
    const Karyawan = dataKaryawan();
    const Karys = Karyawan.find((data) =>  data.nama === nama)
    return Karys;
}
//menuliskan atau menimpa file json dengan data yang baru
const simpanKaryawan = (url) => {
    fs.writeFileSync('data/Karyawan.json', JSON.stringify(url));
}
//menambah data karyawan
const tambahKaryawan = (url) => {
    const karyawan = dataKaryawan();
    karyawan.splice("", "", url);
    simpanKaryawan(karyawan);
}
const deleteKaryawan = (nama) => {
    const data = dataKaryawan();
    const filteredNama = data.filter((datas) => datas.nama !== nama);
        simpanKaryawan(filteredNama);
    
}
const updateKaryawan = (nama) => {
    const karyawan = dataKaryawan();
    //hilangkan karyawan lama jika diupdate
    const filteredNama = karyawan.filter(r => r.nama !== nama.oldNama)
    delete nama.oldNama;
    filteredNama.splice("", "", nama);
    simpanKaryawan(filteredNama);
}
module.exports = {dataKaryawan, FindKaryawan, tambahKaryawan, deleteKaryawan, updateKaryawan};