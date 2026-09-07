const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_PATH = path.join(__dirname, '../public/DataDosen.csv');
const PHOTO_DIR = path.join(__dirname, '../public/Foto FAST');
const OUTPUT_PATH = path.join(__dirname, '../src/data/dosenData.json');

const MANUAL_MAP = {
  "Dr. I Gede Sedana Suci, SE, M.Ag": "sedanasuci.jpeg",
  "Dr.Eng. I Gede Agus Krisna Warmayana, S.Kom., MT": "aguskrisnaw.png",
  "I Putu Adi Saskara, S.Kom.,M.Ikom": "Adi Saskara.jpeg",
  "Luh Gede Surya Kartika, S.T.,M.T.": "Surya Kartika.jpeg",
  "Dr. I Made Gede Anadhi, S.Sn.,M.Si": "Gede Anadhi.jpeg",
  "Ida Bagus Komang Sindu Putra, S.Sn.,M.Sn": "Ida Bagus Komang Sindu Putra.jpeg",
  "Dr. Ni Made Muliani, S.Pd.,M.Pd": "Ni Made Muliani.png",
  "Dr. Prasanthy Devi Maheswari, S.Ag.,M.Ag": "Prasanthy Devi Maheswari.png",
  "Dr. Hari Harsananda, S.Ag.,M.Ag": "Hari Harsananda.jpg",
  "Putu Kussa Laksana Utama, M.Kom": "Kussa Laksana Utama.jpg",
  "I Putu Adi Pratama, S.Kom.,M.Cs.": "i putu adi pratama.png",
  "Putu Gede Surya Cipta Nugraha, M.Kom": "Putu Gede Surya Cipta Nugraha.png",
  "I Putu Dody Suarnatha, S.Kom.,M.Kom": "I Putu Dody Suarnatha.png",
  "Ni Ketut Gita Saraswati, S.E.,S.Kom.,M.Kom": "Ni Ketut Gita S.jpg",
  "I Made Anom Mahartha Dinata, S.Kom., M.Kom.": "I Made Anom Mahartha Dinata.png",
  "‌Diah Nirmala Dewi, ‌S.Pd.H.,M.Pd.H": "Diah Nirmala Dewi.jpg",
  "I Gusti Ayu Putri Trisnayanti, M.I.Kom": "GA Putri Trisnayanti.jpg",
  "‌Ulio, ‌S.M., M.I.Kom": "La Ulio.jpg",
  "Ni Made Indiana, S.KM.,M.I.Kom": "Ni Made Indiana.jpg",
  "Gede Satya Wicaksana, S.I.Kom.,M.I.Kom": "Satya Wicaksana.jpg",
  "I Putu Gede Buda Mardiksa Putra, M.I.Kom": "Buda Mardiksa.jpg",
  "Ni Kadek Suartini, S.Kom.,M.AP": "Kadek Suartini.png",
  "Nengah Kokog, S. Ag M. Si": "Nengah Kokog.jpeg"
};

function matchPhoto(name) {
  // Normalize the name to handle hidden characters
  const normalizedName = (name || '').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
  
  // Try exact match first
  if (MANUAL_MAP[normalizedName]) {
    return MANUAL_MAP[normalizedName];
  }

  // Fallback to finding matching key
  const keys = Object.keys(MANUAL_MAP);
  for (const key of keys) {
    if (key.includes(normalizedName) || normalizedName.includes(key.replace(/[\u200B-\u200D\uFEFF]/g, '').trim())) {
      return MANUAL_MAP[key];
    }
  }

  // Very aggressive fallback if still not found
  for (const key of keys) {
    const keyClean = key.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const nameClean = normalizedName.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (keyClean === nameClean) {
      return MANUAL_MAP[key];
    }
  }

  return null;
}

try {
  const workbook = xlsx.readFile(EXCEL_PATH);
  const sheet_name_list = workbook.SheetNames;
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  const mappedData = data.map((row, index) => {
    const rawName = row['Nama'];
    const matchedPhoto = matchPhoto(rawName);
    
    const rawNuptk = (row['NUPTK'] || row['nuptk'] || '').toString().trim();
    const hasNuptk = rawNuptk !== '' && rawNuptk !== '-' && rawNuptk.toLowerCase() !== 'null';
    const rawGolongan = (row['Golongan'] || '-').replace(/[\u200B-\u200D\uFEFF]/g, '');
    const golongan = hasNuptk ? 'NUPTK' : rawGolongan;

    return {
      id: row['No']?.toString() || (index + 1).toString(),
      name: (rawName || '').replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/â€Œ/g, ''),
      nip: (row['NIP']?.toString().trim() || '-').replace(/[\u200B-\u200D\uFEFF]/g, ''),
      golongan: golongan,
      nuptk: hasNuptk ? rawNuptk : undefined,
      jabatan: (row['Jabatan'] || '-').replace(/[\u200B-\u200D\uFEFF]/g, ''),
      rumpunIlmu: (row['Rumpun Ilmu'] || '-').replace(/[\u200B-\u200D\uFEFF]/g, ''),
      pohonIlmu: (row['Pohon / Cabang Ilmu'] || '-').replace(/[\u200B-\u200D\uFEFF]/g, ''),
      rantingIlmu: (row['Ranting Keilmuan'] || '-').replace(/[\u200B-\u200D\uFEFF]/g, ''),
      wa: (row['No. WA'] || '').toString().replace(/[\u200B-\u200D\uFEFF]/g, ''),
      foto: matchedPhoto || null
    };
  });

  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(mappedData, null, 2), 'utf-8');
  console.log(`Successfully converted ${mappedData.length} records.`);
  
  console.log('\n--- Photo Matching Report ---');
  let matchedCount = 0;
  mappedData.forEach(d => {
    if (d.foto) {
      console.log(`[OK] ${d.name} -> ${d.foto}`);
      matchedCount++;
    } else {
      console.log(`[MISSING] ${d.name}`);
    }
  });
  console.log(`\nMatched ${matchedCount} out of ${mappedData.length} photos.`);

} catch (err) {
  console.error('Error:', err);
}
