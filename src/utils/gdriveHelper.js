/**
 * Google Drive helper utilities for official seminar documents.
 * Google Drive embeds use the `/preview` endpoint inside an iframe:
 * https://drive.google.com/file/d/{FILE_ID}/preview
 */

export const OFFICIAL_GDRIVE_DOCS = {
  // 1. LK 4: Desain Karya Inovatif - Asyhar Qowiim
  'lk-4-desain-karya-inovatif': {
    id: '1EjkEvU1eC4Dtq8HSL7I8bRgPLhIS55Ys',
    viewUrl: 'https://drive.google.com/file/d/1EjkEvU1eC4Dtq8HSL7I8bRgPLhIS55Ys/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1EjkEvU1eC4Dtq8HSL7I8bRgPLhIS55Ys/preview'
  },
  // 2. LK 2 (Sem. II) - Refleksi Pengalaman Belajar Semester 2
  'lk-2-semester-2': {
    id: '11QWeW1gmomgI1-q0Z_ex32Y56v2KGOEL',
    viewUrl: 'https://drive.google.com/file/d/11QWeW1gmomgI1-q0Z_ex32Y56v2KGOEL/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/11QWeW1gmomgI1-q0Z_ex32Y56v2KGOEL/preview'
  },
  // 3. LK 2 (Sem. I) - Refleksi Pembelajaran Semester 1
  'lk-2-semester-1': {
    id: '1SgL41cI1Zp5-Fj6MWOnMPGa_NzZzUFS_',
    viewUrl: 'https://drive.google.com/file/d/1SgL41cI1Zp5-Fj6MWOnMPGa_NzZzUFS_/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1SgL41cI1Zp5-Fj6MWOnMPGa_NzZzUFS_/preview'
  },
  // 4. Karya Inovasi / Slide Presentasi
  'karya-inovasi-slide': {
    id: 'Ej5Up8fqmRDSCAqaI1DuFRMTTxqICx-g',
    viewUrl: 'https://drive.google.com/file/d/1Ej5Up8fqmRDSCAqaI1DuFRMTTxqICx-g/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1Ej5Up8fqmRDSCAqaI1DuFRMTTxqICx-g/preview'
  },
  'slide-presentasi': {
    id: 'Ej5Up8fqmRDSCAqaI1DuFRMTTxqICx-g',
    viewUrl: 'https://drive.google.com/file/d/1Ej5Up8fqmRDSCAqaI1DuFRMTTxqICx-g/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1Ej5Up8fqmRDSCAqaI1DuFRMTTxqICx-g/preview'
  },
  // 5. Modul Ajar Informatika NetLab
  'modul-ajar-netlab': {
    id: '1cbCTGtK0DNpJdRJrGevd2QjBK0ruSda_',
    viewUrl: 'https://drive.google.com/file/d/1cbCTGtK0DNpJdRJrGevd2QjBK0ruSda_/view?usp=sharing',
    previewUrl: 'https://drive.google.com/file/d/1cbCTGtK0DNpJdRJrGevd2QjBK0ruSda_/preview'
  }
}

export function extractGoogleDriveId(url) {
  if (!url || typeof url !== 'string') return null
  const clean = url.trim()

  const matchFileD = clean.match(/\/(?:file|presentation|document|spreadsheets)\/d\/([a-zA-Z0-9_-]+)/i)
  if (matchFileD && matchFileD[1]) {
    return matchFileD[1]
  }

  const matchIdParam = clean.match(/[?&]id=([a-zA-Z0-9_-]+)/i)
  if (matchIdParam && matchIdParam[1]) {
    return matchIdParam[1]
  }

  const matchFolders = clean.match(/\/folders\/([a-zA-Z0-9_-]+)/i)
  if (matchFolders && matchFolders[1]) {
    return matchFolders[1]
  }

  return null
}

export function formatGoogleDrivePreviewUrl(url) {
  if (!url || typeof url !== 'string') return ''
  const clean = url.trim()
  const fileId = extractGoogleDriveId(clean)

  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`
  }

  if (clean.includes('/preview')) {
    return clean
  }

  return clean
}

export function formatGoogleDriveDirectUrl(url) {
  if (!url || typeof url !== 'string') return ''
  const clean = url.trim()
  const fileId = extractGoogleDriveId(clean)

  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
  }

  return clean
}

export function isGoogleDriveUrl(url) {
  if (!url || typeof url !== 'string') return false
  return url.includes('drive.google.com') || url.includes('docs.google.com')
}
