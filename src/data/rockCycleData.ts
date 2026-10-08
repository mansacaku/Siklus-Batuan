export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  iconName: string;
  readTime: string;
  content: {
    lead: string;
    sections: {
      heading?: string;
      subheading?: string;
      body: string[];
      highlight?: {
        type: 'feynman' | 'osn-key' | 'formula' | 'warning';
        title: string;
        text: string;
      };
      examples?: {
        name: string;
        desc: string;
        badge?: string;
      }[];
    }[];
  };
}

export interface RockNode {
  id: string;
  name: string;
  type: 'magma' | 'beku' | 'sedimen_lepas' | 'sedimen_batu' | 'metamorf';
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  shortDesc: string;
  env: string;
  examples: string[];
  keyProcess: string;
  x: number; // percentage in SVG
  y: number;
}

export interface RockTransition {
  id: string;
  from: string;
  to: string;
  process: string;
  forceType: 'Endogen' | 'Eksogen' | 'Kombinasi';
  description: string;
  conditions: string;
  osnTip: string;
}

export interface EndogenEksogenItem {
  id: string;
  proses: string;
  tenaga: 'Endogen' | 'Eksogen' | 'Kombinasi';
  peran: string;
  mekanisme: string;
  lingkungan: string;
  contohBatuan: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  contextScenario: string;
  options: {
    id: string;
    text: string;
  }[];
  correctId: string;
  analisisOSN: {
    terjadi: string;
    kondisi: string;
    proses: string;
    hasil: string;
  };
  penjelasanLengkap: string;
}

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    slug: 'pengenalan',
    title: '1. Pengenalan Siklus Batuan',
    subtitle: 'Bumi yang Dinamis & Tiga Keluarga Batuan Utama',
    iconName: 'Globe',
    readTime: '3 menit',
    content: {
      lead: 'Bumi bukanlah benda yang diam. Batuan yang kita lihat di permukaan saat ini dapat mengalami perubahan, berpindah tempat, terkubur, terangkat kembali, bahkan meleleh menjadi magma.',
      sections: [
        {
          heading: 'Hakikat Siklus Batuan (Rock Cycle)',
          body: [
            'Siklus batuan adalah rangkaian proses geologi yang menyebabkan batuan berubah dari satu jenis ke jenis lainnya secara berkelanjutan selama ratusan juta tahun.',
            'Proses ini dipengaruhi oleh dua kekuatan penggerak utama: Tenaga Endogen (berasal dari dinamika panas dan tektonik dalam Bumi) dan Tenaga Eksogen (berasal dari atmosfer, hidrosfer, dan biosfer di permukaan Bumi).'
          ],
          highlight: {
            type: 'osn-key',
            title: 'Kunci Utama OSN',
            text: 'Siklus batuan BUKAN urutan wajib atau lingkaran satu arah. Setiap batuan dapat mengambil jalur pintas (shortcut) perubahan yang berbeda bergantung pada dinamika tektonik dan lingkungan pengendapannya.'
          }
        },
        {
          heading: 'Tiga Kelompok Utama Batuan',
          body: [
            'Berdasarkan mekanisme keterbentukannya, seluruh batuan penyusun kerak Bumi dikelompokkan menjadi tiga famili besar:'
          ],
          examples: [
            {
              name: 'Batuan Beku (Igneous Rock)',
              desc: 'Terbentuk dari pendinginan dan kristalisasi lelehan silikat (magma di dalam kerak atau lava di permukaan).',
              badge: 'Pembekuan Lelehan'
            },
            {
              name: 'Batuan Sedimen (Sedimentary Rock)',
              desc: 'Terbentuk dari akumulasi material lepas hasil pelapukan batuan lain, presipitasi kimiawi, atau aktivitas biogenik yang mengalami litifikasi (kompaksi & sementasi).',
              badge: 'Deposisi & Pembatuan'
            },
            {
              name: 'Batuan Metamorf (Metamorphic Rock)',
              desc: 'Terbentuk ketika batuan pra-ada (beku, sedimen, atau metamorf lain) mengalami ubahan akibat suhu (T) dan tekanan (P) tinggi dalam fasa PADAT (solid state).',
              badge: 'Rekristalisasi Padat'
            }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    slug: 'magma-dan-batuan-beku',
    title: '2. Magma & Pembentukan Batuan Beku',
    subtitle: 'Kristalisasi, Laju Pendinginan, dan Lingkungan Geologi',
    iconName: 'Flame',
    readTime: '4 menit',
    content: {
      lead: 'Magma adalah material silikat cair pijar bersuhu tinggi (700°C–1300°C) yang berada di dalam kerak atau mantel atas Bumi. Saat magma kehilangan kalor, kristalisasi mineral berlangsung.',
      sections: [
        {
          heading: 'Batuan Beku Intrusif (Plutonik)',
          body: [
            'Magma terperangkap jauh di bawah permukaan Bumi dan dikelilingi oleh batuan samping yang bersifat isolator panas.',
            'Akibatnya, pendinginan berlangsung sangat lambat (memerlukan jutaan tahun). Kondisi ini memberikan ion-ion mineral waktu yang cukup leluasa untuk bermigrasi dan menyusun kisi kristal yang teratur dan berukuran besar (tekstur fanerik/kasar).'
          ],
          examples: [
            {
              name: 'Granit & Dunit/Gabbro',
              desc: 'Kristal kuarsa, feldspar, dan biotit terlihat jelas dengan mata telanjang tanpa mikroskop.',
              badge: 'Intrusif Dalam'
            }
          ]
        },
        {
          heading: 'Batuan Beku Ekstrusif (Vulkanik)',
          body: [
            'Ketika magma berhasil menembus permukaan Bumi melalui erupsi gunung api, material ini disebut lava.',
            'Di permukaan, lava berkontak langsung dengan atmosfer atau air laut yang dingin, sehingga membeku secara instan atau sangat cepat.',
            'Kristal tidak sempat tumbuh besar, menghasilkan tekstur afanitik (sangat halus) atau bahkan tekstur gelas (vitrofirik) seperti obsidian.'
          ],
          examples: [
            {
              name: 'Basalt, Andesit & Obsidian',
              desc: 'Berbutir sangat halus; obsidian bahkan tidak memiliki kisi kristal mineral (amorf).',
              badge: 'Ekstrusif Cepat'
            }
          ],
          highlight: {
            type: 'feynman',
            title: 'Prinsip Feynman: Laju Kristalisasi',
            text: 'Ibaratkan kristal seperti antrean penumpang bus: jika bus datang lambat dan santai, semua penumpang berbaris rapi dalam kelompok besar (kristal besar / fanerik). Jika ada sirine darurat dan bus berangkat seketika, semua orang langsung membeku di tempatnya tanpa formasi rapi (kristal mikro / afanitik / gelas).'
          }
        }
      ]
    }
  },
  {
    id: 3,
    slug: 'pelapukan-erosi-sedimentasi',
    title: '3. Pelapukan, Erosi, & Sedimentasi',
    subtitle: 'Kekuatan Eksogen Penghancur dan Pemindah Batuan',
    iconName: 'Wind',
    readTime: '4 menit',
    content: {
      lead: 'Begitu batuan terangkat ke permukaan dan tersingkap ke udara, ia berada di luar zona kestabilan pembentukannya, sehingga rentan terhadap serangan agen eksogen.',
      sections: [
        {
          heading: 'Pelapukan (Weathering): Hancur di Tempat',
          body: [
            'Pelapukan adalah proses alterasi dan disintegrasi batuan secara in-situ (di tempat asal tanpa perpindahan massal).',
            'Pelapukan Fisik/Mekanik: Batuan retak dan pecah menjadi klastika lebih kecil tanpa perubahan komposisi kimia (contoh: pemuaian-penyusutan suhu harian, frost wedging es di celah batuan).',
            'Pelapukan Kimia: Mineral batuan bereaksi dengan air, oksigen, atau asam lemah (contoh: hidrolisis feldspar menjadi lempung, oksidasi besi, pelarutan kalsit oleh air hujan asam karbonat).'
          ]
        },
        {
          heading: 'Erosi dan Transportasi',
          body: [
            'Erosi adalah pelepasan sekaligus pengikisan partikel batuan oleh media yang bergerak (air mengalir, angin, gletser, gelombang laut, atau tarikan gravitasi).',
            'Transportasi adalah perjalanan partikel sedimen tersebut menjauhi batuan induk. Selama transportasi, butiran mengalami pembundaran (rounding) dan pemilahan (sorting).'
          ]
        },
        {
          heading: 'Sedimentasi (Deposisi)',
          body: [
            'Ketika energi kinetik agen pengangkut menurun hingga tidak lagi mampu membawa beban sedimen, butiran akan jatuh dan mengendap di cekungan sedimen (basin) seperti danau, delta, paparan benua, atau palung laut dalam.'
          ],
          highlight: {
            type: 'formula',
            title: 'Hukum Pembeda Tiga Tahap',
            text: 'Pelapukan = menghancurkan di tempat. Erosi & Transportasi = mengikis dan memindahkan. Sedimentasi = menjatuhkan dan mengendapkan.'
          }
        }
      ]
    }
  },
  {
    id: 4,
    slug: 'dari-sedimen-menjadi-batuan-sedimen',
    title: '4. Dari Sedimen Menjadi Batuan Sedimen',
    subtitle: 'Diagenesis: Kompaksi dan Sementasi Pembentuk Batuan',
    iconName: 'Layers',
    readTime: '4 menit',
    content: {
      lead: 'Sedimen yang baru mengendap berupa lumpur atau pasir lepas yang belum membatu. Proses pengubahan sedimen lepas menjadi batuan padat disebut Litifikasi (bagian dari Diagenesis).',
      sections: [
        {
          heading: 'Dua Pilar Utama Litifikasi',
          body: [
            '1. Kompaksi (Pemadatan): Seiring berjalannya waktu, lapisan sedimen baru terus menumpuk di atasnya. Tekanan beban lapisan penutup (lithostatic pressure) merapatkan antar-butir sedimen dan memeras air pori keluar.',
            '2. Sementasi (Penyemenan): Fluida pori yang kaya mineral terlarut (seperti kalsit CaCO3, silika SiO2, atau oksida besi Fe2O3) mengalir di sela-sela butiran, lalu mempresipitasikan kristal perekat alami yang mengunci butiran menjadi massa padat.'
          ],
          highlight: {
            type: 'formula',
            title: 'Formula Litifikasi',
            text: 'Sedimen Lepas + Kompaksi (P overburden) + Sementasi (Presipitasi Mineral) = Batuan Sedimen Utuh'
          }
        },
        {
          heading: 'Katalog Perubahan Sedimen ke Batuan',
          body: [
            'Perhatikan asal material sedimen dan batuan sedimen yang dihasilkannya:'
          ],
          examples: [
            {
              name: 'Pasir (Sand) → Batu Pasir (Sandstone)',
              desc: 'Butiran pasir kuarsa didominasi ukuran 1/16 mm – 2 mm yang terikat semen silika atau karbonat.',
              badge: 'Sedimen Klastik'
            },
            {
              name: 'Lumpur & Lempung (Mud/Clay) → Serpih (Shale)',
              desc: 'Butiran sangat halus (< 1/256 mm) yang memadat dan membentuk laminasi tipis mudah belah.',
              badge: 'Klastik Halus'
            },
            {
              name: 'Cangkang Karbonat / Kalsit → Batu Gamping (Limestone)',
              desc: 'Endapan biogenik terumbu karang atau presipitasi kimiawi kalsium karbonat di laut dangkal.',
              badge: 'Sedimen Non-Klastik'
            }
          ]
        }
      ]
    }
  },
  {
    id: 5,
    slug: 'metamorfisme',
    title: '5. Metamorfisme: Berubah Tanpa Meleleh',
    subtitle: 'Tekanan, Suhu, dan Rekristalisasi Fase Padat',
    iconName: 'Zap',
    readTime: '5 menit',
    content: {
      lead: 'Ketika batuan terkubur ke kedalaman kerak Bumi atau terpengaruh intrusi magma terdekat, batuan mengalami kenaikan suhu dan tekanan tinggi. Jika kondisi ini tidak sampai mencairkan batuan, terjadilah metamorfisme.',
      sections: [
        {
          heading: 'Prinsip Padat (Solid-State Transformation)',
          body: [
            'Syarat mutlak metamorfisme adalah batuan TETAP BERADA DALAM FASE PADAT (solid state). Jika batuan sampai meleleh menjadi cairan, proses tersebut sudah berganti menjadi peleburan (melting) yang menuju pembentukan batuan beku.',
            'Mineral-mineral yang tidak stabil pada P-T tinggi akan bereaksi dan menyusun kembali kisi kristalnya menjadi mineral metamorf baru (misalnya kianit, silimanit, andalusit, garnet) serta tekstur baru (foliasi atau non-foliasi).'
          ],
          highlight: {
            type: 'feynman',
            title: 'Prinsip Feynman: Dipanggang & Ditekan',
            text: 'Bayangkan adonan kue yang dipanggang dalam oven bertekanan: tekstur dan susunan kimianya berubah drastis menjadi padat dan matang, tetapi adonan tersebut tidak pernah mencair menjadi kuah kaldu. Itulah metamorfisme.'
          }
        },
        {
          heading: 'Contoh Derajat Metamorfisme Prograd (Shale Sequence)',
          body: [
            'Perhatikan urutan metamorfisme regional batuan lempung (pelitik) seiring naiknya P dan T:'
          ],
          examples: [
            {
              name: 'Batu Gamping (Limestone) → Marmer (Marble)',
              desc: 'Kalsit mikrokristalin mengalami rekristalisasi menjadi kristal kalsit interlocking yang padat dan berkilau (non-foliasi).',
              badge: 'Metamorf Kontak/Regional'
            },
            {
              name: 'Shale → Slate → Phyllite → Schist → Gneiss',
              desc: 'Derajat metamorfisme meningkat dari rendah (Slate: belahan sabak), sedang (Schist: mika berlembar sejajar), hingga tinggi (Gneiss: pita perselingan mineral terang-gelap).',
              badge: 'Derajat Metamorfisme'
            }
          ]
        }
      ]
    }
  },
  {
    id: 6,
    slug: 'peleburan-dan-magma',
    title: '6. Peleburan dan Pembentukan Magma',
    subtitle: 'Melting Mechanisms: Suhu, Decompression, & Flux Melting',
    iconName: 'Sun',
    readTime: '4 menit',
    content: {
      lead: 'Jika panas dan kondisi tektonik melampaui kurva solidus batuan, ikatan mineral pecah dan batuan meleleh (melting) menghasilkan lelehan magma baru.',
      sections: [
        {
          heading: 'Tiga Mekanisme Utama Pelelehan di Bumi',
          body: [
            '1. Peningkatan Suhu (Thermal Melting): Batuan bersentuhan dengan magma mantel yang super panas atau pemanasan radiogenik di kerak tebal.',
            '2. Decompression Melting (Penurunan Tekanan): Batuan mantel astenosfer yang sangat panas naik ke atas dengan cepat di batas lempeng divergen (punggung tengah samudra / MOR) atau mantle plume. Tekanan turun drastis tanpa kehilangan panas, sehingga melintasi kurva leleh.',
            '3. Flux Melting (Penambahan Fluida / Volatil): Air dan volatil yang terperangkap dalam mineral lempeng samudra dilepaskan saat menunjam (subduksi). Kehadiran air menurunkan titik leleh mantel baji (mantle wedge) di atasnya secara dramatis.'
          ],
          highlight: {
            type: 'osn-key',
            title: 'Fokus Soal OSN: Zona Subduksi',
            text: 'Rantai kausalitas subduksi: Lempeng samudra menunjam → Tekanan/suhu memicu dehidrasi mineral lempeng → Air/fluida terlepas ke mantel baji → Titik leleh mantel turun (Flux Melting) → Terbentuk magma kalk-alkalin → Naik membentuk Busur Vulkanik (Volcanic Arc).'
          }
        }
      ]
    }
  },
  {
    id: 7,
    slug: 'tektonik-lempeng-dan-siklus',
    title: '7. Siklus Batuan & Tektonik Lempeng',
    subtitle: 'Mesin Raksasa Penggerak Sirkulasi Batuan',
    iconName: 'Compass',
    readTime: '4 menit',
    content: {
      lead: 'Teori Tektonik Lempeng adalah kerangka pemersatu geologi yang menjelaskan mengapa siklus batuan tidak pernah berhenti berputar di planet Bumi.',
      sections: [
        {
          heading: 'Lingkungan Subduksi (Batas Konvergen)',
          body: [
            'Lempeng kerak samudra beserta sedimen dasar laut terseret masuk ke kedalaman mantel.',
            'Di zona ini batuan mengalami: tekanan diferensial tinggi, metamorfisme fasies sekis biru/eklogit, pelepasan fluida volatil, dan akhirnya peleburan sebagian (partial melting) menghasilkan magma baru yang naik sebagai gunung api.'
          ]
        },
        {
          heading: 'Pengangkatan Tektonik (Uplift) & Orogenesa',
          body: [
            'Tumbukan lempeng benua (orogenesa kolisi) melipat dan menumpuk kerak, mengangkat batuan yang semula terkubur puluhan kilometer di kedalaman hingga menjadi puncak pegunungan tinggi.',
            'Begitu batuan terangkat (uplift) dan tersingkap ke atmosfer, batuan tersebut langsung diserang oleh pelapukan, erosi, dan siklus eksogen dimulai kembali!'
          ],
          highlight: {
            type: 'formula',
            title: 'Koneksi Kedalaman dan Permukaan',
            text: 'Proses Endogen (Subduksi & Uplift) membawa batuan dalam ke permukaan dan sebaliknya. Proses Eksogen (Erosi & Sedimentasi) memindahkan material permukaan menuju cekungan sedimen yang kelak tertimbun kembali.'
          }
        }
      ]
    }
  },
  {
    id: 8,
    slug: 'jalur-siklus-fleksibel',
    title: '8. Jalur Siklus Batuan Tidak Selalu Sama',
    subtitle: 'Jalan Pintas Geologi: Fleksibilitas Tanpa Urutan Kaku',
    iconName: 'GitFork',
    readTime: '3 menit',
    content: {
      lead: 'Buku teks dasar sering menggambar siklus batuan sebagai lingkaran berurutan: Magma → Beku → Sedimen → Metamorf → Magma. Ini adalah penyederhanaan yang berbahaya untuk OSN!',
      sections: [
        {
          heading: 'Banyak Jalan Menuju Roma (Geological Shortcuts)',
          body: [
            'Alam tidak memiliki kewajiban mengikuti lingkaran rapi. Realitas geologis menyediakan jalan pintas:',
            '• Batuan Beku → Metamorf: Granit yang terintrusi magma baru atau tertekan orogenesa langsung termetamorfosis menjadi Gneiss tanpa pernah lapuk jadi sedimen.',
            '• Batuan Sedimen → Magma: Batu pasir atau serpih yang tersubduksi dalam langsung meleleh menjadi magma tanpa tahap metamorfosis stabil.',
            '• Batuan Metamorf → Sedimen: Sekis di pegunungan terangkat ke permukaan, lapuk oleh hujan, tererosi sungai dan menjadi sedimen pasir mika.',
            '• Batuan Beku → Magma: Batuan beku kerak benua runtuh ke dalam dapur magma dan meleleh kembali.'
          ],
          highlight: {
            type: 'osn-key',
            title: 'Prinsip Emas OSN',
            text: 'Jangan menghafal bentuk panah lingkaran! Pahami proses fisis dan kimiawi yang menyebabkan perpindahan dari satu kondisi energi/lingkungan ke kondisi lainnya.'
          }
        }
      ]
    }
  },
  {
    id: 9,
    slug: 'endogen-vs-eksogen',
    title: '9. Hubungan Tenaga Endogen & Eksogen',
    subtitle: 'Matriks Komparasi Gaya Geodinamika Bumi',
    iconName: 'Sliders',
    readTime: '4 menit',
    content: {
      lead: 'Siklus batuan adalah medan pertempuran abadi antara tenaga endogen yang membangun/merekonstruksi relief dan tenaga eksogen yang meratakan/merombak relief.',
      sections: [
        {
          heading: 'Klasifikasi Kekuatan Penggerak',
          body: [
            'Tenaga Endogen ditenagai oleh panas primordial Bumi dan peluruhan isotop radioaktif (Uranium, Thorium, Kalium) di mantel dan kerak.',
            'Tenaga Eksogen ditenagai oleh radiasi sinar matahari yang menggerakkan siklus hidrologi, atmosfer (angin/hujan), dan gaya gravitasi di permukaan Bumi.'
          ]
        }
      ]
    }
  },
  {
    id: 10,
    slug: 'analisis-soal-osn',
    title: '10. Mindset Analisis untuk OSN Kebumian',
    subtitle: 'Kerangka Berpikir 4 Tahap Menaklukkan Soal',
    iconName: 'Target',
    readTime: '5 menit',
    content: {
      lead: 'Dalam soal OSN Kebumian tingkat Kabupaten, Provinsi, hingga Nasional, kamu hampir tidak pernah diminta sekadar menebak nama batuan. Penguji menguji pemahaman kausalitas proses dan lingkungan tektoniknya.',
      sections: [
        {
          heading: 'Pola Berpikir 4 Langkah (The Geologist Framework)',
          body: [
            'Saat membaca soal narasi atau deskripsi singkapan batuan, terapkan 4 pertanyaan bertahap:'
          ],
          highlight: {
            type: 'formula',
            title: '4 Langkah Emas Analisis OSN',
            text: '1. Apa yang terjadi pada batuan? → 2. Kondisi (P, T, fluida, atmosfer) apa yang menyebabkannya? → 3. Proses geologi apa yang berlangsung? → 4. Batuan atau material apa hasil akhirnya?'
          }
        },
        {
          heading: 'Studi Kasus 1: P-T Tinggi Tanpa Leleh',
          body: [
            'Kasus Soal: "Sebuah batuan di kedalaman zona kolisi benua mengalami kenaikan temperatur hingga 550°C dan tekanan lithostatik 6 kbar. Batuan mempertahankan massa padatnya dan memperlihatkan penjajaran kristal mineral mika secara teratur."',
            'Analisis: Panas + Tekanan terarah (differential stress) + Tetap padat = Metamorfisme regional dengan foliasi (terbentuk Schist / Sekis).'
          ]
        },
        {
          heading: 'Studi Kasus 2: Jebakan Sedimen Belum Menjadi Batuan',
          body: [
            'Kasus Soal: "Lumpur hasil erosi perbukitan terbawa arus banjir bandang ke muara sungai dan mengendap di dasar teluk laut dangkal."',
            'Jebakan: Apakah lumpur ini sudah merupakan batuan sedimen?',
            'Analisis: BELUM! Material ini baru mengalami sedimentasi/deposisi. Masih membutuhkan pembebanan lapisan baru, kompaksi pelepasan air, dan sementasi kimiawi (diagenesis/litifikasi) untuk sah menjadi serpih atau batu lumpur.'
          ]
        }
      ]
    }
  },
  {
    id: 11,
    slug: 'rangkuman-rumus-berpikir',
    title: '11. Rangkuman & Rumus Berpikir Sederhana',
    subtitle: 'Cheat Sheet Esensial & Konsep Kunci',
    iconName: 'CheckCircle2',
    readTime: '3 menit',
    content: {
      lead: 'Ringkasan prinsip fundamental siklus batuan yang wajib kamu kuasai di luar kepala sebelum memasuki ruang ujian OSN Kebumian.',
      sections: [
        {
          heading: 'Tujuh Pilar Siklus Batuan',
          body: [
            '1. Magma mendingin dan mengkristal → membentuk Batuan Beku.',
            '2. Pelapukan, erosi, transportasi, dan sedimentasi → menghasilkan Endapan Sedimen Lepas.',
            '3. Kompaksi dan sementasi (Litifikasi) → mengubah sedimen lepas menjadi Batuan Sedimen.',
            '4. Panas dan tekanan pada fasa padat (tanpa peleburan) → mengubah batuan menjadi Batuan Metamorf.',
            '5. Peleburan total batuan → menghasilkan kembali Magma cair.',
            '6. Tektonik lempeng (subduksi & uplift) → motor sirkulasi vertikal kerak Bumi.',
            '7. Jalur siklus batuan fleksibel dan memiliki banyak jalan pintas non-linier.'
          ],
          highlight: {
            type: 'formula',
            title: 'Rumus Cepat Geolog',
            text: 'Mendingin → Beku | Lapuk → Sedimen Lepas | Kompaksi + Semen → Batuan Sedimen | Panas + Tekan (Padat) → Metamorf | Meleleh → Magma'
          }
        }
      ]
    }
  },
  {
    id: 12,
    slug: 'penutup-berpikir-seperti-geolog',
    title: '12. Penutup: Berpikir Seperti Geolog',
    subtitle: 'Bumi Sebagai Sistem Dinamis yang Terus Berevolusi',
    iconName: 'Sparkles',
    readTime: '3 menit',
    content: {
      lead: 'Siklus batuan mengajarkan bahwa Bumi adalah sistem dinamis yang bernapas. Batuan granit di teras rumahmu mungkin pernah menjadi magma di dalam busur kepulauan purba 100 juta tahun lalu.',
      sections: [
        {
          heading: 'Pertanyaan Pemungkas Seorang Calon Juara OSN',
          body: [
            'Ketika menghadapi sepotong batuan di alam atau di meja laboratorium, jangan pernah berhenti pada pertanyaan dangkal:',
            '❌ "Batuan ini namanya apa ya?"',
            'Ajukanlah pertanyaan seorang ilmuwan kebumian sejati:',
            '✅ "Proses geodinamika apa yang melahirkannya, lingkungan tektonik apa yang menyaksikannya, dan bagaimana interaksi Bumi di masa depan akan merombaknya kembali?"'
          ],
          highlight: {
            type: 'feynman',
            title: 'Pesan Mentor OSN',
            text: 'Juara OSN bukan mereka yang paling tebal menghafal buku, melainkan mereka yang mampu melihat sebuah batu dan membaca cerita jutaan tahun perjalanan kerak Bumi di dalamnya.'
          }
        }
      ]
    }
  }
];

export const ROCK_NODES: RockNode[] = [
  {
    id: 'magma',
    name: 'Magma / Lava',
    type: 'magma',
    color: '#f97316',
    borderColor: '#ea580c',
    bgColor: 'rgba(234, 88, 12, 0.15)',
    textColor: '#ffedd5',
    shortDesc: 'Material silikat cair pijar di kedalaman mantel/kerak (magma) atau permukaan (lava).',
    env: 'Astenosfer, dapur magma kerak dalam, pipa vulkanik.',
    examples: ['Magma basaltik (mafik)', 'Magma riolitik (felsik)', 'Lava andesitik'],
    keyProcess: 'Titik awal pelelehan & kristalisasi.',
    x: 50,
    y: 12
  },
  {
    id: 'beku',
    name: 'Batuan Beku',
    type: 'beku',
    color: '#38bdf8',
    borderColor: '#0284c7',
    bgColor: 'rgba(2, 132, 199, 0.15)',
    textColor: '#e0f2fe',
    shortDesc: 'Batuan hasil pendinginan dan kristalisasi magma/lava.',
    env: 'Pluton dalam kerak (intrusif) atau kerucut vulkanik permukaan (ekstrusif).',
    examples: ['Granit (intrusif lambat)', 'Basalt (ekstrusif cepat)', 'Obsidian (gelas amorf)'],
    keyProcess: 'Pendinginan lambat = kristal besar; pendinginan cepat = kristal halus.',
    x: 85,
    y: 38
  },
  {
    id: 'sedimen_lepas',
    name: 'Sedimen Lepas',
    type: 'sedimen_lepas',
    color: '#facc15',
    borderColor: '#ca8a04',
    bgColor: 'rgba(202, 138, 4, 0.15)',
    textColor: '#fef9c3',
    shortDesc: 'Partikel hancuran batuan sebelum membatu (belum mengalami litifikasi).',
    env: 'Lereng bukit, bantaran sungai, pantai, bukit pasir gurun.',
    examples: ['Kerikil (gravel)', 'Pasir kuarsa', 'Lumpur lempung'],
    keyProcess: 'Hasil murni pelapukan in-situ dan erosi/transportasi.',
    x: 72,
    y: 84
  },
  {
    id: 'sedimen_batu',
    name: 'Batuan Sedimen',
    type: 'sedimen_batu',
    color: '#4ade80',
    borderColor: '#16a34a',
    bgColor: 'rgba(22, 163, 74, 0.15)',
    textColor: '#dcfce7',
    shortDesc: 'Batuan padat hasil litifikasi (kompaksi + sementasi) sedimen atau presipitasi.',
    env: 'Cekungan sedimen, paparan benua dangkal, dasar danau/laut.',
    examples: ['Batu pasir (sandstone)', 'Serpih (shale)', 'Batu gamping (limestone)'],
    keyProcess: 'Kompaksi mengeluarkan air pori, sementasi mengikat butiran.',
    x: 28,
    y: 84
  },
  {
    id: 'metamorf',
    name: 'Batuan Metamorf',
    type: 'metamorf',
    color: '#c084fc',
    borderColor: '#9333ea',
    bgColor: 'rgba(147, 51, 234, 0.15)',
    textColor: '#f3e8ff',
    shortDesc: 'Batuan ubahan akibat kenaikan suhu dan tekanan TINGGI dalam keadaan TETAP PADAT.',
    env: 'Akar pegunungan tumbukan lempeng, zona kontak intrusi magma.',
    examples: ['Marmer (dari batu kapur)', 'Sekis (dari shale)', 'Gneiss (derajat tinggi)'],
    keyProcess: 'Rekristalisasi mineral fase padat (solid-state recrystallization).',
    x: 15,
    y: 38
  }
];

export const ROCK_TRANSITIONS: RockTransition[] = [
  {
    id: 'magma-beku',
    from: 'magma',
    to: 'beku',
    process: 'Pendinginan & Kristalisasi',
    forceType: 'Endogen',
    description: 'Magma kehilangan energi kalor dan ion silikat membentuk kisi kristal teratur.',
    conditions: 'Penurunan temperatur di bawah titik beku mineral (Bowen reaction series).',
    osnTip: 'Ingat laju: intrusif di dalam (lambat, kristal besar fanerik) vs ekstrusif di permukaan (cepat, kristal halus afanitik).'
  },
  {
    id: 'beku-sedimen_lepas',
    from: 'beku',
    to: 'sedimen_lepas',
    process: 'Pelapukan, Erosi & Transportasi',
    forceType: 'Eksogen',
    description: 'Batuan beku yang tersingkap diserang air, asam, suhu, lalu partikelnya dipindahkan oleh gravitasi, angin, atau air.',
    conditions: 'Kontak dengan hidrosfer dan atmosfer di permukaan Bumi.',
    osnTip: 'Pelapukan menghancurkan di tempat; erosi memindahkan; sedimentasi menumpahkan di tempat baru.'
  },
  {
    id: 'sedimen_lepas-sedimen_batu',
    from: 'sedimen_lepas',
    to: 'sedimen_batu',
    process: 'Litifikasi (Kompaksi & Sementasi)',
    forceType: 'Kombinasi',
    description: 'Beban sedimen baru menekan butiran dan cairan kimiawi mempresipitasikan mineral perekat (kalsit/silika).',
    conditions: 'Tekanan litostatik penutup cekungan + sirkulasi fluida pori.',
    osnTip: 'Diagenesis: Sedimen lepas belum otomatis batuan sedimen sebelum tuntas kompaksi & sementasi!'
  },
  {
    id: 'sedimen_batu-metamorf',
    from: 'sedimen_batu',
    to: 'metamorf',
    process: 'Metamorfisme (Panas & Tekanan)',
    forceType: 'Endogen',
    description: 'Kenaikan suhu dan tekanan deformasi menyusun kembali kisi kristal tanpa batuan mencair.',
    conditions: 'T: 200°C–800°C, Tekanan tinggi di kedalaman kerak tanpa melewati solidus.',
    osnTip: 'Contoh klasik OSN: Batu kapur jadi marmer; shale jadi slate lalu schist.'
  },
  {
    id: 'metamorf-magma',
    from: 'metamorf',
    to: 'magma',
    process: 'Peleburan (Melting)',
    forceType: 'Endogen',
    description: 'Suhu melampaui kurva leleh (solidus) sehingga kisi padat lebur kembali menjadi magma silikat cair.',
    conditions: 'Panas ekstrem di mantel/kerak dalam, decompression, atau penambahan fluida volatil.',
    osnTip: 'Flux melting di zona subduksi: air menurunkan titik leleh mantel di atas lempeng yang menunjam.'
  },
  // SHORTCUTS
  {
    id: 'beku-metamorf',
    from: 'beku',
    to: 'metamorf',
    process: 'Metamorfisme Langsung (Shortcut)',
    forceType: 'Endogen',
    description: 'Batuan beku mengalami pemanasan kontak atau penekanan orogenesa tektonik tanpa pernah tersingkap ke permukaan.',
    conditions: 'Deformasi orogenik kerak tebal atau kontak intrusi pluton baru.',
    osnTip: 'Contoh: Granit langsung berubah menjadi Gneiss (Granite-gneiss).'
  },
  {
    id: 'metamorf-sedimen_lepas',
    from: 'metamorf',
    to: 'sedimen_lepas',
    process: 'Uplift, Pelapukan & Erosi (Shortcut)',
    forceType: 'Kombinasi',
    description: 'Tektonik mengangkat batuan metamorf ke puncak gunung, lalu agen eksogen menghancurkannya jadi sedimen.',
    conditions: 'Pengangkatan tektonik (orogenesa) diikuti erosi glasial/fluvial.',
    osnTip: 'Bukti bahwa batuan metamorf tidak harus meleleh jadi magma terlebih dahulu.'
  },
  {
    id: 'sedimen_batu-sedimen_lepas',
    from: 'sedimen_batu',
    to: 'sedimen_lepas',
    process: 'Pelapukan & Daur Ulang Sedimen (Shortcut)',
    forceType: 'Eksogen',
    description: 'Batu pasir atau batu gamping terangkat, tersingkap, lapuk kembali menjadi partikel pasir dan ion terlarut.',
    conditions: 'Singkapan geologi di daratan terkena cuaca.',
    osnTip: 'Daur ulang sedimen: Butiran kuarsa yang sangat resisten bisa melalui siklus pelapukan-sedimentasi berkali-kali.'
  },
  {
    id: 'sedimen_batu-magma',
    from: 'sedimen_batu',
    to: 'magma',
    process: 'Peleburan Subduksi Cepat (Shortcut)',
    forceType: 'Endogen',
    description: 'Sedimen dasar laut dalam palung terseret langsung ke mantel dalam dan lebur menjadi magma.',
    conditions: 'Subduksi curam lempeng samudra berkecepatan tinggi.',
    osnTip: 'Sedimen pelagik memperkaya komposisi magma busur dengan volatil dan unsur jejak tertentu.'
  }
];

export const FORCES_DATA: EndogenEksogenItem[] = [
  {
    id: 'f1',
    proses: 'Magmatisme & Vulkanisme',
    tenaga: 'Endogen',
    peran: 'Membentuk batuan beku intrusif dan ekstrusif dari pendinginan lelehan silikat.',
    mekanisme: 'Panas internal Bumi menggerakkan konveksi mantel dan pelelehan batuan.',
    lingkungan: 'Dapur magma, batas lempeng divergen (MOR), busur gunung api konvergen.',
    contohBatuan: 'Granit, Basalt, Andesit'
  },
  {
    id: 'f2',
    proses: 'Tektonisme & Deformasi',
    tenaga: 'Endogen',
    peran: 'Mengangkat (uplift) batuan dalam ke permukaan atau menenggelamkannya ke kedalaman palung.',
    mekanisme: 'Gaya kompresi, ekstensi, dan geser dari interaksi lempeng litosfer.',
    lingkungan: 'Jalur orogenesa pegunungan, sesar geser, palung subduksi.',
    contohBatuan: 'Milonit, Breksi sesar'
  },
  {
    id: 'f3',
    proses: 'Metamorfisme Regional & Kontak',
    tenaga: 'Endogen',
    peran: 'Mengubah struktur kristal dan asosiasi mineral dalam keadaan padat.',
    mekanisme: 'Kenaikan suhu akibat kedalaman/intrusi dan tekanan terarah diferensial.',
    lingkungan: 'Zona tumbukan benua, aureole di sekitar intrusi magma batolit.',
    contohBatuan: 'Marmer, Sekis, Gneiss, Hornfels'
  },
  {
    id: 'f4',
    proses: 'Pelelehan Batuan (Melting)',
    tenaga: 'Endogen',
    peran: 'Mendaur ulang kerak padat kembali menjadi magma cair pijar.',
    mekanisme: 'Decompression melting, flux melting volatil air, atau pemanasan radiogenik.',
    lingkungan: 'Mantel baji zona subduksi, hot spot mantel plume.',
    contohBatuan: 'Magma mafik hingga felsik'
  },
  {
    id: 'f5',
    proses: 'Pelapukan (Fisik & Kimiawi)',
    tenaga: 'Eksogen',
    peran: 'Menghancurkan dan menguraikan batuan padat in-situ di permukaan Bumi.',
    mekanisme: 'Perubahan suhu, pembekuan es, hidrolisis air hujan, reaksi asam karbonat organik.',
    lingkungan: 'Permukaan tanah, singkapan tebing, puncak pegunungan.',
    contohBatuan: 'Regolit, Lempung kaolin, Pasir lepas'
  },
  {
    id: 'f6',
    proses: 'Erosi & Transportasi Massa',
    tenaga: 'Eksogen',
    peran: 'Mengikis dan memindahkan partikel hancuran batuan menjauhi sumbernya.',
    mekanisme: 'Aliran sungai, gelombang pantai, hembusan angin aeolian, aliran es gletser.',
    lingkungan: 'Lembah sungai V, pesisir pantai abrasi, lereng curam gravitational.',
    contohBatuan: 'Material klastik tersortir'
  },
  {
    id: 'f7',
    proses: 'Sedimentasi (Deposisi)',
    tenaga: 'Eksogen',
    peran: 'Mengendapkan partikel sedimen saat media pembawa kehilangan energi kinetik.',
    mekanisme: 'Penurunan kecepatan arus air/angin, pengendapan gravitasi partikel.',
    lingkungan: 'Delta sungai, dataran banjir, paparan benua dangkal, dataran abisal.',
    contohBatuan: 'Lapisan sedimen pra-litifikasi'
  },
  {
    id: 'f8',
    proses: 'Diagenesis & Litifikasi',
    tenaga: 'Kombinasi',
    peran: 'Mengubah sedimen lunak lepas menjadi batuan sedimen kompak dan keras.',
    mekanisme: 'Tekanan penutup tumpukan lapisan (kompaksi) dan presipitasi sirkulasi semen pori.',
    lingkungan: 'Cekungan sedimen bawah permukaan dangkal (< 200°C).',
    contohBatuan: 'Batu pasir, Serpih, Konglomerat'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Di zona penunjaman (subduksi), mekanisme pelelehan mantel yang paling dominan menghasilkan magma busur vulkanik adalah...',
    contextScenario: 'Lempeng samudra yang membawa sedimen basah dan mineral hidrat menunjam ke bawah lempeng benua.',
    options: [
      { id: 'a', text: 'Kenaikan suhu semata akibat gesekan mekanik lempeng (friction heating)' },
      { id: 'b', text: 'Penurunan tekanan drastis saat mantel naik cepat (decompression melting)' },
      { id: 'c', text: 'Pelepasan fluida/air dari lempeng yang menurunkan titik leleh mantel di atasnya (flux melting)' },
      { id: 'd', text: 'Pelapukan kimiawi batuan mantel oleh asam karbonat dasar samudra' }
    ],
    correctId: 'c',
    analisisOSN: {
      terjadi: 'Lempeng samudra terhidrasi menunjam ke mantel yang panas dan bertekanan tinggi.',
      kondisi: 'Mineral seperti serpentin melepaskan air (H2O) dan volatil lain ke mantel baji (mantle wedge).',
      proses: 'Flux melting (penurunan kurva temperatur solidus peridotit mantel oleh volatil).',
      hasil: 'Magma kalk-alkalin yang memicu pembentukan busur kepulauan gunung api.'
    },
    penjelasanLengkap: 'Kunci jawaban adalah C. Di zona subduksi, fenomena utama bukanlah dekompresi (yang khas di MOR) melainkan pelepasan fluida air oleh lempeng menunjam (dehidrasi). Penambahan air ini secara termodinamika menurunkan titik leleh batuan peridotit mantel baji (flux melting), sehingga batuan mantel meleleh sebagian membentuk magma.'
  },
  {
    id: 2,
    question: 'Sebuah batuan beku memiliki kristal-kristal mineral penyusun yang sangat besar dan dapat dibedakan dengan mata telanjang tanpa mikroskop (tekstur fanerik). Kesimpulan geologis yang paling tepat mengenai sejarah pembentukannya adalah...',
    contextScenario: 'Ditemukan singkapan batuan pluton masif di pegunungan berumur Tersier.',
    options: [
      { id: 'a', text: 'Lava mendingin secara sangat cepat saat menyentuh permukaan atmosfer' },
      { id: 'b', text: 'Magma mendingin sangat lambat jauh di dalam kerak Bumi' },
      { id: 'c', text: 'Batuan sedimen mengalami kompaksi intensif di dasar palung laut' },
      { id: 'd', text: 'Batuan mengalami metamorfisme kontak instan selama erupsi freatik' }
    ],
    correctId: 'b',
    analisisOSN: {
      terjadi: 'Pembentukan batuan beku dengan ukuran kristal besar (fanerik).',
      kondisi: 'Berada di kedalaman kerak dengan batuan samping yang mengisolasi panas.',
      proses: 'Pendinginan magma berlangsung sangat lambat selama jutaan tahun (prinsip Feynman kristalisasi).',
      hasil: 'Batuan beku intrusif/plutonik seperti granit atau gabbro.'
    },
    penjelasanLengkap: 'Kunci jawaban adalah B. Menurut prinsip kristalisasi (Prinsip Feynman dalam materi): laju pendinginan yang lambat memberi waktu ion-ion mineral untuk bermigrasi secara teratur dan menumbuhkan butir kristal berukuran besar (tekstur fanerik). Sebaliknya, pendinginan cepat di permukaan menghasilkan kristal sangat halus (afanitik).'
  },
  {
    id: 3,
    question: 'Seorang geolog menemukan singkapan batu kapur (limestone) yang berbatasan langsung dengan intrusi magma granit muda. Di zona kontak, batu kapur tersebut berubah menjadi marmer yang berkilau. Proses geologi apa yang terjadi?',
    contextScenario: 'Zona kontak termal di sekitar dapur magma granitoid.',
    options: [
      { id: 'a', text: 'Pelelehan total batu kapur menjadi magma karbonatit' },
      { id: 'b', text: 'Metamorfisme termal/kontak dalam keadaan padat (solid-state recrystallization)' },
      { id: 'c', text: 'Erosi dan sedimentasi ulang kalsit di lingkungan danau air tawar' },
      { id: 'd', text: 'Diagenesis kalsit akibat tekanan overburden lapisan penutup' }
    ],
    correctId: 'b',
    analisisOSN: {
      terjadi: 'Kenaikan suhu drastis pada batu kapur di sekitar intrusi magma panas.',
      kondisi: 'Temperatur tinggi, tekanan relatif rendah, tidak terjadi pelelehan total.',
      proses: 'Metamorfisme kontak (fase padat tetap terjaga, rekristalisasi kalsit mikrokristalin menjadi kristal interlocking).',
      hasil: 'Batuan metamorf non-foliasi: Marmer (Marble).'
    },
    penjelasanLengkap: 'Kunci jawaban adalah B. Metamorfisme didefinisikan sebagai perubahan tekstur dan mineralogi dalam keadaan padat (solid state) tanpa peleburan total. Kalsit dalam batu kapur merekrstalisasi menjadi marmer akibat transfer panas dari intrusi magma granit (metamorfisme termal/kontak).'
  },
  {
    id: 4,
    question: 'Lumpur hasil erosi perbukitan terbawa arus banjir bandang ke muara sungai dan mengendap di dasar teluk laut dangkal. Mengapa endapan lumpur tersebut BELUM bisa disebut batuan sedimen?',
    contextScenario: 'Endapan lumpur lunak di lingkungan estuari.',
    options: [
      { id: 'a', text: 'Karena mineralnya belum mengalami pelelehan parsial' },
      { id: 'b', text: 'Karena belum mengalami pendinginan kristalisasi magma' },
      { id: 'c', text: 'Karena baru mengalami sedimentasi dan belum melalui litifikasi (kompaksi & sementasi)' },
      { id: 'd', text: 'Karena batuan sedimen hanya dapat terbentuk dari sisa-sisa fosil tumbuhan' }
    ],
    correctId: 'c',
    analisisOSN: {
      terjadi: 'Partikel sedimen baru saja mengendap di dasar teluk laut.',
      kondisi: 'Masih berupa partikel lepas dengan kadar air pori sangat tinggi.',
      proses: 'Baru menyelesaikan tahap sedimentasi; belum tertimbun oleh lapisan baru untuk menjalani diagenesis.',
      hasil: 'Masih berupa sedimen lepas (mud/clay), belum menjadi batuan sedimen padat (shale/mudstone).'
    },
    penjelasanLengkap: 'Kunci jawaban adalah C. Dalam siklus batuan, ada perbedaan mendasar antara "Sedimen Lepas" dan "Batuan Sedimen". Sedimen baru menjadi batuan jika telah melalui proses litifikasi (pemadatan melalui kompaksi oleh tekanan beban penutup dan penyemenan antar-butir oleh presipitasi mineral terlarut).'
  },
  {
    id: 5,
    question: 'Urutan metamorfisme regional prograd (peningkatan derajat metamorfisme seiring bertambahnya suhu dan tekanan) pada batuan asal serpih (shale) yang paling tepat adalah...',
    contextScenario: 'Penekanan kerak tebal pada sabuk orogenesa tumbukan benua.',
    options: [
      { id: 'a', text: 'Shale → Marmer → Basalt → Magma' },
      { id: 'b', text: 'Shale → Slate → Schist → Gneiss' },
      { id: 'c', text: 'Shale → Batu Pasir → Granit → Riolit' },
      { id: 'd', text: 'Shale → Obsidian → Andesit → Gabbro' }
    ],
    correctId: 'b',
    analisisOSN: {
      terjadi: 'Peningkatan progresif temperatur dan tekanan pada batuan lempung/pelitik.',
      kondisi: 'Zona orogenik konvergen dari kedalaman dangkal hingga sangat dalam.',
      proses: 'Rekristalisasi mineral lempung menjadi mika halus (slate), lalu mika berbutir kasar berfoliasi (schist), hingga pemisahan pita mineral felik-mafik (gneiss).',
      hasil: 'Derajat metamorfisme prograd: Shale → Slate → Schist → Gneiss.'
    },
    penjelasanLengkap: 'Kunci jawaban adalah B. Urutan peningkatan derajat metamorfisme regional untuk batuan lempung (pelitik/shale) adalah: Shale (batuan sedimen asal) → Slate (derajat rendah, belahan sabak) → Phyllite → Schist (derajat menengah, mika mengkilap sejajar) → Gneiss (derajat tinggi, segregasi pita terang dan gelap).'
  },
  {
    id: 6,
    question: 'Manakah dari pasangan proses dan klasifikasi tenaga geologis berikut yang TIDAK TEPAT?',
    contextScenario: 'Analisis perbandingan dinamika endogen dan eksogen.',
    options: [
      { id: 'a', text: 'Pelapukan kimiawi batuan granit oleh air hujan — Tenaga Eksogen' },
      { id: 'b', text: 'Pelelehan batuan mantel membentuk magma — Tenaga Endogen' },
      { id: 'c', text: 'Erosi pasir tebing oleh gelombang laut — Tenaga Eksogen' },
      { id: 'd', text: 'Metamorfisme batuan akibat tumbukan lempeng — Tenaga Eksogen' }
    ],
    correctId: 'd',
    analisisOSN: {
      terjadi: 'Metamorfisme batuan akibat dinamika konvergensi lempeng tektonik.',
      kondisi: 'Berlangsung jauh di dalam kerak Bumi dengan energi panas internal.',
      proses: 'Digerakkan oleh panas bumi dan tektonik lempeng (gaya dari dalam Bumi).',
      hasil: 'Jelas merupakan Tenaga Endogen, bukan eksogen.'
    },
    penjelasanLengkap: 'Kunci jawaban adalah D. Pilihan D salah karena metamorfisme dan dinamika tumbukan lempeng digerakkan oleh panas dalam Bumi dan gerak tektonik, yang merupakan klasifikasi murni dari Tenaga ENDOGEN. Tenaga eksogen hanya mencakup gaya dari atmosfer, hidrosfer, dan biosfer di permukaan (pelapukan, erosi, sedimentasi).'
  },
  {
    id: 7,
    question: 'Di batas lempeng divergen seperti Mid-Ocean Ridge (MOR), mantel astenosfer meleleh menghasilkan magma basaltik terutama melalui mekanisme...',
    contextScenario: 'Dua lempeng litosfer samudra bergerak saling menjauh di dasar laut.',
    options: [
      { id: 'a', text: 'Decompression melting (penurunan tekanan saat mantel panas bergerak naik)' },
      { id: 'b', text: 'Flux melting akibat pelepasan air dari sedimen benua' },
      { id: 'c', text: 'Pelapukan biologis oleh mikroba kemosintetik ventilasi hidrotermal' },
      { id: 'd', text: 'Pendinginan lambat yang memicu kristalisasi fanerik' }
    ],
    correctId: 'a',
    analisisOSN: {
      terjadi: 'Pemisahan lempeng di MOR menyebabkan astenosfer panas mengalir naik mengisi celah.',
      kondisi: 'Temperatur mantel tetap tinggi, tetapi tekanan litostatik turun sangat cepat karena berkurangnya beban kerak di atasnya.',
      proses: 'Decompression melting (batuan melintasi kurva solidus karena penurunan tekanan tanpa penambahan panas).',
      hasil: 'Magma basaltik pembuat kerak samudra baru.'
    },
    penjelasanLengkap: 'Kunci jawaban adalah A. Di Mid-Ocean Ridge (MOR), pemekaran lantai samudra memicu astenosfer naik secara adiabatik. Tekanan berkurang secara dramatis (tekanan menurun = titik leleh batuan turun), memicu pelelehan sebagian mantel tanpa perlu kenaikan temperatur. Inilah dekompresi pelelehan (decompression melting).'
  },
  {
    id: 8,
    question: 'Seorang peserta OSN menyatakan: "Setiap batuan beku di Bumi suatu saat pasti akan menjadi batuan sedimen terlebih dahulu sebelum bisa menjadi batuan metamorf." Pendapat ini keliru karena...',
    contextScenario: 'Evaluasi konseptual sifat non-linier siklus batuan.',
    options: [
      { id: 'a', text: 'Batuan beku tidak bisa mengalami metamorfisme sama sekali' },
      { id: 'b', text: 'Siklus batuan memiliki jalan pintas; batuan beku dapat langsung terkena panas dan tekanan tinggi di kedalaman menjadi metamorf tanpa tersingkap ke permukaan' },
      { id: 'c', text: 'Batuan beku selalu langsung meleleh kembali menjadi magma dalam hitungan hari' },
      { id: 'd', text: 'Batuan sedimen tidak pernah bisa berubah menjadi batuan metamorf' }
    ],
    correctId: 'b',
    analisisOSN: {
      terjadi: 'Anggapan keliru bahwa siklus batuan adalah lingkaran kaku satu arah.',
      kondisi: 'Dinamika tektonik lokal dapat mengubah kondisi geologis batuan secara langsung.',
      proses: 'Shortcut siklus: Granit (beku) yang terkubur dalam orogenesa kolisi langsung bermetamorfosis menjadi Gneiss tanpa pernah terlapukkan menjadi pasir/sedimen.',
      hasil: 'Siklus batuan bersifat fleksibel dan non-linier.'
    },
    penjelasanLengkap: 'Kunci jawaban adalah B. Ini merupakan prinsip esensial nomor 8 materi siklus batuan: Siklus batuan bukanlah urutan wajib atau lingkaran tertutup! Batuan beku yang tetap berada di kedalaman kerak dapat langsung termetamorfosis (contoh: Granit menjadi Granite-gneiss) tanpa pernah terangkat, lapuk, atau menjadi sedimen.'
  }
];

export const ROCK_SIMULATOR_PRESETS = [
  {
    id: 'granit-journey',
    name: 'Petualangan Granit Gunung Api Purba',
    initialRock: 'Granit (Batuan Beku Intrusif)',
    steps: [
      {
        action: 'Uplift & Erosi',
        event: 'Tektonik mengangkat batolit granit ke permukaan pegunungan. Hujan asam dan es memecahkan batuan menjadi butiran kuarsa lepas.',
        result: 'Pasir Kuarsa (Sedimen Lepas)'
      },
      {
        action: 'Transportasi & Litifikasi',
        event: 'Sungai membawa pasir kuarsa ke cekungan pantai dangkal. Tertimbun lapisan tebal, mengalami kompaksi dan sementasi silika.',
        result: 'Batu Pasir / Sandstone (Batuan Sedimen)'
      },
      {
        action: 'Subduksi & Tekanan Orogenik',
        event: 'Cekungan sedimen terperangkap dalam sabuk tumbukan benua. Tekanan dan panas meningkat tinggi dalam fase padat.',
        result: 'Kuarsit (Batuan Metamorf)'
      },
      {
        action: 'Pelelehan Ekstrem (Melting)',
        event: 'Terkubur semakin dalam hingga suhu melebihi 800°C di zona konvergen, batuan meleleh sempurna.',
        result: 'Magma Silikat Cair'
      }
    ]
  },
  {
    id: 'limestone-journey',
    name: 'Transformasi Terumbu Karang',
    initialRock: 'Cangkang Kalsit Organik di Laut Tropis',
    steps: [
      {
        action: 'Kompaksi & Sementasi',
        event: 'Akumulasi jutaan rangka karbonat terumbu karang di dasar laut dangkal mengalami litifikasi alami.',
        result: 'Batu Gamping / Limestone (Batuan Sedimen)'
      },
      {
        action: 'Metamorfisme Termal Kontak',
        event: 'Intrusi magma basaltik mendekat dan memanaskan batu gamping tanpa mencairkannya. Kristal kalsit merekrstalisasi rapat.',
        result: 'Marmer / Marble (Batuan Metamorf)'
      },
      {
        action: 'Pengangkatan & Pelapukan Karst',
        event: 'Orogenesa mengangkat marmer menjadi tebing pegunungan. Hujan melarutkan kalsit kembali menjadi larutan ion Ca2+ dan HCO3-.',
        result: 'Ion Terlarut & Endapan Kalsit Baru'
      }
    ]
  },
  {
    id: 'basalt-journey',
    name: 'Daur Ulang Kerak Samudra (MOR ke Subduksi)',
    initialRock: 'Magma Astenosfer Panas',
    steps: [
      {
        action: 'Decompression & Erupsi Dasar Laut',
        event: 'Magma menerobos punggung tengah samudra (MOR) dan mendingin cepat berkontak dengan air laut sedalam 3.000 meter.',
        result: 'Basalt Bantal / Pillow Basalt (Batuan Beku Ekstrusif)'
      },
      {
        action: 'Penunjaman & Flux Melting',
        event: 'Lempeng samudra bergerak menjauhi MOR selama 80 juta tahun lalu menunjam ke palung subduksi. Fluida air dilepaskan dan memicu lelehan baru.',
        result: 'Magma Andesitik Busur Vulkanik'
      },
      {
        action: 'Erupsi Vulkanik Darat',
        event: 'Magma andesitik meletus melalui gunung api di daratan dan membeku menjadi lava berbutir afanitik.',
        result: 'Batuan Beku Andesit'
      }
    ]
  }
];
