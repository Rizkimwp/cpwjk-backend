export class ChatbotDto {
  question: string;
}

// faq.data.ts
export interface FaqItem {
  q: string[]; // selalu array of string
  a: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    q: ['alamat', 'lokasi', 'dimana alamat', 'lokasi kantor'],
    a: 'Perusahaan kami berlokasi di Jl. Raya Cikande Rangkasbitung No.KM 2, Cikande, Kec. Cikande, Kabupaten Serang, Banten 42186.',
  },
  {
    q: ['layanan', 'service', 'jasa', 'pelayanan'],
    a: 'Kami menyediakan jasa konsultasi online dan offline.',
  },
  {
    q: ['kontak', 'hubungi', 'nomor telepon', 'no telp', 'email'],
    a: 'Hubungi kami di email: admin@wjkcikande.com atau telp: (0254) 403333.',
  },
  {
    q: ['produk', 'seputar produk', 'sep', 'barang', 'jual apa', 'pakan'],
    a: 'Produk kami meliputi: pakan ikan, pakan ayam, pakan unggas, dan pakan kucing. Semua produk berkualitas tinggi dan diformulasikan untuk memenuhi kebutuhan nutrisi hewan Anda.',
  },
];
